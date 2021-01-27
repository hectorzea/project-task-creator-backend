const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
connectDB();
app.use(cors());
const port = process.env.port || 4000;

app.use(express.json({extended: true}));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));


app.listen(port, '0.0.0.0', () => {
    console.log(`App Listening In Port ${port}`);
});