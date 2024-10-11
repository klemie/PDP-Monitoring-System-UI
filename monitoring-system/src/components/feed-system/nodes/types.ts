import { Node, Edge, Position }  from 'reactflow';
import { ControlsValveTypes } from '../../../lib/monitoring-system-types';

/*------------ P&ID Types -------------*/

export enum PAndIDNodeTypes {
    VALVE = "Valve",
    INSTRUMENTATION = "Instrumentation",
    TANK = "Tank"
}

export enum PAndIDInstrumentationTypes {
    TEMP_CONTROLLER = "TC",
    PRESSURE_CONTROLLER = "PC",
    LEVEL_CONTROLLER = "LC",
    TEMP_TRANSMITTER = "TT",
    PRESSURE_TRANSMITTER = "PT",
    LEVEL_TRANSMITTER = "LT",
    TEMP_INDICATOR = "TI",
    PRESSURE_INDICATOR = "PI",
    LEVEL_INDICATOR = "LI"
}

export declare type TankTypes = "GasBottleTank" 
    | "VerticalVesselTank" 
    | "TankTank" 
    | "";

export declare type ValveTypes = "BallValve" 
    | "CheckValve" 
    | "HandOperatedValve" 
    | "MotorValve" 
    | "PneumaticValve" 
    | "SolenoidValve" 
    | "SpringValve" 
    | "RegulatorValve" 
    | "PressureRegulatorValve" 
    | "NeedleValve" 
    | "";

export declare type InstrumentationTypes = PAndIDInstrumentationTypes | "";


export interface PAndIDNodeType extends Node {
    data: {
        label: ControlsValveTypes | string;
        nodeType?: PAndIDNodeTypes;
        controllable?: boolean;
        tankType?: TankTypes;
        instrumentationType?: InstrumentationTypes;
        valveType?: ValveTypes
    };
}

export interface IFeedSystem {
    nodes: PAndIDNodeType[];
    edges: Edge[];
}

export const NodeDefaults = {
	sourcePosition: Position.Right,
	targetPosition: Position.Left,
	style: {
		background: 'None',
		color: '#333',
		border: 'None',
		width: 'fit-content',
		height: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
};