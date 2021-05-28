const {RandomSerie}=require('../controllers/methode')

module.exports = (sequelize,DataTypes) => {

    const Wallet = sequelize.define('Wallet',{

        
        cryp_name: DataTypes.STRING,
        value : DataTypes.FLOAT,
        wallet_number:{
            type : DataTypes.STRING,
            defaultValue :RandomSerie(6)
        }
    });



    Wallet.associate = models=>{
        Wallet.belongsTo(models.User,{
            foreignKey:{
                allowNull:false
            }
        })
      }


   


    return Wallet;

}