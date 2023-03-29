const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Edible = require("./models/edibleDelights");

mongoose.connect('mongodb://localhost:27017/edibleDelights', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// .then(() =>{
//     console.log("CONNECTION OPEN");
// })
// .catch((error) => {
//     console.log('NO error');
//     console.log(error)
// });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    console.log('This is the "/" root page');
    // res.send("Hello Edible");
    res.render('home');
})

// app.get('/edibletreats', async (req, res) => {
//     const treat = new Edible({ 
//         name : "Brownie Bustin",
//         price : "$12.99",
//         discription : "Chocolate Brownie, covered in chocolate pudding, chocolate  chips. Should bring a delightful flavor to your tastebuds",
//         category : "Other"
//     })
//     await treat.save();
//     res.send(treat);
// })

app.get('/edibletreats', async (req, res) => {
    const treats = await Edible.find();
    res.render('treats/index', {treats});
})

app.get('/createtreat/new', (req, res) => {
    res.render('treats/create');
})

app.post('/edibletreats', async (req, res) => {
    const treat = new Edible(req.body.edible);
    await treat.save();
    res.redirect(`/edibletreats/${treat._id}`);
})

app.get('/edibletreats/:id', async (req, res) => {
    const treat = await Edible.findById(req.params.id);
    res.render('treats/detail', {treat});
})


app.listen(3000, ()=>{
    console.log(`listening to port: 3000`);
})