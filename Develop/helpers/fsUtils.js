const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
/**
 * @param {string} 
 * @param {object}
 * @returns {void}
 */
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info('\nData written to ${destination}'));

/**
 * @param {object}
 * @param {string}
 * @returns {void}
 */

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parseData = JSON.parse(data);
            parseData.push(content);
            writeToFile(file, parseData);
    }
});
};

module.exports = { readFromFile, writeToFile, readAndAppend };