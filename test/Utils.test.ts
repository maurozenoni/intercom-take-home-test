import { expect } from "chai";
import { JSONObjectsReader, writeToFile } from "../src/Utils"
import mock = require("mock-fs");
require("chai").use(require('chai-fs'));

describe('Utils', () => {
    describe('JSONObjectsReader', () => {
        describe('#forEach()', () => {

            it('does not fail on an empty file', (done) => {

                mock({
                    'objects.txt': ``
                });

                interface SimpleObject {
                    name: string,
                    id: number
                }
                const simpleObjects = new JSONObjectsReader<SimpleObject>("objects.txt");
                const collectedObjects: SimpleObject[] = [];

                simpleObjects.forEach((obj) => collectedObjects.push(obj))
                    .then(() => {
                        expect(collectedObjects).to.eql([]);
                    })
                    .then(done, (err) => done(err))
                    .then(mock.restore);
            });

            it('if the file contains a single object, it calls the callback function on that object', (done) => {

                mock({
                    'objects.txt': `{"name": "object1", "id": 1}`
                });

                interface SimpleObject {
                    name: string,
                    id: number
                }
                const simpleObjects = new JSONObjectsReader<SimpleObject>("objects.txt");
                const collectedObjects: SimpleObject[] = [];

                simpleObjects.forEach((obj) => collectedObjects.push(obj))
                    .then(() => {
                        expect(collectedObjects).to.eql([{ name: "object1", id: 1 }]);
                    })
                    .then(done, (err) => done(err))
                    .then(mock.restore);
            });

            it('if the file contains multiple objects, it calls the callback function on each object', (done) => {

                mock({
                    'objects.txt': `{"name": "object1", "id": 1}
                {"name": "object2", "id": 2}`
                });

                interface SimpleObject {
                    name: string,
                    id: number
                }
                const simpleObjects = new JSONObjectsReader<SimpleObject>("objects.txt");
                const collectedObjects: SimpleObject[] = [];

                simpleObjects.forEach((obj) => collectedObjects.push(obj))
                    .then(() => {
                        expect(collectedObjects).to.eql([{ name: "object1", id: 1 }, { name: "object2", id: 2 }]);
                    })
                    .then(done, (err) => done(err))
                    .then(mock.restore);
            });
        });
    });

    describe('#writeToFile()', () => {

        it('can create a new empty file', (done) => {

            mock({});

            writeToFile("output.txt", "")
                .then(() => {
                    expect("./output.txt").to.be.a.file().and.empty;
                })
                .then(done, (err) => done(err))
                .then(mock.restore);
        });

        it('can write single-line content to a new file', (done) => {

            mock({});

            writeToFile("output.txt", "new content")
                .then(() => {
                    expect("./output.txt").to.be.a.file().with.content(`new content`);
                })
                .then(done, (err) => done(err))
                .then(mock.restore);
        });

        it('can write multi-line content to a new file', (done) => {

            mock({});

            writeToFile("output.txt", "new\ncontent")
                .then(() => {
                    expect("./output.txt").to.be.a.file().with.content("new\ncontent");
                })
                .then(done, (err) => done(err))
                .then(mock.restore);
        });

        it('can overwrite an existing file with new content', (done) => {

            mock({
                'output.txt': 'old content'
            });

            expect("./output.txt").to.be.a.file().with.content("old content");
            writeToFile("output.txt", "new content")
                .then(() => {
                    expect("./output.txt").to.be.a.file().with.content("new content");
                })
                .then(done, (err) => done(err))
                .then(mock.restore);
        });

    });
});