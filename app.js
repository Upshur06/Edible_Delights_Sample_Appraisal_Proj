const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Edible = require("./models/edibleDelights");

mongoose.connect('mongodb://localhost:27017/edibleDelights', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    // console.log(req.body);
    const treat = new Edible(req.body);
    await treat.save();
    res.redirect(`/edibletreat/${treat._id}`);
})


app.get('/edibletreat/:id', async (req, res) => {
    const treat = await Edible.findById(req.params.id);
    res.render('treats/detail', {treat});
})

app.get('/edibletreat/:id/edit', async (req, res) => {
    const treat = await Edible.findById(req.params.id);
    res.render('treats/edit', {treat});
})

app.put('/edibletreat/:id', async (req, res) => {
    const { id } = req.params;
    const treat = await Edible.findByIdAndUpdate(id,{ ...req.body });
    res.redirect(`/edibletreat/${treat._id}`);
})

app.delete('/edibletreat/:id', async (req, res) => {
    const { id } = req.params;
    await Edible.findByIdAndDelete(id);
    res.redirect(`/edibletreats`);
})

app.listen(3000, ()=>{
    console.log(`listening to port: 3000`);
})