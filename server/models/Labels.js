module.exports = (sequelize, DataTypes) => {
  const Labels = sequelize.define("Labels", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    labelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    labelColor: {
      type: DataTypes.ENUM('badge-soft-danger', 'badge-soft-warning', 'badge-soft-secondary', 'badge-soft-info', 'badge-soft-success'),
      allowNull: false,
    },
    taskID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return Labels;
};
