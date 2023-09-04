// Audience Id :  de932a17cb
// API Key : 437bbca7c3753ba8e54647f8ea3f4046-us21
const express = require('express')
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.post('/', (req, res) => {
    const fname = req.body.fName;
    const lname = req.body.lname;
    const email = req.body.email;
    const myData = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]

    };

    const postData = JSON.stringify(myData);
    const url = "https://us21.api.mailchimp.com/3.0/lists/de932a17cb";
    const options = {
        method: "POST",
        auth: "Gaurav:437bbca7c3753ba8e54647f8ea3f4046-us21"
    }

    const request = https.request(url, options, (response) => {
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/fail.html")
        }
    })

    request.write(postData);
    request.end();

})

app.get('/failure',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


app.listen(process.env.PORT || 3500, () => {
    console.log("Server started on Port 3500");
})