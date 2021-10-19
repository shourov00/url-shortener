const express = require('express')
const {check, body} = require('express-validator');
const UrlControllers = require("../controllers/url")

const router = express.Router();

// @route   POST api/url
// @desc    Save url in database
// @access  Public
router.post('/url', [
        body('url', 'Url can not be empty').trim().not().isEmpty()
    ],
    UrlControllers.postUrl
)

// @route   GET api/url/:slug
// @desc    Get url by slug
// @access  Public
router.get('/url/:slug', UrlControllers.getUrlBySlug)



module.exports = router
