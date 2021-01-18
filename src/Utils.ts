import fs from "fs";
import util from "util";
import readline from "readline";


/**
 * This class reads objects of generic type `T` from a specified file and applies functions asynchronously to each object.
 * @typeparam T - Generic type parameter for the objects to be read.
 */
export class JSONObjectsReader<T> {

    /**
     * @param fileName - A path to a file. This file should contain a list of objects in JSON notation, one object per line with no separators.
     */
    constructor(private fileName: string) { }

    /**
     * Performs the specified action asynchronously for each object in the file.
     * @param callbackfn - A function that accepts an object as an argument. forEach calls this callback function one time for each object in the file.
     * @returns A promise that resolves once the entire file has been processed.
     */
    forEach(callbackfn: (object: T) => void): Promise<void> {
        const readInterface = readline.createInterface({
            input: fs.createReadStream(this.fileName),
            output: process.stdout,
            terminal: false
        });

        readInterface.on('line', function (line) {
            const object: T = JSON.parse(line);
            callbackfn(object);
        });

        return new Promise((resolved) => readInterface.on('close', resolved));
    }
}

/**
 * Asynchronously writes data to a file, replacing the file if that already exists.
 * @param fileName - A path to a file.
 * @param fileContent - The data to write.
 * @returns A promise that resolves once the task is completed.
 */
export function writeToFile(fileName: string, fileContent: string): Promise<void> {
    return util.promisify(fs.writeFile)(fileName, fileContent);
}
