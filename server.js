const { MongoClient } = require('mongodb')
const env = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const nodemailer = require('nodemailer')

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(cors())

const uri = process.env.MONGODB_URI

// const ssnr = async (coll) => {
//     const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     const db = client.db("login_data")
//     const Users = db.collection(coll)
//     return client, Users
// }

app.post("/login", (req, res) => {
    const ssnr = async () => {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db("login_data")
        const Users = db.collection("login_users")

        const { email, password } = req.body

        const user_exist = await Users.find({ email: email }).count()
        const user = await Users.findOne({ email: email })
        if (user_exist > 0) {
            if (await password === user["password"]) {
                await res.send({ message: "Login Successful!", user: user })
            } else {
                await res.send({ message: "Invalid password. Please try again." })
            }
        } else {
            await res.send({ message: "Email not registered. Please register and login." })
        }
        client.close()
    }
    ssnr()
})

app.post("/register", (req, res) => {
    const ssnr = async () => {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db("login_data")
        const Users = db.collection("login_users")

        const { name, email, password } = req.body

        const user_exist = await Users.find({ email: email }).count()
        const user = await Users.findOne({ email: email })
        if (user_exist > 0) {
            await res.send({ message: "Email already in use by another user. Please try another email.", err: true })
        } else {
            await Users.insertOne({
                name,
                email,
                password
            }).then(
                await res.send({ message: "Successfully registered! Proceed to login.", err: false })
            ).catch(
                err => { res.send(err) })
        }
        client.close()
    }
    ssnr()
})

app.post("/forgot", (req, res) => {
    const ssnr = async () => {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db("login_data")
        const Users = db.collection("login_users")

        const { email } = req.body
        const otp = parseInt(Math.random() * 1000000)
        window.localStorage.setItem("otp", otp)

        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: '[SPARK IITR] OTP verification for password reset',
            html: 'Your OTP is<br/><br/><b>' + otp +
                '</b><br/><br/>Use it to reset your password.<br/>Please do not share it with anyone.'
        };

        const user_exist = await Users.find({ email: email }).count()
        if (user_exist > 0) {
            await transporter.sendMail(mailOptions
            ).then(
                await res.send({ message: "OTP sent! Please check your inbox.", err: false })
            ).catch(
                err => { res.send(err) })
        } else {
            await res.send({ message: "Email not found.", err: true })
        }
        client.close()
    }
    ssnr()
})

app.post("/reset", (req,res) =>{
    
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})