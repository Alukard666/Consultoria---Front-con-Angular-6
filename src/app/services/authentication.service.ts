import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userUrl: string;

  constructor(private _http: HttpClient) {
    this.userUrl = `${environment.urlApi}/rest-auth`;
  }

  login(user: UserModel) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this._http.post(`${this.userUrl}/login`, body, {headers})
      .pipe(map((response: Response) => {
          const json = response.json();
          console.log(json);
      }));
  }

}
