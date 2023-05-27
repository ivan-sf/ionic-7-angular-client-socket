import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  answerSocket$: WebSocketSubject<any>;
 
  constructor() {
    this.answerSocket$ = webSocket('ws://localhost:8000/ws/answer');
    this.loadSockets()
  }

  loadSockets(){
    this.answerSocket$.subscribe(
      (response: any) => {
        console.log('Respuesta recibida (answer):', response);
      },
      (error: any) => {
        console.error('Error en la conexión WebSocket (answer):', error);
      }
    );
  }

  
  
  sendRequest(file:string, user:string, query:string, type:string) {
    console.log('esperando respuesta', type)
    const request = {
      file_name: file,
      user_id: user,
      query: query,
      type: type
    };

    this.answerSocket$.next(request);
  }


  sendRequestCsv(file:string,user:string,query:string) {
    console.log('esperando respuesta')
    const request = {
      query: {
        question: query
      },
      user_id: user,
      file_name: file,
      type: 'csv'
    };

    this.answerSocket$.next(request);
  }


}
