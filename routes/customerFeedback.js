const express = require('express')
const CustomerFeedback = require('../models/customerFeedback')
const User = require('../models/user')

const router = express.Router()

router.post('/feedback/register', async (req, res)=>{
    const emailAskedForFeedback = req.fields.emailForFeedback

    try {

        //demander le mail du user pour vérifier qu'il peut laisser un feedback
        // const verifEmail = await User.find({ email: emailAskedForFeedback})

        // if(verifEmail[0]._id !== undefined){
            const newFeedback = new CustomerFeedback({
                "comment" : req.fields.inputComment,
                "note" : req.fields.inputNote
            })
            await newFeedback.save()
            res.json('Votre avis est enregistré. Merci !' )
        // }

        // else{
        //     res.json(error)
        // }
    } 
    catch(error) {

        if(error.message === "Cannot read properties of undefined (reading '_id')"){
            res.json("Vous n'êtes pas enregistré");
        }
        else if(error.errors.note){
            res.json("Merci de nous laisser une note entre 0 et 5. Cela nous aide beaucoup.")
        }
        else if(error.errors.comment){
            res.json("Merci de nous laisser un commentaire. Cela nous aide beaucoup.")
        }
        else {
            console.log(error)
        }

    }
  
})

router.delete('/feedback/deleteOne/:_id', async (req, res)=> {

    try {

        const findById = await CustomerFeedback.find({ _id: req.params._id })

        if(findById[0]._id !== undefined){
            const deleteOneFeedback = await CustomerFeedback.findByIdAndDelete({ _id: req.params._id });
            res.json('Avis supprimé !')
        }

    } catch (error) {

        if(error.message === "Cannot read properties of undefined (reading '_id')"){
            res.json({ message: "avis introuvable" });
        }
        else{
            res.json({ message: error.message })
        }

    }

})

router.get('/feedbacks/all', async (req, res)=> {

    try {
        const seeAllFeedbacks = await CustomerFeedback.find({})
        res.json(seeAllFeedbacks)
    } catch (error) {
        res.json({ message: error.message });
    }

})

router.get('/feedback/:_id', async (req, res)=> {
    
    try {
        const seeOneFeedback = await CustomerFeedback.findById({ _id: req.params._id });
        res.json(seeOneFeedback)
    } catch (error) {
        console.log({ erreur: error.message })
        res.json('Avis introuvable');
    }
    
})


module.exports = router