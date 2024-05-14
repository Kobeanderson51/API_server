const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');

require('dotenv').config();
const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ errorMessage: 'Token is required' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ errorMessage: 'Invalid token' });
        }
        req.user = decoded.user;
        next();
    });
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ errorMessage: 'Internal Server Error' });
};

const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

app.post('/getToken', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ errorMessage: 'Invalid username or password' });
    }
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});
app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ errorMessage: 'Internal Server Error' });
        }
        res.send(data);
    });
});

app.get('/cards', (req, res) => {
    // Implementation for retrieving all cards with optional query parameters for filtering
});

app.post('/cards/create', verifyToken, (req, res) => {
    // Implementation for creating a new card
});

app.put('/cards/:id', verifyToken, (req, res) => {
    // Implementation for updating an existing card
});

app.delete('/cards/:id', verifyToken, (req, res) => {
    // Implementation for deleting an existing card
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
