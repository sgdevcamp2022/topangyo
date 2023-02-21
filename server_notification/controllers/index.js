const express = require('express');
const { async } = require('q');
const router = express.Router();

router.get('/', async (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running'
    });
});


module.exports = router;