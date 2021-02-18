import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socket from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Post } from '../_models/post';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
    // https://codingblast.com/chat-application-angular-socket-io/

    // variables
    private socket: Socket;

    constructor() {
        this.socket = socket.io(environment.io);
    }

    /**
     * send post information
     * @param post 
     */
    public sendPostInformation(post: Post): void {
        this.socket.emit('post', post);
    }

    /**
     * Get post observable
     */
    public getPost = () => {
        return new Observable(observer => {
            this.socket.on('post', (post: Post) => {
                observer.next(post);
            });
        });
    }
}
