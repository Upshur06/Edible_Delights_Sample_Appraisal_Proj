const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    console.log('This is the "/" root page');
    res.render('home');
})

app.listen(port, ()=>{
    console.log(`listening to port: ${port}`);
})