import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Like } from '../_models/like';

@Injectable({
  providedIn: 'root'
})

export class LikeService {
  
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  private getOptions() {
    const header = {['authorization']: `Bearer ${this.authService.getToken()}`}
    const options = { headers: new HttpHeaders(header) };
    return options;
  }

  getLikes(FirebaseId:string) {
    return this.httpClient.get<Like[]>(`${environment.api}/likes/${FirebaseId}`, this.getOptions())
  }

  postLike(like: Like) {
    return this.httpClient.post(`${environment.api}/likes/`, like, this.getOptions())
  }

  deleteLike(postId: string, FirebaseId:string) {
    return this.httpClient.delete(`${environment.api}/likes/${postId}/${FirebaseId}`, this.getOptions())
  }

}