const router = require('express').Router()
const mongoose = require('mongoose')

const Produto = require('../models/produtos')
const checkAuth = require('../middleware/checkAuth')

router.get('/', (req, res, next) => {
    Produto.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(reject => {
            res.status(500).json({
                error: reject
            })
        })
})

router.get('/:produtoId', (req, res, next) => {
    const id = req.params.produtoId

    res.status(200).json({
        message: `Produto ${id}`
    })
})

router.post('/', checkAuth, (req, res, next) => {

    const produto = new Produto ({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        preco: req.body.preco
    })

    produto.save()
        .then(result => {
            res.status(201).json({
                message: 'Produto salvo com sucesso!',
                produto: produto
            })
        })
        .catch(reject => {
            res.status(500).json({
                error: reject
            })
        })
})

module.exports = router