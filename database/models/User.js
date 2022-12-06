module.exports = (sequelize, DataTypes) => {

    let User = sequelize.define(
        "User",
        {
            idUsers: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            Nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Sobrenome: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Telefone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Endereco: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Cidade: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Estado: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Senha: {
                type: DataTypes.STRING,
                allowNull: true
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true
            }

        },
        {
            tableName: "users",
            timestamps: false,
            paranoid: false

        }

    )
    User.associate = function (model) {
        User.hasMany(model.Purchase, { as: "purchases", foreignKey: "Users_idUsers" });
    }
    return User;

};  