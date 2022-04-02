import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../constants';


const verifyToken = (request, response, next) => {
  const authorizationHeaader = request.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = request.headers.authorization.split(' ')[1]; // Bearer <token>
    try {
      result = jwt.verify(token, TOKEN_KEY);
      request.decoded = result;
      next();
    } catch (err) {
      throw new Error(err);
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: StatusCodes.UNAUTHORIZED
    };
    response.status(StatusCodes.UNAUTHORIZED).send(result);
  }
};

export const authMiddleware = verifyToken;