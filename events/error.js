
const logger = require('../modules/logger.js');

const obj = {
	async run(error) {
		logger.error(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`);
	}
};

module.exports = obj;
