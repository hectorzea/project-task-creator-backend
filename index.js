const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
connectDB();
app.use(cors());
const PORT = process.env.port || 4000;

app.use(express.json({extended: true}));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));


app.listen(PORT, () => {
    console.log(`App Listening In Port ${PORT}`);
});