// Learning to create an API 
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModels')
const dontenv = require('dotenv')
dontenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//routes 

app.get('/', (req, res) => {
    res.send('Hello Node API')
})

app.get('/blog', (req, res) => {
    res.send("Hello BLOGS! BLOGSSSS!!!!")
})

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        product.price = 20
        await product.save()
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//Updating product
app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({ message: "Product with ID ${id} not found" })
        }
        const updatedproduct = await Product.findById(id)
        res.status(200).json(updatedproduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Deleting product
app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({ message: "Product with ID ${id} not found" })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//Connecting to Database
mongoose.connect(process.env.url)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(3000, () => {
            console.log('Node API is runnung on port server')
        });
    }).catch((Error) => {
        console.log(Error)
    })