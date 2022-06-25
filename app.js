require('dotenv').config()
const express = require("express");
const connectDB = require('./DB/connection');
const app = express()
const port = process.env.PORT
const indexRouter = require("./modules/index.router")
const schedule = require('node-schedule');
app.use(express.json())
const fs = require('fs')
const path = require('path')
const cors  = require('cors')
app.use(cors())
app.use('/api/v1/uploads', express.static(path.join(__dirname, './uploads')))
app.use('/api/v1/auth', indexRouter.authRouter)
app.use('/api/v1/user', indexRouter.userRouter)
app.use('/api/v1/post', indexRouter.postRouter)
app.use('/api/v1/admin', indexRouter.adminRouter)
const QRCode = require('qrcode');
const { createInvoice } = require('./services/pdf');
const sendEmail = require('./services/email');
app.get("/", (req, res) => {
    QRCode.toDataURL(`<a href='https://stackoverflow.com/questions/16531895/mongoose-query-where-value-is-not-null'> click me</a>`, function (err, url) {
        if (err) {
            res.status(400).json({ message: "QR err" })
        } else {
            console.log(url)
            res.json({ message: "QR", url })
        }
    })
})
const invoice = {
    shipping: {
        name: "John Doe",
        address: "1234 Main Street",
        city: "San Francisco",
        state: "CA",
        country: "US",
        postal_code: 94111
    },
    items: [
        {
            userName: "Mahmoud",
            Email: "mm@gmail.com",
            age: 22,
            gender: "Male",
            phone:'01142951602'
        },
        {
            userName: "Mahmoud",
            Email: "mm@gmail.com",
            age: 22,
            gender: "Male",
            phone:'01142951602'
        },
    
    ],
    userNumber: 8000,
    paid: 0,
    invoice_nr:147830
};
createInvoice(invoice, path.join(__dirname, './uploads/PDF/invoice.pdf'));

attachment = fs.readFileSync(path.join(__dirname, './uploads/PDF/invoice.pdf')).toString("base64");
//sendGrid
// sendEmail("routesession@gmail.com" ,`<p>open your invoice</p>` , {
//     content: attachment,
//     filename: "attachment.pdf",
//     type: "application/pdf",
//     disposition: "attachment"
//   })


// sendEmail("routesession@gmail.com" ,`<p>open your invoice</p>`, [
//     {
//         filename: 'invoice.pdf',
//         path:path.join(__dirname, './uploads/PDF/invoice.pdf')
//     }
// ])
schedule.scheduleJob('30 6 20 25 6 6', function(){
  console.log('The answer to life, the universe, and everything!');
});
connectDB()
app.listen(port, () => {
    console.log(`server is runnin on port :::: ${port}`);
})