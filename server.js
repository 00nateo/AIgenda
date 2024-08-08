//require stack
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {GoogleGenerativeAI} = require ('@google/generative-ai');

//app setup
const app = express();
const port = 8080;
app.use('/',express.static('public'));
app.use(bodyParser.json());
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/index.html'));
})


app.post('/submit', async (req, res) => {
    const list = req.body.list;
    console.log('Server recieved: ' + list);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = "reorder this list based on time efficiency, ease to do, overall importance, and necessity. make sure to group tasks that can be done at the same time together. give me the response in the same syntax i originally gave you the list with no changes to the string or extra characters\n" + list;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const apiResponse = response.text();

    console.log("Server says API RESPONSE IS: " + apiResponse);

    res.send(apiResponse)
})



app.get('/gemini', async (request, res) =>{
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = "Explain NodeJS in fortnite terms"

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json(text);
})



app.listen(port, function(error){
    if(error){
        console.log('Someting went wrong', error);
    }else{
        console.log('Server is listening on port ' + port);
    }
});
console.log('Node.js web server');