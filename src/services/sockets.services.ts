import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  private answerPdfSocket$: WebSocketSubject<any>;
  private answerTxtSocket$: WebSocketSubject<any>;
  private answerCsvSocket$: WebSocketSubject<any>;

  constructor() {
    this.answerPdfSocket$ = webSocket('ws://localhost:8000/ws/answer-pdf');
    this.answerTxtSocket$ = webSocket('ws://localhost:8000/ws/answer-txt');
    this.answerCsvSocket$ = webSocket('ws://localhost:8000/ws/answer-csv');
  }

  getAnswerPdfSocket() {
    return this.answerPdfSocket$;
  }

  getAnswerTxtSocket() {
    return this.answerTxtSocket$;
  }

  getAnswerCsvSocket() {
    return this.answerCsvSocket$;
  }
}
