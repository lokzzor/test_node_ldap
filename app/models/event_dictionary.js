module.exports = (sequelize, Sequelize) => {
	const EventDictionary = sequelize.define('event_dictionary', {
    event_name: {
        type: Sequelize.STRING,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  }
  
  );
	
	return EventDictionary;
}