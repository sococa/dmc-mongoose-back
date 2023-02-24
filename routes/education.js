const express = require('express')
const Education = require('../models/education')

const router = express.Router()

router.post('/education/register', async (req, res)=> {

    try{

        const newEducation = new Education({
            "problemDescription": req.fields.inputProblem,
            "solutions": req.fields.inputSolutions,
            "duration": req.fields.inputDuration
        })
    
        await newEducation.save()
    
        res.json("Exemple d'éducation enregistré")

    }

    catch(error) {
        if(error.errors.inputProblem){
            res.json("La description du problème n'est pas renseignée")
        }
        else if(error.errors.inputSolutions){
            res.json("La solution au problème n'est pas renseignée")
        }
        else if(error.errors.inputDuration){
            res.json("La durée du problème n'est pas renseignée")
        }
        else if(error){
            res.json(error)
        }
    }

})


router.delete('/education/deleteOne/:_id', async (req, res)=> {
   
    try {

        const findById = await Education.find({ _id: req.params._id })

        if(findById[0]._id !== undefined){
            const deleteOneEducation = await Education.findByIdAndDelete({ _id: req.params._id });
            res.json({ message: 'Avis supprimé !' })
        }

    } catch (error) {

        if(error.message === "Cannot read properties of undefined (reading '_id')"){
            res.json({ message: "Exemple d'éducation introuvable" });
        }
        else{
            res.json({ message: error.message })
        }

    }

})


router.get('/educations/all', async (req, res)=> {

    try {
        const seeAllEducations = await Education.find({})
        res.json(seeAllEducations)
    } catch (error) {
        res.json(error);
    }

})


router.get('/education/:_id', async (req, res)=> {
    
    try {
        const seeOneEducation = await Education.findById({ _id: req.params._id });
        res.json(seeOneEducation)
    } catch(error) {
        console.log({ erreur: error.message })
        res.json("Exemple d'éducation introuvable");
    }
    
})

module.exports = router