module.exports = (sequelize, DataTypes) => {
  const Sprints = sequelize.define("Sprints", {
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
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive', 'Completed', 'Cancelled'),
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      allowNull: false,
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
  return Sprints;
};
