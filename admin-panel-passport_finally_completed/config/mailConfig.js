const nodemailer = require('nodemailer');

exports.sendMail = async (recieverEmail, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "rw3.girish.gk@gmail.com",      // sender Email
          pass: "lofepmetxldywnus",
        },
      });
    
      const info = await transporter.sendMail({
        from: 'rw3.girish.gk@gmail.com', // sender address
        to: `rw3.girish.gk@gmail.com`, 
        subject: "Reset Password", 
        text: "Reset Password", // plain text body
        html: `
        <h3>Hello User!!!</h3>
        <p>Your Reset Password OTP is: ${otp}</p>
        `, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
}