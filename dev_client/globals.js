const baseUrlAdmin = 'admin/api';
const baseUrl = 'api';
const api = {
        suggestion : {
            create  : baseUrlAdmin + '/suggestion/create',
            update  : baseUrlAdmin + '/suggestion/update',
            delete  : baseUrlAdmin + '/suggestion/delete',
            get     : baseUrl + '/suggestion/get',
            scrape  : baseUrlAdmin + '/suggestion/scrape',
        },
        tag : {
            get     : baseUrl + '/tag/get'
        }
    };

export {api};
