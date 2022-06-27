module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    taskID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentTime: {
      type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    },
    commentBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Comments;
};
