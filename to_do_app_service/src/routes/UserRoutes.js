const { Router } = require('express');
const router = Router();
const userService = require('../service/UserService.js');

router.get('/user/test', (req, res) => {
    res.send('API Usuario funcionando');
});

router.post('/user/login', (req, res) => {
    userService.LogIn(req.body.email, req.body.password)
    .then(user => res.status(200).json({status: 200, data: user}))
    .catch(err => res.status(500).json({ status: 500, message: 'Hubo un error en el servicio' }));
});

module.exports = router;