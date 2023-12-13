import nodemailer from 'nodemailer'
async function sendEmail(to,subject,html)
{const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user:process.env.SENDEMAIL,
      pass:process.env.SENDPASSWORD,
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Fred Foo 👻" <${process.env.SENDEMAIL}>`, // sender address
      to, // list of receivers
      subject, // Subject line // plain text body
      html,
      // html body
    })
}    
export default sendEmail;