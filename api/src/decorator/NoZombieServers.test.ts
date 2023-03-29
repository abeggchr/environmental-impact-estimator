import {describe, expect, test} from 'vitest'
import {testTeam} from "../interfaces/testTeam";
import {testMachine} from "../interfaces/testMachine";
import {testUsage} from "../interfaces/testUsage";
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
