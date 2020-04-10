import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from '../../beans/message.bean';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private socket: Socket) { }

  onSocketDisconnect() {
    return new Observable((observer) => {
      this.socket.on('logout-response', (message) => {
        observer.next(message);
      });
    });
  }

  emitSocketEvent(eventName: string, message: any) {
    this.socket.emit(eventName, message);
  }

  getActiveUsers() {
    return new Observable((observer) => {
      this.socket.on('active-user-response', (message) => {
        observer.next(message);
      });
    });
  }
}
