module.exports = (sequelize, DataTypes) => {
  const SubTasks = sequelize.define("SubTasks", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    taskID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return SubTasks;
};
