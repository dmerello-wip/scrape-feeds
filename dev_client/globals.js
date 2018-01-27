
const events = {
    contentUpdate: {
        label : 'contentUpdate',
        event : new CustomEvent('contentUpdate')
    }
};


const baseUrl = 'api/suggestion';
const api = {
        create  : '/test',
        update  : baseUrl + '/update',
        delete  : baseUrl + '/delete',
        get     : baseUrl + '/get'
    };




export {events, api};
