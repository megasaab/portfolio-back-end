import { Router } from 'express';
import { AuthUser } from '../model/models';
import { USER } from '../model/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    StatusCodes,
    getReasonPhrase
} from 'http-status-codes';
import { TOKEN_KEY } from '../constants';
import { authMiddleware } from '../middleware/auth';

const authRouter = Router();

authRouter.post('/register', async (request, response) => {
    try {
        const { firstName, lastName, email, password } = request.body as AuthUser;

        // Validate user input
        if (!(email && password && firstName && lastName)) {
            return response.status(StatusCodes.OK).send(getReasonPhrase(StatusCodes.NOT_ACCEPTABLE));
        }

        // Check if user exist in database

        const existsUser = await USER.findOne({ email });

        if (existsUser) {
            return response.status(StatusCodes.CONFLICT).send("User Already Exist. Please Login");
        }


        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user: AuthUser = await USER.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        // save user token
        user.token = token;

        // return new user
        return response.status(StatusCodes.CREATED).json(user);
    } catch (error) {
        console.log(error);
    }

});



authRouter.post('/login', async (request, response) => {
    try {
        // Get user input
        const { email, password } = request.body;

        // Validate user input
        if (!(email && password)) {
            return response.status(StatusCodes.BAD_REQUEST).send(getReasonPhrase(StatusCodes.BAD_REQUEST));
        }

        // Validate if user exist in our database
        const user: AuthUser = await USER.findOne({ email });


        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            return response.status(200).json(user);
        }
        return response.status(StatusCodes.BAD_REQUEST).send("Invalid Credentials");
    } catch (err) {
        console.log(err)
    }
});

authRouter.get('/check-auth', authMiddleware, async (request: any, response) => {
    try {
        const user: AuthUser = await USER.findOne({ _id: request.decoded.user_id });
        if (!user) {
            return response.status(StatusCodes.BAD_REQUEST).send("NOT FOUND");
        }
        return response.status(200).json(user);
    } catch (error) {
        console.log(error)
    }
});


export default authRouter;
