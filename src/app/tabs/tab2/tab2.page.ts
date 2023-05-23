import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
 
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  answerPdfSocket$: WebSocketSubject<any>;
  answerTxtSocket$: WebSocketSubject<any>;
  answerCsvSocket$: WebSocketSubject<any>;
 
  constructor() {
    this.answerPdfSocket$ = webSocket('ws://localhost:8000/ws/answer-pdf');
    this.answerTxtSocket$ = webSocket('ws://localhost:8000/ws/answer-txt');
    this.answerCsvSocket$ = webSocket('ws://localhost:8000/ws/answer-csv');
    this.loadSockets()
  }

  loadSockets(){
    this.answerPdfSocket$.subscribe(
      (response: any) => {
        console.log('Respuesta recibida (answer-pdf):', response);
      },
      (error: any) => {
        console.error('Error en la conexión WebSocket (answer-pdf):', error);
      }
    );

    this.answerTxtSocket$.subscribe(
      (response: any) => {
        console.log('Respuesta recibida (answer-txt):', response);
      },
      (error: any) => {
        console.error('Error en la conexión WebSocket (answer-txt):', error);
      }
    );

    this.answerCsvSocket$.subscribe(
      (response: any) => {
        console.log('Respuesta recibida (answer-csv):', response);
      },
      (error: any) => {
        console.error('Error en la conexión WebSocket (answer-csv):', error);
      }
    );
  }
 
  sendRequestPdf() {
    console.log('esperando respuesta')
    const request = {
      user_id: '345',
      file_name: 'e0113094-b138-4d19-8bb3-bee42745424e.pdf',
      query: 'De que trata el documento?'
    };

    this.answerPdfSocket$.next(request);
  }

  sendRequestTxt() {
    console.log('esperando respuesta')
    const request = {
      user_id: '345',
      file_name: '24cd1c0b-f6a6-45ca-bfc9-5b7896d203aa.txt',
      query: 'De que trata el archivo de texto?'
    };

    this.answerTxtSocket$.next(request);
  }

  sendRequestCsv() {
    console.log('esperando respuesta')
    const request = {
      user_id: '345',
      file_name: '0016eb4e-c591-4e43-8f8c-d5a8d096b539.csv',
      questions: ['¿Cuál es el valor de la columna "Nombre" en la fila 2?', '¿Cuántas filas tiene el archivo?']
    };

    this.answerCsvSocket$.next(request);
  }

 
}
