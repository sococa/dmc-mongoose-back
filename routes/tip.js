const express = require('express')
const Tip = require('../models/tip')

const router = express.Router()

//cloudinary 
const cloudinary = require("cloudinary").v2

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


router.post('/tip/register', async (req, res) => {

    const fileKeys = Object.keys(req.files)
    let illustrationImg = "https://res.cloudinary.com/dxpu6oobm/image/upload/v1673002956/tipsImages/TipIllustrationDefault.jpg"

    if (fileKeys.length !== 0) {
    
        let illustrationUrl
        let illustrationUpload = req.files.inputIllustration.path
        illustrationUrl = await cloudinary.uploader.upload(illustrationUpload, { public_id: `tipsImages/${req.files.inputIllustration.name}`})
        illustrationImg = illustrationUrl.url
    
    }

    try {

        const newTip = new Tip({
            "title": req.fields.inputTitle,
            "content": req.fields.inputContent,
            "illustration": illustrationImg
        })

        await newTip.save()
        res.json('Conseil enregistré et désormais visible sur le site !')
    }

    catch(error) {

        if (error.errors.title) {
            res.json("Le titre n'est pas renseigné");
        }
        else if (error.errors.content) {
            res.json("Le contenu n'est pas renseigné");
        }
        else {
            res.json(error);
        }

    }

})

router.delete('/tip/deleteOne/:_id', async (req, res) => {

    try {

        const findById = await Tip.find({ _id: req.params._id })

        if (findById[0]._id !== undefined) {
            const deleteOneTip = await Tip.findByIdAndDelete({ _id: req.params._id });
            res.json({ message: 'Conseil supprimé !' })
        }

    } catch (error) {

        if (error.message === "Cannot read properties of undefined (reading '_id')") {
            res.json({ message: "Conseil introuvable" });
        }
        else {
            res.json({ message: error.message })
        }

    }

})

router.get('/tips/all', async (req, res) => {

    try {
        const seeAllTips = await Tip.find({})
        res.json(seeAllTips)
    } catch (error) {
        res.json({ message: error.message });
    }

})

/*
router.get('/tip/:_id', async (req, res)=> {
    
    try {
        const seeOneTip = await Tip.findById({ _id: req.params._id });
        res.json(seeOneTip)
    } catch (error) {
        console.log({ erreur: error.message })
        res.json('Conseil introuvable');
    }
    
})*/

router.put('tip/update/:_id', async (req, res) => {

    try {
        const updateOneTip = await Tip.updateOne({ _id: req.params._id })
        res.json('Conseil modifié !')
    } catch (error) {
        res.json({ message: error.message });
    }

})

module.exports = router