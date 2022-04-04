import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { PORTFOLIO } from "../model/portfolio";
import { NodeMailer } from "../nodemailer.service";


const mailRouter = Router();

mailRouter.post('/send-email', async (request: any, response) => {
  try {
    const {to, message, subject} = request.body;
    const result = await new NodeMailer().sendMessage(to, message, subject);
    return response.json(result);
  } catch (error) {
    return response.status(StatusCodes.NOT_FOUND).json({ success: false, error: error?.toString() })
  }
});


export default mailRouter;