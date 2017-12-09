let mysql = require('mysql');
let async = require('async');

let PRODUCTION_DB = 'app_prod_database';
let TEST_DB = 'app_test_database';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

let state = {
    pool: null,
    mode: null,
};

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        host: 'localhost',
        user: 'your_user',
        password: 'some_secret',
        database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
    });

    state.mode = mode;
    done();
};

exports.get = function() {
    return state.pool;
};

exports.insertData = function(data) {
    // for example send:
    /*
    let data = {
      tables: {
        people: [
         {id: 1, name: "John", age: 32},
         {id: 2, name: "Peter", age: 29},
        ],
        cars: [
          {id: 1, brand: "Jeep", model: "Cherokee", owner_id: 2},
          {id: 2, brand: "BMW", model: "X5", owner_id: 2},
          {id: 3, brand: "Volkswagen", model: "Polo", owner_id: 1},
        ],
      },
    }
     */
    let pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    let names = Object.keys(data.tables);
    async.each(names, function(name, cb) {
        async.each(data.tables[name], function(row, cb) {
            let keys = Object.keys(row)
                , values = keys.map(function(key) { return "'" + row[key] + "'" });

            pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
        }, cb)
    }, done)
};

exports.drop = function(tables, done) {
    let pool = state.pool;
    if (!pool) return done(new Error('Missing database connection.'));

    async.each(tables, function(name, cb) {
        pool.query('DELETE * FROM ' + name, cb)
    }, done)
};