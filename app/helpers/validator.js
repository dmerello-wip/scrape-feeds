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
        console.log('dati: ');
        console.dir(this.data);
        console.log('struttura: ');
        console.dir(this.structure);
        console.log('obbligatori: ');
        console.dir(this.mandatories);
        */
        this.validate();

        return new Promise((resolve, reject) => {

            Promise.all(this.checks).then(values => {
                this.response.messages = values;
                reject(this.response.messages);
            }).catch(error =>{
                reject('devo finirlo');
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
                    this.checks.push( Promise.resolve({[fieldName] : 'mandatory not respected'}) );
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
                    this.checks.push( Promise.resolve({[fieldName] : `check not necessary`}) );
                }
            }
        }

    }

    checkType(type, value, name){
        switch (type) {
            case 'int':
                return Promise.resolve({[name] : `check is ${this.checkInt(value)}`});
                break;
            case 'shortText':
                return Promise.resolve({[name] : `check is ${this.checkString(value)}`});
                break;
            case 'longText':
                return Promise.resolve({[name] : `check is ${this.checkString(value)}`});
                break;
            case 'image':
                // TODO: questa promise non arriva al return
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
                        resolve({[name] : `image check is: ${true}`});
                    } else {
                        resolve({[name] : `image check is: ${false} and ${magicNumberInBody}`});
                    }
                } else {
                    resolve({[name] : `image check is: ${false}`});
                }
            });
        });
    }
}

module.exports = Validator;