import { makeAutoObservable } from "mobx";
import LocalStorageCache from "../../lib/cashe";
import { DEFAULT_CONTROLS_CONFIG, CONTROL_VALVES_SAFE_STATES } from "../../lib/configs/configs";
import { IControlsPacket } from "../../lib/monitoring-system-types";

const VALVE_NAME_KEYS = DEFAULT_CONTROLS_CONFIG
const VALVE_DEFAULT_STATES = CONTROL_VALVES_SAFE_STATES

const WSS_PORT = 8080
const WSS_URL = `ws://192.168.0.1:${WSS_PORT}`

interface IControlsStore {
  valveStates: Map<string, string>;
  logCache: LocalStorageCache<string[]>;
  isConnected: boolean;
  incomingPacket: IControlsPacket | object;
  connect(): void;
  sendCommand(payload: IControlsPacket): void;
  clearLog(): void;
}

export class ControlsWebSocketStore implements IControlsStore {
  private ws: any;
  valveStates = new Map<string, string>(
    VALVE_NAME_KEYS.map((key, index) => {
      return [key, VALVE_DEFAULT_STATES[index].state];
    })
  );
  logCache: LocalStorageCache<string[]> = new LocalStorageCache<string[]>('ControlsLogCache');
  isConnected: boolean;
  incomingPacket: object;
  
  constructor() {
    makeAutoObservable(this);
    this.isConnected = false;
    this.incomingPacket = {} as IControlsPacket; 
  }

  disconnect() {
    console.log('close')
    this.ws.close()
    this.isConnected = false
  }

  connect() {
    // connect to the websocket
    this.ws = new WebSocket(WSS_URL)

    this.ws.addEventListener('message', this.onMessage)
    this.ws.addEventListener('close', this.onClose)
    this.ws.addEventListener('open', this.onOpen)
  
    this.onOpen()
  }

  private onClose() {
    this.ws.close()
    this.isConnected = false;
  }

  private onOpen() {
    this.isConnected = true;
  }

  private onMessage(message: string) {
    const data = JSON.parse(message.data);
    const identifier = data.identifier;
    this.incomingPacket = data.data
    console.log(`Identifier: ${identifier}`)
    console.log(this.incomingPacket)
    switch (identifier) {
      case 'STARTUP':
        // handle startup message
        // console.log(`start up: ${data}`)
        break;
      case 'FEEDBACK':
        const valve = data.data['valve']
        const action = data.data['action']
        console.log(`valve: ${valve}, action: ${action}`)
        // this.valveStates.set(valve, action)
        // console.log(this.valveStates.get(valve))
        break;
    }
  }

  sendCommand(payload: IControlsPacket) {
    // send command to the websocket
    this.ws.send(JSON.stringify(payload))
  }

  private log() {
    // log a command
  }

  clearLog() {
    // clear the log
  }
}

const controlsWSStore = new ControlsWebSocketStore()

export default controlsWSStore