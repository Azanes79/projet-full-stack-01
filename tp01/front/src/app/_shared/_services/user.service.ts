import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  private getOptions() {
    const header = {['authorization']: `Bearer ${this.authService.getToken()}`}
    const options = { headers: new HttpHeaders(header) };
    return options;
  }

  getUsers() {
    return this.httpClient.get<User[]>(`${environment.api}/users/`, this.getOptions())
  }


  getUser(FirebaseId:string) {
    return this.httpClient.get<User>(`${environment.api}/users/${FirebaseId}`, this.getOptions())
  }
}