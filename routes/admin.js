const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const uid2 = require('uid2')
const salt = uid2(16);
const token = uid2(16);
const SHA256 = require('crypto-js/sha256')
const encBase64 = require('crypto-js/enc-base64')

router.post('/admin/register', async (req, res)=>{
   
    try {

        const postEmail = req.fields.email;
        const password = req.fields.password;

        const hashGenerate = SHA256(password + salt).toString(encBase64);

        const newAdmin = new Admin({
            email: postEmail,
            token: token,
            salt: salt,
            hash: hashGenerate
        })

        await newAdmin.save();
         res.status(200).json({
            _id: newAdmin._id,
            token: newAdmin.token,
        })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

})

router.post('/admin/login', async (req, res) => {
    try {
        const postEmail = req.fields.email;
        const password = req.fields.password;
        const verif = await Admin.findOne({ email: postEmail });

        if (req.fields.email) {
            // si l'utilisateur existe en bdd
            if (verif) {
              const newHash = SHA256(password + verif.salt).toString(encBase64);
              if (newHash === verif.hash) {
                res.status(200).json({
                  _id: verif._id,
                  token: verif.token,
                  account: verif.account,
                });
              } else {
                res.status(400).json(`Le mot de passe est incorrect`);
              }
            } else {
              res.status(400).json(`${postEmail} inconnu en bdd`);
            }
          } else {
            res.status(400)
            res.json(`Vous devez rentrer une adresse mail pour vous connecter`);
          }

    } catch (error) {
        
    }
})

module.exports = router