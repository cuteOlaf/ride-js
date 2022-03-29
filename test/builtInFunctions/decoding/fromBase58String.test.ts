import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";

const compiler = require('../../../src');

describe('fromBase58String',  () => {

    const defaultFromBase58String = `fromBase58String(callerTestData)`;
    const invalidFromBase58String = `fromBase58String()`;

    const precondition = new GenerateContractForBuiltInFunctions
    (defaultFromBase58String, null, 'ByteVector');

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomStringArray()],
        [data.STDLIB_VERSION_4, random.getRandomStringArray()],
        [data.STDLIB_VERSION_5, random.getRandomStringArray()],
    ])('positive: fromBase58String func compiles', (version, testString) => {
        const contract = precondition.generateOnlyMatcherContract(version, testString);
        const compiled = compiler.compile(contract);
        expect(compiled.error).toBeUndefined();
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomAddress()],
        [data.STDLIB_VERSION_4, random.getRandomAlias()],
        [data.STDLIB_VERSION_5, 1],
    ])('negative: invalid byteVector in fromBase58String', (version, invalidData) => {
        const contract = precondition.generateOnlyMatcherContract(version, invalidData);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Non-matching types: expected: String`);
    });

    test.each([
        [data.STDLIB_VERSION_3, random.getRandomStringArray()],
        [data.STDLIB_VERSION_4, random.getRandomStringArray()],
        [data.STDLIB_VERSION_5, random.getRandomStringArray()],
    ])('negative: invalid function for v%i', (version, testString) => {
        const contract = precondition.generateOnlyMatcherContract
        (version, testString, invalidFromBase58String);
        const compiled = compiler.compile(contract);
        expect(compiled.error)
            .toContain(`Function 'fromBase58String' requires 1 arguments, but 0 are provided`);
    });
});
