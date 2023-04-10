const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const port = 9000;
// const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const { bookReturnReminders } = require('./scheduler/scheduler')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

bookReturnReminders();  

app.use('/admin',adminRouter)
app.use('/',userRouter)

app.use(errorHandler)


app.listen(port, () => console.log(`app listening on port ${port}!`));