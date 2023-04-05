const connectToMongo =require('./db.js');
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json()); //This function enables us to print req.body otherwise it will print undefined if we will not use this app.use(express.json) try it by commenting this
//Available Routes
app.use('/api/auth',require('./routes/auth')) //ye humlog ./routes/auth mein jo hai usko execute karne ke liye likhe hai chahte to yahi likh lete (app.get use karke) lekin raita fail jata is liye isko alag se routes folder mein alag alag naam se hi file bana dale
app.use('/api/notes',require('./routes/notes'))//ye humlog ./routes/notes mein jo hai usko execute karne ke liye likhe hai chahte to yahi likh lete (app.get use karke) lekin raita fail jata is liye isko alag se routes folder mein alag alag naam se hi file bana dale

app.listen(port, () => {
  console.log(`Secrets app listening on port ${port}`)
})