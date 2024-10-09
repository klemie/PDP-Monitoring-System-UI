export enum InstrumentationType {
    TEMPERATURE = 'Temperature',
    PRESSURE = 'Pressure',
    LOAD = 'Load',
    MASS = 'Mass'
}

export type InstrumentationReadingType = {
    label: string;
    color: string;
    threshold: number; //Threshold to show yellow
    max: number; //Threshold to show red
    unit: "N" | "Pa" | "KG" | "°C" | "K"
}

export type Packet = {
    PacketNumber: number;
    readings: number;
}

const TEMPERATURE_SENSOR_CONFIG: InstrumentationReadingType = {
    label: "T",
    color: "#D65B4F",
    threshold: 273, 
    max: 373,
    unit: "K"
}

const PRESSURE_SENSOR_CONFIG: InstrumentationReadingType = {
    label: "P",
    color: "#5DA5DA",
    threshold: 101325,
    max: 101325,
    unit: "Pa"
}

const LOAD_SENSOR_CONFIG: InstrumentationReadingType = {
    label: "L",
    color: "#FAA43A",
    threshold: 5000,
    max: 10000,
    unit: "N"
}

const MASS_SENSOR_CONFIG: InstrumentationReadingType = {
    label: "M",
    color: "#60BD68",
    threshold: 0,
    max: 10,
    unit: "KG"
}

export const instrumentationModuleConfigMap = {
    [InstrumentationType.TEMPERATURE]: TEMPERATURE_SENSOR_CONFIG,
    [InstrumentationType.PRESSURE]: PRESSURE_SENSOR_CONFIG,
    [InstrumentationType.LOAD]: LOAD_SENSOR_CONFIG,
    [InstrumentationType.MASS]: MASS_SENSOR_CONFIG
}