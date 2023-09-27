const express = require('express')
const User = require('../models/user')
const Dog = require('../models/dog')

const router = express.Router()

//cloudinary 
const cloudinary = require("cloudinary").v2

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

router.post('/user/register', async (req, res)=> {
    try{

        const newUser = new User({

            "firstName": req.fields.inputFirstName,
            "lastName" : req.fields.inputLastName,
            "email" : req.fields.inputEmail,
            "phone" : req.fields.inputPhone
            
        })
        
        await newUser.save()

        //envoie photo cloudinary
        let resultDogPhoto
        const dogPhotoUpload = req.files.inputDogPhoto.path
        resultDogPhoto = await cloudinary.uploader.upload(dogPhotoUpload, { public_id: `dogPhotos/${req.files.inputDogPhoto.name}` })
        const findUser = await User.findOne({ email:req.fields.email })
        
        const newDog = new Dog({
    
            "dogName":req.fields.inputDogName,
            "photo": resultDogPhoto.url,
            "race": req.fields.inputRace,
            "owner": findUser
    
        })
        console.log(dogPhotoUpload)
    
        await newDog.save()
        res.json('Vous êtes bien enregistré en base de données')
    }
    
    catch(error){
        //Regarder si possible d'être moins précis dans les if else if 
        if( error._message === 'User validation failed'){
            res.json("Merci d'inscrire votre nom, votre prénom, votre email et votre numéro de téléphone")
        }

        else if(error.code === 11000 ){
            res.json("Cet email est déjà enregistré")
        }
    
        else{
            console.log(error)
        }

    }

})

router.delete('/user/deleteOne/:_id', async (req, res)=> {

    try {

        const findById = await User.find({ _id: req.params._id })

        if(findById[0]._id !== undefined){
            const deleteOneUser = await User.findByIdAndDelete({ _id: req.params._id });
            res.json({message: 'Utilisateur supprimé !'})
        }

    } catch (error) {

        if(error.message === "Cannot read properties of undefined (reading '_id')"){
            res.json({ message: "Utilisateur introuvable" });
        }
        else{
            res.json({ message: error.message })
        }

    }

})

router.get('/users/all', async (req, res)=> {

    try {
        const seeAllUsers = await User.find({})
        res.json(seeAllUsers)
    } catch (error) {
        res.json(error);
    }

})

module.exports = router