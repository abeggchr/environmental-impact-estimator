import {UseCloud} from "./UseCloud";
import {DoubleUtilization} from "./DoubleUtilization";
import {ExtendHardwareLifespanBy1Year} from "./ExtendHardwareLifespanBy1Year";
import {NoDistributedDevelopment} from "./NoDistributedDevelopment";
import {NoZombieServers} from "./NoZombieServers";
import {OnlyHomeOffice} from "./OnlyHomeOffice";
import {ReduceIndividualTrafficBy25Percent} from "./ReduceIndividualTrafficBy25Percent";
import {ReduceInternetTrafficBy25Percent} from "./ReduceInternetTrafficBy25Percent";
import {ScaleToZero} from "./ScaleToZero";
import {UseGreenEnergy} from "./UseGreenEnergy";
import {UseContinuousIntegrationAsService} from "./UseContinuousIntegrationAsService";
import {NoHotStandby} from "./NoHotStandby";

export const allDecorators = [NoHotStandby, UseContinuousIntegrationAsService, UseCloud, DoubleUtilization, ExtendHardwareLifespanBy1Year, NoDistributedDevelopment, NoZombieServers, OnlyHomeOffice, ReduceIndividualTrafficBy25Percent, ReduceInternetTrafficBy25Percent, ScaleToZero, UseGreenEnergy];