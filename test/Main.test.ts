import { expect } from "chai";
import { main } from "../src/Main";
import mock = require("mock-fs");
require("chai").use(require('chai-fs'));

describe('The main program', () => {

  it('works as expected with an empty customer file', (done) => {

    mock({
      'resources/customers.txt': ''
    });

    main()
      .then(() => {
        expect("./output.txt").to.be.a.file().and.empty;
      })
      .then(done, (err) => done(err))
      .then(mock.restore);
  });

  it('works as expected with one customer within 100km of the Dublin office', (done) => {

    mock({
      'resources/customers.txt': '{"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}'
    });

    main()
      .then(() => {
        expect("./output.txt").to.be.a.file().with.content("Christina McArdle: 12");
      })
      .then(done, (err) => done(err))
      .then(mock.restore);
  });

  it('works as expected with one customer farther than 100km from the Dublin office', (done) => {

    mock({
      'resources/customers.txt': '{"latitude": "52.3191841", "user_id": 3, "name": "Jack Enright", "longitude": "-8.5072391"}'
    });

    main()
      .then(() => {
        expect("./output.txt").to.be.a.file().and.empty;
      })
      .then(done, (err) => done(err))
      .then(mock.restore);
  });

  it('works as expected with one customer within 100km and one farther than 100km from the Dublin office', (done) => {

    mock({
      'resources/customers.txt': `{"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}
        {"latitude": "52.3191841", "user_id": 3, "name": "Jack Enright", "longitude": "-8.5072391"}`
    });

    main()
      .then(() => {
        expect("./output.txt").to.be.a.file().with.content("Christina McArdle: 12");
      })
      .then(done, (err) => done(err))
      .then(mock.restore);
  });

  it('works as expected with two customers located 99km from the Dublin office and two located 101km from the Dublin office', (done) => {

    mock({
      'resources/customers.txt': `{"latitude": " 52.665685", "user_id": 12, "name": "Customer1 99km", "longitude": "-7.224293"}
        {"latitude": "52.448330", "user_id": 3, "name": "Customer2 99km", "longitude": "-6.353161"}
        {"latitude": "52.655924", "user_id": 1, "name": "Customer1 101km", "longitude": "-7.242526"}
        {"latitude": "54.225281", "user_id": 44, "name": "Customer2 101km", "longitude": "-5.893805"}`
    });

    main()
      .then(() => {
        expect("./output.txt").to.be.a.file().with.content("Customer2 99km: 3\nCustomer1 99km: 12");
      })
      .then(done, (err) => done(err))
      .then(mock.restore);
  });
});
