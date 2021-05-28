const { Wallet } = require("../models");
const { User } = require("../models");
const jwt = require("jsonwebtoken")

const addWallet = async (req, res) => {
  try {
    const token = req.header('auth-token')
    console.log(token);
    console.log(req.body);
    const idUser = jwt.verify(token, process.env.JWT_KEY).id
    console.log(idUser);
    const { currencyPrice, currencyName, value } = req.body;

    const user = await User.findByPk(idUser);
    // console.log(user);
    const solde = user.dataValues.solde
    const newSolde = solde - currencyPrice;

    if (solde >= currencyPrice) {
      try {
        const userWallet = await Wallet.findAll({
          where: {
            UserId: idUser,
            cryp_name: currencyName,
          },
        });
        console.log(userWallet); 
        if (userWallet.length > 0) {
          // update wallet
          console.log("here found");
          console.log(userWallet);
          const newValue = userWallet[0].dataValues.value + value;
  
          await userWallet[0]
            .update({
              value: newValue,
            })
            .then(() => {
              user.update({
                solde: newSolde,
              });
            });
          res.send("payement created");
        } else {
          console.log("new wallet");
          await Wallet.create({
            UserId: idUser,
            cryp_name: currencyName,
            value: value,
          }).then(() => {
            user.update({
              solde: newSolde,
            });
          });
          res.send("payement created");
        }
      } catch (error) {
        console.log(error);
      }
      // return 
      
    } else {
      res.send("Insufficient balance ");
    }
  } catch (err) {
    res.json(err);
  }
};



const sellCrypto = async (req, res) => {
  const token = req.header('auth-token')
  const idUser = jwt.verify(token, process.env.JWT_KEY).id;
  console.log(idUser);
  const { currencyName, value, wallet_number } = req.body;
  console.log(req.body);

  try {
    const findBuyerWallet = await Wallet.findOne({
      where: {
        wallet_number: wallet_number,
        cryp_name: currencyName,
      },
    });
    // console.log(findBuyerWallet.dataValues.value);
    // return
    if (findBuyerWallet) {
      const userBuyer = findBuyerWallet.dataValues.UserId
      const user = await User.findOne({ id: idUser });
      // const newSolde = user.solde + currencyPrice;
      const findSellerWallet = await Wallet.findOne({
        where: {
          UserId: idUser,
          cryp_name: currencyName,
        },
      })

      console.log(findSellerWallet.dataValues.value);
      // return
      if (findSellerWallet) {
        if (findSellerWallet.dataValues.value >= value) {
          // console.log("here");
          // return
          const newVal = parseFloat(findBuyerWallet.dataValues.value) + parseFloat(value)
          console.log(newVal);
          try {
            await findBuyerWallet.update({
              value: newVal
            }).then(async () => {
              await findSellerWallet.update({
                value: findSellerWallet.dataValues.value - value

              })
              res.status(200).send('transfer successfully')
            })
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(401).send('you can\'t sall more then ' + findSellerWallet.dataValues.value)
        }
      } else {
        console.log('your wallet not found');
      }
      
    } else {
      res.status(404).send('this wallet not found')
    }

  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { addWallet, sellCrypto };
