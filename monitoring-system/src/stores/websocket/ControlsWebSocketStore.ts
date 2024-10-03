import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved } from "mobx";
import AutoObservable from "./AutoObserable";
import LocalStorageCache from "../../lib/cashe";
import { DEFAULT_CONTROLS_CONFIG, CONTROL_VALVES_SAFE_STATES } from "../../lib/configs/configs";
import useWebSocket from 'react-use-websocket';
import { WebSocketHook } from "react-use-websocket/dist/lib/types";

const VALVE_NAME_KEYS = DEFAULT_CONTROLS_CONFIG
const VALVE_DEFAULT_STATES = CONTROL_VALVES_SAFE_STATES

const WSS_PORT = 8080
const WSS_URL = `ws://192.168.0.1:${WSS_PORT}`

interface IControlsStore {
  valveStates: Map<string, string>;
  logCache: LocalStorageCache<string[]>;
  isConnected: boolean;
  connect(): void;
  disconnect(): void;
  sendCommand(valve: string, action: string): void;
  clearLog(): void;
}

export class ControlsWebSocketStore implements IControlsStore {
  // auto generate default valve states based on the config.ts
  valveStates: Map<string, string> = new Map<string, string>(
    VALVE_NAME_KEYS.map((key, index) => {
      return [key, VALVE_DEFAULT_STATES[index].state];
    })
  );
  
  logCache: LocalStorageCache<string[]> = new LocalStorageCache<string[]>('ControlsLogCache');
  isConnected: boolean = false;
  connected: boolean = false;
  private ws: WebSocketHook | null = null;
  
  constructor() {
    onBecomeObserved(this, 'isConnected', this.connect);
    onBecomeUnobserved(this, 'isConnected', this.disconnect);
    makeAutoObservable(this);
  }

  connect() {
    // connect to the websocket
    this.ws = useWebSocket(WSS_URL, {
      onOpen: this.onOpen,
      onClose: this.onClose,
      onError: this.onError,
      onMessage: this.onMessage,
      share: true
    })
  }

  disconnect(): void {
    // disconnect from the websocket
    this.ws?.getWebSocket()?.close()
  }

  private onOpen() {
    this.isConnected = true;
  }

  private onClose() {
    this.isConnected = false;
  }

  private onError() {
    this.isConnected = false;
  }

  private onMessage(message: MessageEvent) {
    const data = JSON.parse(message.data);
    const identifier = data.identifier;
    switch (identifier) {
      case 'STARTUP':
        // handle startup message
        break;
      case 'FEEDBACK':
        // handle feedback message
        break;
    }

    // handle incoming messages
  }

  sendCommand(valve: string, action: string) {
    // send command to the websocket

  }

  logCommand(valve: string, action: string) {
    // log the command
  }

  clearLog() {
    // clear the log
  }
}