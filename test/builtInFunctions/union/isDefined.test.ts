import * as data from "../../testData/data";
import * as random from "../../testData/random";

import {GenerateContractForBuiltInFunctions} from "../GenerateContractForBuiltInFunctions";
import {checkCompileResult} from "../testResult";

describe('isDefined functions',  () => {

    const isDefined = `isDefined(callerTestData)`;
    const invalidIsDefined = `isDefined()`;

    const precondition = new GenerateContractForBuiltInFunctions(isDefined);
    precondition.setData("Boolean");

    test.each([
        // isDefined
        [data.STDLIB_VERSION_3, isDefined, random.getRandomString(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_4, isDefined, random.getRandomInt(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_5, isDefined, random.getRandomByteVector(), data.POSITIVE_TEST],
        [data.STDLIB_VERSION_6, isDefined, random.getRandomAddress(), data.POSITIVE_TEST],
        // invalid function isDefined
        [data.STDLIB_VERSION_3, invalidIsDefined, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_4, invalidIsDefined, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_5, invalidIsDefined, random.getRandomString(), data.NEGATIVE_TEST],
        [data.STDLIB_VERSION_6, invalidIsDefined, random.getRandomString(), data.NEGATIVE_TEST],
    ])('check ride v%i function %s compiles or failed',
    (version, testFunction, randomData, testType) => {
        const contract = precondition.generateOnlyMatcherContract(version, randomData, testFunction);
        checkCompileResult(contract, testType);
    });
});
