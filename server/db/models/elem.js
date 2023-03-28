const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Elem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Elem.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Elem',
  });
  return Elem;
};
