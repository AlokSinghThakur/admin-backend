const Sib = require('sib-api-v3-sdk')
require('dotenv').config()
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY

module.exports = {
      /** generate otp */
  async generateOTP(otp_length){
    // Declare a digits variable
    // which stores all digits
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < otp_length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return String(OTP);
  },

  async sendInBlue(userEmail,userId){
        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
                email: 'aloksinghthakurcse@gmail.com',
                name: 'Anjan',
                        }
        const receivers = [
            {
                email: userEmail,
            },
                        ]

                        tranEmailApi
                          .sendTransacEmail({
                            sender,
                            to: receivers,
                            subject:
                              "Change your password for",
                            // textContent: `Cules Coding will teach you how to become {{params.role}} a developer.`,
                            htmlContent: `<h1>Email TO change Password</h1><a href="http://localhost:3000/user/change-password/${userId}">Visit</a> `,
                            params: {
                              role: "Frontend",
                            },
                          })
                          .then((response) => {console.log(JSON.parse(JSON.stringify(response)))
                            console.log('Email sent')
                            // return res.send({msg:'success'})
                        })
                          .catch((error) => {
                            console.error("error",error)
                            // return res.send({msg:error.message})
                        });

}
  
}