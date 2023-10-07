import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      const user = await User.findByIdAndUpdate(userId, {
        verifyToke: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      const user = await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_SERVER_ID,
        pass: process.env.MAIL_SERVER_PASSWORD,
      },
    });
    console.log(process.env.MAIL_SERVER_ID, "Mail server id");
    const mailOptions = {
      from: "type2lnct@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email" : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/api/magicklink/${emailType.toString.toLowerCase()}/${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "Reset Your Password"
      }
      </br>
        OR Type in browser
        ${
          process.env.DOMAIN
        }/api/magicklink/${emailType.toString.toLowerCase()}/${hashedToken}
      </p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
