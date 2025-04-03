
module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    status: {
      type: Sequelize.ENUM('pending', 'completed', 'in-progress'),
      defaultValue: 'pending'
    },
    priority: {
      type: Sequelize.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    },
    dueDate: {
      type: Sequelize.DATE
    }
  });

  return Todo;
};
