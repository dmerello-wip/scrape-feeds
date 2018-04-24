const request = require('request');
const appConfig = require('../config.js');

class Validator {

    constructor(postObj, modelStructure, formMandatories) {

        this.data = postObj;
        this.structure = modelStructure;
        this.mandatories = formMandatories;
        this.response = {
            success: false,
            messages: []
        };
        this.checks = [];

        /*
        console.dir(this.data);
        console.dir(this.structure);
        console.dir(this.mandatories);
        */
        this.validate();

        return new Promise((resolve, reject) => {

            Promise.all(this.checks).then(checksResults => {
                reject(checksResults);
            });

        });
    }


    validate() {
        for (let field of this.structure) {
            // cycle the model structure
            // check for each type the post object field
            let fieldName = field['name'];
            let typeToCheck = field['type'];
            let fieldValue = this.data[fieldName];
            let mandatory = this.mandatories.includes(fieldName);
            if (mandatory) {
                if (!this.data[fieldName]) {
                    // mandatory, not evalued
                    this.checks.push(Promise.resolve({
                        name : fieldName,
                        status: false,
                        message: 'mandatory not respected'
                    }));
                } else {
                    // mandatory, evalued, check type
                    let check = this.checkType(typeToCheck, fieldValue, fieldName);
                    this.checks.push( check );
                }
            } else {
                if (this.datafieldName) {
                    // not mandatory, check type
                    let check = this.checkType(typeToCheck, fieldValue, fieldName);
                    this.checks.push( check );
                } else {
                    // not mandatory, not evalued
                    this.checks.push( Promise.resolve({
                        name : fieldName,
                        status: true
                    }) );
                }
            }
        }

    }



    checkType(type, value, name){
        switch (type) {
            case 'int':
                if (this.checkInt(value)) {
                    return Promise.resolve({
                        name : name,
                        status: true
                    });
                } else {
                    return Promise.resolve({
                        name : name,
                        status: false ,
                        message: 'not an integer'
                    });
                }
                break;
            case 'shortText':
                if (this.checkString(value)) {
                    return Promise.resolve({
                        name : name,
                        status: true
                    });
                } else {
                    return Promise.resolve({
                        name : name,
                        status: false ,
                        message: 'not a string'
                    });
                }
                break;
            case 'longText':
                if (this.checkString(value)) {
                    return Promise.resolve({
                        name : name,
                        status: true
                    });
                } else {
                    return Promise.resolve({
                        name : name,
                        status: false ,
                        message: 'not a string'
                    });
                }
                break;
            case 'image':
                return this.checkImage(name,value);
                break;
            default:
                console.log('no validation provide for: ' + type);
        }
    }

    checkInt(value) {
        return Number.isInteger(value);
    }

    checkString(value) {
        return (typeof value === 'string');
    }

    checkImage(name,value) {
        return new Promise((resolve, reject) => {
            let url = appConfig.paths.baseUrl + '/' + appConfig.paths.uploads + '/' + value;
            // initial string of images
            let magic = [
                'ffd8ffe0', /* jpg */
                'ffd8ffe1', /* jpg */
                'ffd8ffe2', /* jpg */
                'ffd8ffe3', /* jpg */
                '89504E470D0A1A0A', /* png */
                '47494638'
            ];
            request({
                method: 'GET',
                url: url,
                encoding: null // keeps the body as buffer
            }, function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    let magicNumberInBody = body.toString('hex', 0, 4);
                    if (magic.includes(magicNumberInBody)) {
                        resolve({
                            name : name,
                            status: true
                        });
                    } else {
                        resolve({
                            name : name,
                            status: false ,
                            message: 'not an image'
                        });
                    }
                } else {
                    resolve({
                        name : name,
                        status: false ,
                        message: 'not an existing image'
                    });
                }
            });
        });
    }
}

module.exports = Validator;