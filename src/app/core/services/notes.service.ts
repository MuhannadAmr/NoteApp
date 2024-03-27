import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotesData } from '../interfaces/notes-data';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient: HttpClient) { }


  addNoteAPI(noteData: NotesData): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/notes`, noteData, {
      headers: { token: localStorage.getItem('userTokenNotes') || '' }
    })
  }

  getNotesAPI(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/notes`, {
      headers: { token: localStorage.getItem('userTokenNotes') || '' }
    })
  }

  deleteNoteAPI(noteId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/notes/${noteId}`, {
      headers: { token: localStorage.getItem('userTokenNotes') || '' }
    })
  }

  updateNoteAPI(noteData: NotesData, noteId: any): Observable<any> {
    return this._HttpClient.put(`${environment.baseURL}/notes/${noteId}`, noteData, {
       headers: { token: localStorage.getItem('userTokenNotes') || '' }
       })
  }
}
