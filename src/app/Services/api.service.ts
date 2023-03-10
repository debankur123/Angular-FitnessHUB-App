import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseURL = "http://localhost:3000/enquiry";

  constructor(private http : HttpClient) { }

  submitRegistration(registerObj : User){
    return this.http.post<User>(`${this.baseURL}`,registerObj)
  }
  getRegisteredUser(){
    return this.http.get<User[]>(`${this.baseURL}`);
  }
  updateRegisteredUser(registerObj : User,id : number){
    return this.http.patch<User>(`${this.baseURL}/${id}`,registerObj)
  }
  deleteRegisteredUser(id : number){
    return this.http.delete<User>(`${this.baseURL}/${id}`)
  }
  getRegisteredUserDetails(id : number){
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }


}
