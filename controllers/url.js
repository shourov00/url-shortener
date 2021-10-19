const Url = require("../models").url
const UUID = require("uniqid")
const {validationResult} = require("express-validator");

exports.postUrl = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()[0].msg, success: false});
    }

    const {url} = req.body

    try{
        const savedUrl = await Url.create({
            url,
            slug: UUID()
        })

        res.status(200).json({message: "Url shortened successfully.", success: true, data: savedUrl})

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error');
    }
}

exports.getUrlBySlug = async (req, res) => {
    try{
        const savedUrl = await Url.findOne({
            where: {
                slug: req.params.slug
            }
        })

        if(!savedUrl){
            return res.status(400).json({message: "No data found!", success: true, data: []})
        }

        res.status(200).json({message: "Url data", success: true, data: savedUrl})

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error');
    }
}
