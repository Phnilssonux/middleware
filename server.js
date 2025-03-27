import express from "express";
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === 'Bearer mysecrettoken') {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

app.get('/', (req, res) => {
    res.send('Welcome to the public endpoint!');
});

app.get('/protected', authenticateUser, (req, res) => {
    res.send('You have accessed the protected endpoint!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
