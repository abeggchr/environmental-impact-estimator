import {describe, expect, test} from 'vitest'
import {testTeam} from "../common/testing/testTeam";
import {testMachine} from "../common/testing/testMachine";
import {testUsage} from "../common/testing/testUsage";
import {NoZombieServers} from "./NoZombieServers";

describe('NoZombieServers', () => {
    test('decorates zombieServers_percentage', () => {
        const sut = new NoZombieServers({
            teams: [testTeam],
            machines: [{...testMachine, zombieServers_percentage: 0.3}],
            usage: testUsage
        });

        const actual = sut.machines[0].zombieServers_percentage;
        expect(actual).toBe(0);
    });
});
