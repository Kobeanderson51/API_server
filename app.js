const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt: jwtMiddleware } = require('express-jwt');
const path = require('path');
const fs = require('fs');
const app = express();

const secret = "supersecret";
const port = 3002;

const user = require('./data/users.json'); 
const users = user.users;

let cards = [];
try {
    const cardsdata = fs.readFileSync('./data/cards.json', 'utf8');
    cards = JSON.parse(cardsdata).cards;
} catch (error) {
    console.error('Error reading cards data:', error);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(currUser => currUser.username === username.trim());
    if (!user || user.password !== password.trim()) {
        return res.status(401).json({ errMessage: 'Invalid username or password' });
    }
    const token = jwt.sign({ username: user.username }, secret, { algorithm: 'HS256', expiresIn: '10d' });
    return res.json({ token: token });
});

app.get('/cards', jwtMiddleware({ secret: secret, algorithms: ['HS256'] }), (req, res) => {
    const filter = req.query.filter?.toLowerCase() || '';
    const filteredCards = cards.filter(card => card.name.toLowerCase().includes(filter));
    console.log(req.auth.username, 'is accessing card names');
    res.json({ cards: filter ? filteredCards : cards });
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ errMessage: 'Invalid token' });
    }
    console.error(err.stack);
    res.status(500).json({ errMessage: 'Something went wrong' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
