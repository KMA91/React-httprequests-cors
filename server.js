var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")

var app = express()

app.use(cors())
app.use(bodyParser.json())

app.post("/logins", function(request, response) {
    if(loginIsCorrect()) 
        acceptLogin()
    else
        rejectLogin()

    function loginIsCorrect() {
        var username = request.body.username
        var password = request.body.password

        return username === "john.doe" &&
            password === "Qwerty"

    }

    function acceptLogin() {
        response
            .status(200)
            .json({
                statusCode: "200",
                payload: {
                    message: "Hello, John Doe"
                }
            })
    }

    function rejectLogin() {
        response
            .status(401)
            .json({
                statusCode: "401",
                payload: {
                    message: "Invalid username/password"
            }
        })
    }
})


module.exports = app