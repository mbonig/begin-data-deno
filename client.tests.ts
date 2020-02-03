import {runTests, test} from "https://deno.land/std/testing/mod.ts";
import {assertEquals} from "https://deno.land/std/testing/asserts.ts";
import {ddb} from './deps.ts';
import * as data from './mod.ts';

test({
    name: "get calls underlying get",
    async fn(): Promise<void> {
        let mockParams;
        ddb.getItem = async (params) => mockParams = params;
        let params = {tableName: 'hello'};
        await data.get(params)
        assertEquals(mockParams, params)
    }
});

runTests();