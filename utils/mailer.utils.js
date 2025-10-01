const nodemailer= require("nodemailer")

const transporter= nodemailer.createTransport({
  host:process.env.SMTP_HOST,
  PORT:465,
  secure:true,
  auth:{
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASS,
  }
})

const notifMsg = async (email) => {
  console.log('about to send Email...')
  try {
    const info = await transporter.sendMail({
      from: `"Plumide" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Testing",
      html: "<b>My Msg</b>",
    })
    console.log('Message sent:', info.messageId)
  } catch (e) {
    console.log("Email error:", e.message)
  }
}


module.exports={
  notifMsg
}