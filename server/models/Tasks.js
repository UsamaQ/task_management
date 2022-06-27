module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define("Tasks", {
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
    status: {
      type: DataTypes.ENUM('To Do', 'In Progress', 'Completed', 'Pending', 'Cancelled'),
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM('Tiny', 'Small', 'Medium', 'Large', 'Extra Large'),
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    backlogID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sprintID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    labelID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    commentsID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    percentCompleted: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assignedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    attachment: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
  });

  Tasks.associate = (models) => {
    Tasks.hasMany(models.SubTasks, {
      onDelete: "cascade",
    });
  };

  // Posts.associate = (models) => {
  //   Posts.hasMany(models.Comments, {
  //     onDelete: "cascade",
  //   });
  // };
  return Tasks;
};
