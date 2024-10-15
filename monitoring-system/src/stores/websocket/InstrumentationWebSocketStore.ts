import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import LocalStorageCache from "../../lib/cashe";


const WSS_PORT = 8888
const WSS_URL = `ws://192.168.0.1:${WSS_PORT}`

interface IInstrumentationStore {
    logCache: LocalStorageCache<string[]>;
    isConnected: boolean;
    connect(): void;
    disconnect(): void;
    clearLog(): void;
}

class InstrumentationWebSocketStore implements IInstrumentationStore {
    logCache: LocalStorageCache<string[]> = new LocalStorageCache<string[]>('ControlsLogCache');
    isConnected: boolean;
    private ws: any;
    data = 0;

    constructor() {
        this.isConnected = false
        makeAutoObservable(this)
    }

    connect() {
        this.ws = new WebSocket(WSS_URL) 

        this.ws.addEventListener('message', this.onMessage)
        this.ws.addEventListener('close', this.onClose)
        this.ws.addEventListener('open', this.onOpen)

        this.onOpen()
    }

    disconnect() {
        this.ws.close()
        this.isConnected = false

    }

    private onOpen() {
        this.isConnected = true
    }

    private onClose() {
        this.isConnected = false
    }

    private onMessage(event: any) {
        // const data = JSON.parse(event.data)
        // this.data = data['data']['T_RUN_TANK']
        console.log(this.data)
        // this.data = event.data['data']['T_RUN_TANK']
        
    }

    clearLog(): void {
        
    }
}

const instrumentationWSStore = new InstrumentationWebSocketStore()

export default instrumentationWSStore