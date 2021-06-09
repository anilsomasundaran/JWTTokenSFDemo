const express = require("express");
const helmet = require("helmet");
const config = require("dotenv").config();
const jwtLib = require("./lib/jwtlib");
const apiLib = require('./lib/apilib');

const app = express();
app.use(helmet());

const port = process.env.PORT;
const host = process.env.HOST;
const env = process.env.NODE_ENV;


app.get('/', (req,res) => {
    getToken();
    res.send("Hello World");
});

async function getToken() {
    let options = {
        iss: process.env.CLIENT_ID,
        sub: process.env.USER_NAME,
        aud: process.env.URL,
        privateKey: jwtLib.readPrivateKey()
    }
    //console.log(JSON.stringify(options));
    const token = await jwtLib.getJWTToken(options);
    const access_token = apiLib.requestToken(token);
    //const soql = "Select id name from Account".replaceAll(" ", "+");
    //console.log("Query => " + soql)
    //apiLib.query(access_token, soql);
    console.log(token);
}

getToken();

app.listen(port, () => {
    console.log(`server started at port : ${port}`);
})

process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated')
    })
})
