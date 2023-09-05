// Audience Id :  a1533db9bc
// API Key : d5ca3d5bd4fec9ebfd835949629061df-us21
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
    const url = "https://us21.api.mailchimp.com/3.0/lists/a1533db9bc";
    const options = {
        method: "POST",
        auth: "Gaurav:d5ca3d5bd4fec9ebfd835949629061df-us21"
    }

    const request = https.request(url, options, (response) => {
     //   console.log(response);
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
