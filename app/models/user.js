module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('person_', {
    person_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    person_name: {
		  type: Sequelize.STRING,
      unique: true
	  },
	  email: {
      type: Sequelize.STRING,
      unique: true
	  },
    is_admin: {
		  type: Sequelize.BOOLEAN
    },
    is_active: {
		  type: Sequelize.BOOLEAN
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  }
  );
	
	return User;
}