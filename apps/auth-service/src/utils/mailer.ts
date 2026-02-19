import nodemailer from 'nodemailer';
export const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    }
})

export async function sendResetEmail(to:string,resetLink:string){
    await transporter.sendMail({
        from:process.env.EMAIL_FROM,
        to,
        subject:`Reset Your Password`,
        html:`
        <h3>Password Reset Request</h3>
        <p>Click here to reset password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Link Expires in 30 min</p>
        `
    })
}