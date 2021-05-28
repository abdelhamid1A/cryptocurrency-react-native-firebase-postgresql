
module.exports = (sequelize,DataTypes) => {

    const User = sequelize.define('User',{

        f_uid: DataTypes.STRING,
        solde: {
            type : DataTypes.FLOAT,
            defaultValue : 5000
        },
        localCrncy: {
            type : DataTypes.STRING,
            defaultValue : 'USD'
        }


    });


    User.associate = models=>{
        User.hasMany(models.Wallet)
      }
   


    return User;

}