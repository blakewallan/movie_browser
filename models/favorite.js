'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    title: DataTypes.STRING,
    imdbid: DataTypes.STRING,
    imagelink: DataTypes.STRING,
    year: DataTypes.INTEGER,
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favorite;
};