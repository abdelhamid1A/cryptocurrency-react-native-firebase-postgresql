const { User } = require('../models');
const { Wallet } = require("../models");
const db = require('../models')
const jwt = require('jsonwebtoken')
const { RandomSerie } = require('./methode')



const addUser = async (req, res) => {
        // console.log(RandomSerie(5));
        const userId = req.params.id
        // const userId = "DJnlrOk98qV4KHqYcyKGXosiId14"
        console.log(userId)
        // return
        try {
                const user = await db.User.findOne({ where: {
                        f_uid: userId
                }});
                // console.log(user);
                // return
                if (user) {
                        // console.log(user.dataValues);
                        const token = jwt.sign({ id: user.dataValues.id, currencyName: user.dataValues.localCrncy }, process.env.JWT_KEY)
                        console.log('finded');
                        // console.log(token);
                        res.status(200).json({ token })
                } else {
                        User.create({
                                f_uid: userId,
                        })
                                .then(newUser => {
                                        console.log(newUser);
                                        const token = jwt.sign({ id: newUser.dataValues.id, currencyName: newUser.dataValues.localCrncy }, process.env.JWT_KEY)
                                        console.log('new user');
                                        res.status(200).json({ token })
                                })
                                .catch(err => console.log(err))
                }
        } catch (error) {
                console.log(error);
        }
}

const findUser = async (req, res) => {
        console.log(123);
        const token = req.header('auth-token')
        if(token){

                console.log(token);
                const decodeToken = jwt.verify(token,process.env.JWT_KEY)
                console.log(decodeToken);
                try {
                        await User.findByPk(decodeToken.id)
                        .then(async user =>{
                                const walletUser = await Wallet.findAll({where:{UserId:user.dataValues.id}})
                                if(walletUser){
                                        res.status(200).send({user,walletUser:[walletUser]})  
                                        return   
                                }
                                res.status(200).json({user})
                        })   
                } catch (error) {
                        console.log(error)
                }
        }else{
                console.log('token error');
                res.status(404).send('token error')
        }
        

}


module.exports = { addUser ,findUser}