
const fs = require('node:fs');
const path = require('path');

class UtilityRepom {
	constructor() {}

	// Random integer with min (included) and max (excluded)
	static getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	// get all js files in directory
	static getAllFiles(dirPath, arrayOfFiles) {
		const files = fs.readdirSync(dirPath);

		arrayOfFiles = arrayOfFiles || [];

		files.forEach((file) => {
			if (fs.statSync(dirPath + "/" + file).isDirectory()) {
				arrayOfFiles = this.getAllFiles(dirPath + "/" + file, arrayOfFiles);
			} else if (file.endsWith('.js')) {
				arrayOfFiles.push(path.join(dirPath, file));
			}
		});

		return arrayOfFiles;
	}
}

module.exports = UtilityRepom;