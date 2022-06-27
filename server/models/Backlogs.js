module.exports = (sequelize, DataTypes) => {
  const Backlogs = sequelize.define("Backlogs", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // status: {
    //   type: DataTypes.ENUM('To Do', 'In Progress', 'Completed', 'Pending', 'Cancelled'),
    //   allowNull: false,
    // },
    // priority: {
    //   type: DataTypes.ENUM('Low', 'Medium', 'High'),
    //   allowNull: false,
    // // },
    // assignedDate: {
    //   type: DataTypes.DATE,
    // defaultValue: DataTypes.NOW,
    // },
    labelID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assignedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });

  // Posts.associate = (models) => {
  //   Posts.hasMany(models.Tasks, {
  //     onDelete: "cascade",
  //   });
  // };
  return Backlogs;
};
