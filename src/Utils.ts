import fs from "fs";
import readline from "readline";


/**
 * This class reads objects of generic type `T` from a specified file and applies functions to each object.
 * @typeparam T - Generic type prameter for the objects to be read.
 */
export class JSONObjectsReader<T> {

    /**
     * @param fileName - A path to a file. This file should contain a list of objects in JSON notation, one object per line with no separators.
     */
    constructor(private fileName: string) { }

    /**
     * Performs the specified action for each object in the file and optionally calls a closing function once the entire file is processed.
     * @param callbackfn - A function that accepts an object as an argument. forEach calls the callbackfn function one time for each object in the file.
     * @param onClose - A function to be called after every object in the file has been processed. forEach calls the onClose function only once and without parameters.
     */
    forEach(callbackfn: (object: T) => void, onClose: Function = () => { }) {
        const readInterface = readline.createInterface({
            input: fs.createReadStream(`./resources/${this.fileName}`),
            output: process.stdout,
            terminal: false
        });

        readInterface.on('line', function (line) {
            const object: T = JSON.parse(line);
            callbackfn(object);
        });

        readInterface.on('close', () => onClose());
    }
}

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 * @param fileName - A path to a file.
 * @param fileContent - The data to write.
 */
export function writeToFile(fileName: string, fileContent: string) {
    fs.writeFile(fileName, fileContent, (err) => {
        if (err) throw err;
    });
}
