import { makeAutoObservable } from "mobx";
import { CONTROL_VALVES_SAFE_STATES, ControlValveType, DEFAULT_CONTROLS_CONFIG, DEFAULT_INSTRUMENTATION_CONFIG, InstrumentationSensorType } from "../lib/configs/configs";
import { createContext } from "react";

interface ISettingStore {
    instrumentationConfig: InstrumentationSensorType[];
    controlsConfig: ControlValveType[];
    controlsList: string[];
    settingsPanel: 'instrumentation' | 'controls' | 'main' | string;
    currentView: 'DASHBOARD' | 'SETTINGS' | 'REPLAY' | string;
    uiConfiguration: {
        controls: {
            panel: boolean;
            dock: boolean;
        },
        instrumentation: {
            graphs: boolean;
        }
    }
}

class SettingStore implements ISettingStore {

    settingsPanel = 'main';
    controlsList: string[] = DEFAULT_CONTROLS_CONFIG;
    controlsConfig: ControlValveType[] = [];
    instrumentationConfig: InstrumentationSensorType[] = [];
    uiConfiguration = {
        controls: {
            panel: false,
            dock: true
        },
        instrumentation: {
            graphs: true
        }
    }
    currentView = 'DASHBOARD';

    constructor() {
        makeAutoObservable(this);
        this.setDefaultControlsConfig();
        this.setDefaultInstrumentationConfig();
    }

    updateView(view: 'DASHBOARD' | 'SETTINGS' | 'REPLAY') {
        this.currentView = view;
    }

    updateSettingsPanel(panel: 'instrumentation' | 'controls' | 'main') {
        this.settingsPanel = panel;
    }

    pushNewControl(control: string) {
        this.controlsList.push(control);
    }

    updateControlsList(controls: string[]) {
        this.controlsList = controls;
    }

    updateInstrumentationConfig(config: InstrumentationSensorType[] | []) {
        this.instrumentationConfig = config;
    }

    setDefaultInstrumentationConfig() {
        this.instrumentationConfig = DEFAULT_INSTRUMENTATION_CONFIG;
    }

    setDefaultControlsConfig() {
        this.controlsConfig = CONTROL_VALVES_SAFE_STATES;
    }

    private get store() {
        return this;
    }
    
    get getInstrumentationConfig() {
        return this.store.instrumentationConfig;
    }

    get getControlsConfig() {
        return this.store.controlsConfig;
    }
}

export const settingStore = new SettingStore();
export const SettingStoreContext = createContext(settingStore);
