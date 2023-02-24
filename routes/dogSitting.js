const express = require('express')
const DogSitting = require('../models/dogSitting')

const router = express.Router()

router.post('/dogSitting/register', async (req, res)=> {

    const dateStart = req.fields.dateStart
    const dateEnd = req.fields.dateEnd
    
    const newDogSitting = new DogSitting({
        "dateStart": dateStart,
        "dateEnd": dateEnd
    })

    try {

        await newDogSitting.save()
        if(new Date(dateStart).getTime() < new Date(dateEnd).getTime()){
                res.json("Le créneau de ce gardiennage est sauvegardé !")
            }

        else {
            res.json("La date de début ne peut pas être supérieure à la date de fin")
        }

    }

    catch(error){
            
        if(error.errors.dateStart || error.message === "Cannot read properties of undefined (reading 'dateStart')"){
            res.json("Merci de renseigner la date de départ dans un format valide (AAAA/MM/JJ)")
        }
        else if(error.errors.dateEnd){
            res.json("Merci de renseigner la date de fin dans un format valide (AAAA/MM/JJ)")
        }
        else{
            res.json(error)
        }

    }

})

router.delete('/dogSitting/deleteOne/:_id', async (req, res)=> {

    try {

        const findById = await DogSitting.find({ _id: req.params._id })

        if(findById[0]._id !== undefined){
            const deleteOneSitting = await DogSitting.findByIdAndDelete({ _id: req.params._id });
            res.json('gardiennage supprimé !')
        }

    } catch (error) {

        if(error.message === "Cannot read properties of undefined (reading '_id')"){
            res.json({ message: "gardiennage introuvable" });
        }
        else{
            res.json({ message: error.message })
        }

    }

})

router.get('/dogSittings/all', async (req, res)=> {

    try {
        const seeAllDogSittings = await DogSitting.find({})
        res.json(seeAllDogSittings)
    } catch (error) {
        res.json({ message: error.message });
    }

})

router.get('/dogSitting/:_id', async (req, res)=> {
    
    if(req.params._id === 1){
        try {
            const seeOneDogSitting = await DogSitting.findById({ _id: req.params._id })
            res.json(seeOneDogSitting)
        } catch (error) {
            console.log({ erreur: error.message })
            res.json('Gardiennage introuvable')
        }
    }
    res.json("L'identifiant de gardiennage fourni est introuvable")

})


module.exports = router