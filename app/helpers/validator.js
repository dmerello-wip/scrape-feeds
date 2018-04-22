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

       /* console.dir(this.data);
        console.dir(this.structure);
        console.dir(this.mandatories);*/

        return new Promise((resolve, reject) => {
            this.validate();
            reject('to be implemented');
        });
    }


    validate() {
        for (let key of this.structure) {
            // cycle the model structure
            // check for each type the post object key
            let fieldName = key['name'];
            let typeToCheck = key['type'];
            let fieldValue = this.data[fieldName];
            let mandatory = this.mandatories.includes(fieldName);
            if (mandatory) {
                if (!this.data[fieldName]) {
                    console.log(`> ${fieldName} is mandatory`);
                    this.response.messages.push(`${fieldName} is mandatory`);
                } else {
                    this.checkType(typeToCheck, fieldValue, fieldName).then(()=>{
                        console.dir(this.response.messages);
                    });
                }
            } else {
                if (this.data[fieldName]) {
                    this.checkType(typeToCheck, fieldValue, fieldName).then(() => {
                        console.dir(this.response.messages);
                    });
                }
            }
        }
    }

    checkType(type, value, name){
        return new Promise((resolve, reject) => {
            console.log('> checking type: ' + type);
            console.log('  checking field: ' + name);
            console.log('  checking value: ' + value);
            switch (type) {
                case 'int':
                    this.response.messages.push({
                        [name]: this.checkInt(value)
                    });
                    resolve();
                    break;
                case 'shortText':
                    this.response.messages.push({
                        [name]: this.checkString(value)
                    });
                    resolve();
                    break;
                case 'longText':
                    this.response.messages.push({
                        [name]: this.checkString(value)
                    });
                    resolve();
                    break;
                case 'image':
                    // TODO: questa promise non arriva al return
                    this.checkImage(value)
                        .then(function (result) {
                            console.log('check su immagine fatto: ');
                            console.log(result);
                            this.response.messages.push({
                                [name]: result
                            });
                            resolve();
                        }.bind(this));
                    break;
                default:
                    console.log('no validation provide for: ' + type);
            }
        });
    }

    checkInt(value) {
        return Number.isInteger(value);
    }

    checkString(value) {
        return (typeof value === 'string');
    }

    checkImage(value) {
        return new Promise((resolve, reject) => {
            let url = appConfig.paths.baseUrl + '/' + appConfig.paths.uploads + '/' + value;
            // initial string of images
            let magic = {
                jpg: 'ffd8ffe0',
                png: '89504e47',
                gif: '47494638'
            };
            request({
                method: 'GET',
                url: url,
                encoding: null // keeps the body as buffer
            }, function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    let magigNumberInBody = body.toString('hex', 0, 4);
                    if (magigNumberInBody === magic.jpg ||
                        magigNumberInBody === magic.png ||
                        magigNumberInBody === magic.gif) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            });
        });
    }
}

module.exports = Validator;