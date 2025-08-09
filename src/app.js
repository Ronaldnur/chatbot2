const express = require('express')
const app = express()
require('dotenv').config()
PORT=process.env.PORT
const cors= require('cors')
const cookieParser=require ('cookie-parser')
const chatRoute=require('../src/chatbot/chatbotRoute')


app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.listen(PORT,()=>{
    console.log('Server Running in port: ' + PORT)
})

app.use('/chatbot',chatRoute)


app.get('/',(req,res)=>{
    res.send('Study Jam Gdgoc')
})
