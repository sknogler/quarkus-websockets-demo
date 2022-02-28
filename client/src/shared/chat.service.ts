import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {BASE_URL, SocketClosed, WebSocket} from "./util";

const ENDPOINT_URL = `ws://${BASE_URL}/chat`;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: WebSocket<string> | null;

  constructor() {
    this.socket = null;
  }

  public sendMessage(message: string): void {
    if (this.socket === null || this.socket.closed){
      throw new SocketClosed();
    }
    this.socket.sendMessage(message);
  }

  public connect(user: string): Observable<string> {
    if (this.socket === null) {
      this.socket = new WebSocket<string>(`${ENDPOINT_URL}/${user}`);
      this.socket.errorMessages.subscribe(eMsg => console.log(`WebSocket error: ${eMsg}`));
      this.socket.connect();
    }
    return this.socket.messages;
  }

  public close(): void {
    this.socket?.close();
  }

}
