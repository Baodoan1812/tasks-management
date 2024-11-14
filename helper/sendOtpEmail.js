const nodemailer = require('nodemailer');
 
module.exports.sendOtp=(emailUser,subject,content)=>{
    const  transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER, //   you can use directly user: 'youremail@gmail.com',
         pass: process.env.PASS //  you can use instead    pass: 'yourpassword'
        }
      });
         
       
       
          
        const mailOptions = {
         from: process.env.USER,
        to:emailUser , // the user email
        subject: subject,
         html: content // add your HTML code here.
                          
      };
       
       
    const  info = transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log("Message sent: %s", info.messageId);
      });
}