import nodemailer from 'nodemailer';
import { EMAIL_LOGIN, EMAIL_PASS } from './constants';

export class NodeMailer {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_LOGIN,
            pass: EMAIL_PASS,
        },
    });

   async sendMessage(to: string, message: string, subject: string) {
       const res =  await this.transporter.sendMail({
            from: `Portfolio Service <${EMAIL_LOGIN}>`,
            to: to,
            subject: subject,
            text: message,
            html:
              `This <p>${message}</p>.`,
          });

        console.log(res)
    }
}