import ValveBall from './assets/ValveBall.svg';
import ValveCheck from './assets/ValveCheck.svg';
import ValveHandOperated from './assets/ValveHandOperated.svg';
import ValveMotor from './assets/ValveMotor.svg';
import ValvePneumatic from './assets/ValvePneumatic.svg';
import ValveSolenoid from './assets/ValveSolenoid.svg';
import ValveSpring from './assets/ValveSpring.svg';
import ValveRegulator from './assets/ValveRegulator.svg'
import ValvePressureRegulator from './assets/ValvePressureRegulator.svg';
import ValveNeedle from './assets/ValveNeedle.svg';

export const BallValve = ValveBall;

export const CheckValve = ValveCheck;

export const HandOperatedValve = ValveHandOperated;

export const MotorValve = ValveMotor;

export const PneumaticValve = ValvePneumatic;

export const SolenoidValve = ValveSolenoid;

export const SpringValve = ValveSpring;

export const RegulatorValve = ValveRegulator;

export const PressureRegulatorValve = ValvePressureRegulator;

export const NeedleValve = ValveNeedle;

export const ValveTypeSVGs = {
    BallValve,
    CheckValve,
    HandOperatedValve,
    MotorValve,
    PneumaticValve,
    SolenoidValve,
    SpringValve,
    RegulatorValve,
    PressureRegulatorValve,
    NeedleValve
};

export const ValveTypeStrings = Object.keys(ValveTypeSVGs).map(key => 
    key.replace(/([A-Z])/g, ' $1').trim()
) as Array<keyof typeof ValveTypeSVGs>;

export const ValveTypeKeys = Object.keys(ValveTypeSVGs) as Array<keyof typeof ValveTypeSVGs>;