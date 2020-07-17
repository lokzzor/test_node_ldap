module.exports = (sequelize, Sequelize) => {
	const EventDictionary = sequelize.define('event_dictionary', {
    event_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true    }
  }, {
    timestamps: false,
    freezeTableName: true,
  }
  
  );
	
	return EventDictionary;
}