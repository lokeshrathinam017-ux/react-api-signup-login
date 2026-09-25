const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const users = [
    { username: "Loki", email: "loki@gmail.com", password: "123" }
]

app.post("/login", function(req, res)
{
    let userfound = false
    let loggeduser = ""

    for(let i = 0; i < users.length; i++)
    {
        if(users[i].username === req.body.username && users[i].email === req.body.email && users[i].password === req.body.password)
        {
            userfound = true
            loggeduser = users[i].username
        }
    }

    if(userfound)
    {
        res.send({ success: true, username: loggeduser })
    }
    else {
        res.send({ success: false, message: "Invalid email or password" })
    }
})

app.post("/signup", function(req, res)
{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    users.push({ username, email, password })
    res.send(true)
})

app.listen(5000, function()
{
    console.log("Server Started..")
})