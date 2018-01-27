
const events = {
    contentUpdate: {
        label : 'contentUpdate',
        event : new CustomEvent('contentUpdate')
    }
};


const baseUrl = 'api/suggestion';
const api = {
        create  : baseUrl + '/create',
        update  : baseUrl + '/update',
        delete  : baseUrl + '/delete',
        get     : baseUrl + '/get'
    };




export {events, api};
