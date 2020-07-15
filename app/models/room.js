module.exports = (sequelize, Sequelize) => {
	const Room = sequelize.define('room_', {
    room_name: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    building_number: {
        type: Sequelize.INTEGER,
        unique: true
	  },
	room_number: {
        type: Sequelize.INTEGER,
        unique: true
	  },
    capacity: {
        type: Sequelize.INTEGER,
    },
    description: {
		type: Sequelize.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  }
  );
	
	return Room;
}