const { Router } = require('express');
const router = Router();
const todoService = require('../service/ToDoService.js');

router.get('/todo/test', (req, res) => {
    res.send('API ToDo funcionando');
});

router.get('/todo/:id', (req, res) => {
    todoService.getById(req.params.id)
    .then(todo => res.status(200).json({status: 200, data: todo}))
    .catch(err => res.status(500).json({ status: 500, message: 'Hubo un error en el servicio' }));
});

router.post('/todo', (req, res) => {
    todoService.create(req.body.title, req.body.description, req.body.id_usuario)
    .then(todo => res.status(200).json({status: 200, data: todo}))
    .catch(err => res.status(500).json({ status: 500, message: 'Hubo un error en el servicio' }));
});

router.delete('/todo/:id', (req, res) => {
    todoService.delete(req.params.id)
    .then(todo => res.status(200).json({status: 200, data: todo}))
    .catch(err => res.status(500).json({ status: 500, message: 'Hubo un error en el servicio' }));
});

router.put('/todo/close/:id', (req, res) => {
    todoService.close(req.params.id)
    .then(todo => res.status(200).json({status: 200, data: todo}))
    .catch(err => res.status(500).json({ status: 500, message: 'Hubo un error en el servicio' }));
});

module.exports = router;