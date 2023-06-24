import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpClient:HttpClient) { }

  addEmployee(data:any): Observable<any>{
    return this.httpClient.post('http://localhost:3000/employee', data);
  }
  getEmployee(): Observable<any>{
    return this.httpClient.get('http://localhost:3000/employee');
  }
  editEmployee(id:number): Observable<any>{
    return this.httpClient.get(`http://localhost:3000/employee/${id}`);
  }
  updateEmployee(data:any, id:number):Observable<any>{
    return this.httpClient.put(`http://localhost:3000/employee/${id}`, data);
  }
  deleteEmployee(id:number):Observable<any>{
    return this.httpClient.delete(`http://localhost:3000/employee/${id}`);
  }
}
