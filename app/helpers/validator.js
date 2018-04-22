const request = require('request');
const appConfig = require('../config.js');

class Validator {

    constructor(postObj, modelStructure){

        this.data = postObj;
        this.structure = modelStructure;
        this.response = {
            success : false,
            messages : []
        };

        return this.validate();
    }

    /*
    validate(){
        console.dir(this.data);
        console.dir(this.structure);
        for (let key of this.structure) {
            // cycle the model structure
            // check for each type the post object key

            let typeToCheck = key['type'];
            let keyToCheck = key['name'];

            console.log('> checking type: '+ typeToCheck);
            console.log('  checking value key: '+ keyToCheck);
            console.log('  checking value: '+ this.data[keyToCheck]);

            switch(typeToCheck) {
                case 'int':
                    this.response.messages.push({
                        [keyToCheck] : this.checkInt(this.data[keyToCheck])
                    });
                    break;
                case 'shortText':
                    this.response.messages.push({
                        [keyToCheck] : this.checkString(this.data[keyToCheck])
                    });
                    break;
                case 'longText':
                    this.response.messages.push({
                        [keyToCheck] : this.checkString(this.data[keyToCheck])
                    });
                    break;
                case 'image':
                    // TODO: questa promise non arriva al return
                    this.checkImage(this.data[keyToCheck])
                        .then(function (result) {
                            console.log(result);
                            this.response.messages.push({
                                [keyToCheck] : result
                            });
                        }.bind(this));
                    break;
                default:
                    console.log('no validation provide for: ' + typeToCheck);
            }
        }

        return this.response;
    }
    */

    checkInt(value){
        return Number.isInteger(value);
    }

    checkString(value){
        return (typeof value === 'string');
    }

    checkImage(value){
        return new Promise((resolve, reject) => {
            let url = appConfig.paths.baseUrl+'/'+appConfig.paths.uploads+'/'+value;
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
                if(!err && response.statusCode === 200){
                    let magigNumberInBody = body.toString('hex',0,4);
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