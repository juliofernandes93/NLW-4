import nodemailer, { Transporter } from 'nodemailer'

class SendMailService{
    private client: Transporter
    constructor(){
        nodemailer.createTestAccount().then(account => {
            let transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "3403eab4fe260b",
                  pass: "5f3c48cc65b3dc"
                }
              })
            this.client = transporter
        })
    }

    async execute(to: string, subject: string, body:string){

        const message = await this.client.sendMail({
            to,
            subject,
            html: body,
            from: "NPS <noreplay@nps.com.br>"
        })

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService()