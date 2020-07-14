import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

// const HttpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>( this.baseUrl + 'users');
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>( this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User): any{
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }
}
