const { MongoClient } = require('mongodb')
const env = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

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
            await res.send({ message: "Email already in use by another user. Please try another email." })
        } else {
            await Users.insertOne({
                name,
                email,
                password
            }).then(
                await res.send({ message: "Successfully registered! Proceed to login." })
            ).catch(
                err => { res.send(err) })
        }
        client.close()
    }
    ssnr()
})




app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})