import {ddb} from './deps.ts';

const get = async (params: GetItemParam) => {
    return ddb.getItem(params);
};

export {get};