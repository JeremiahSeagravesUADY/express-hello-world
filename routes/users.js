import express from 'express';
const router = express.Router();

// Mock database
const users = [
    {
        first_name: 'Robertito Manco :V',
        last_name: 'El Manco Rodriguez',
        email: 'algo@mail.com',
    },
    {
        first_name: 'San Juan de la Ulla',
        last_name: 'AY Papantla',
        email: 'tushijosvuelan@algo.com',
    },
];

// Getting the list of users from the mock database
router.get('/', (req, res) => {
    res.send(users);
})

export default router