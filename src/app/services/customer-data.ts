import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerData {

  private https = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/data';

  constructor() { }

  //get data 
  getTask(): Observable<any> {
    return this.https.get<any>(this.apiUrl)
  }

  // get data by id
  getTaskById(id: number): Observable<any> {
    return this.https.get<any>(`${this.apiUrl}/${id}`);
  }

  // for post the data
  addTask(param: any): Observable<any> {
    debugger
    return this.https.post<any>(this.apiUrl, param);
  }

  // for update
  updateTask(id: number, param: any): Observable<any> {
    return this.https.put<any>(`${this.apiUrl}/${id}`, param);
  }


  //for delete data
  deleteTask(id: number): Observable<any> {
    return this.https.delete<any>(`${this.apiUrl}/${id}`);
  }


}
