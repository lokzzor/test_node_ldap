module.exports = (sequelize, Sequelize) => {
	const Event = sequelize.define('event_', {
    room_name: {
		type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    event_name: {
		type: Sequelize.STRING
    },
	person_id: {
        type: Sequelize.INTEGER
    },
    first_date: {
        type: Sequelize.DATE
    },
    time_start: {
		type: Sequelize.TIME
    },
    time_end: {
		type: Sequelize.TIME
    },
    day_of_week: {
        type: Sequelize.INTEGER
    },
    last_date: {
		type: Sequelize.DATE
    },
    admin_id: {
        type: Sequelize.INTEGER
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  }
  );
	
	return Event;
}