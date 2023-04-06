const express = require('express');
const link = require('./link/linkRouter');
const user = require('./user/userRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user',user);
// app.use('/link',link);

app.listen(PORT,()=>{
    console.log("App listening at port: ", PORT)
})
