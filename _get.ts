import {ddb} from './deps.ts';

const get = async (params) => {
    return ddb.getItem(params);
};

export {get};