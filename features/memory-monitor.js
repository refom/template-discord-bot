
const logger = require('../modules/logger.js');
const wait = require('node:timers/promises').setTimeout;

const obj = {
	enable: true,
	async Start() {
		const checkMemory = async () => {
			const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
			// heapUsed = heapUsed.slice(0, heapUsed.indexOf('.') + 3);
			logger.cmd(`Heap used: ${heapUsed} MB`);
			await wait(1000 * 60 * 2, checkMemory);
		};

		await checkMemory();
	}
};

module.exports = obj;
