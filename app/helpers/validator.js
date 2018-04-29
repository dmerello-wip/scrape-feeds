const request = require('request');
const appConfig = require('../config.js');

class Validator {

    constructor(postObj, modelStructure, formMandatories) {

        this.data = postObj;
        this.structure = modelStructure;
        this.mandatories = formMandatories;
        this.response = {
            success: false,
            errors: []
        };
        this.checks = [];

        /*
        console.dir(this.data);
        console.dir(this.structure);
        console.dir(this.mandatories);
        */
        this.validate();

        return new Promise((resolve, reject) => {

            Promise.all(this.checks).then(allPromisesResults => {
                // reject(allPromisesResults);
                let trueCounter = 0;
                for (let msg of allPromisesResults){
                    if(!msg['status']){
                        this.response.errors.push(msg);
                    } else {
                        trueCounter += 1;
                    }
                }
                if (trueCounter === allPromisesResults.length) {
                    resolve();
                } else {
                    reject(this.response.errors);
                }
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

            //console.log('checking field:  ' + fieldName + ' with value: ' + fieldValue + ' it should be a ' + typeToCheck);

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
                if (this.data[fieldName]) {
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
            case 'url':
                if (this.checkUrl(value)) {
                    return Promise.resolve({
                        name : name,
                        status: true
                    });
                } else {
                    console.log('checkUrl retunrs false');
                    return Promise.resolve({
                        name : name,
                        status: false ,
                        message: 'not a valid url'
                    });
                }
                break;
            default:
                console.log('no validation provide for: ' + type);
        }
    }

    checkInt(value) {
        return !isNaN(value)
    }

    checkUrl(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?'+ // port
            '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
            '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
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
                '89504e47', /* png */
                '47494638' /* png */
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
                            message: 'not a valid image format'
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