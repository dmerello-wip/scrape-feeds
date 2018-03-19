const baseUrl = 'api';
const api = {
        suggestion : {
            create  : baseUrl + '/suggestion/create',
            update  : baseUrl + '/suggestion/update',
            delete  : baseUrl + '/suggestion/delete',
            get     : baseUrl + '/suggestion/get'
        },
        tag : {
            create  : baseUrl + '/tag/create',
            update  : baseUrl + '/tag/update',
            delete  : baseUrl + '/tag/delete',
            get     : baseUrl + '/tag/get'
        }
    };

export {api};
