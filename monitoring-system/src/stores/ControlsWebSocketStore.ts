import { makeAutoObservable } from "mobx";



export class WebsocketStore {
  ws: WebSocket | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  connect() {
    this.ws = new WebSocket("ws://localhost:8080/ws");
    this.ws.onopen = () => {
      console.log("Connected");
    };
    this.ws.onmessage = (event) => {
      console.log(event.data);
    };
  }

  disconnect() {
    this.ws?.close();
  }
}