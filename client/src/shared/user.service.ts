import { Injectable } from '@angular/core';
import {BASE_URL} from "./util";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

const URL = `http://${BASE_URL}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userName: string | null;

  constructor(private readonly http: HttpClient) {
    this.userName = null;
  }

  public async attemptLogin(userName: string): Promise<boolean>{
    const response = this.http.post<LoginResult>(URL, {userName: userName});
    const result = await firstValueFrom(response);
    if (result.success){
      this.userName = userName;
      return true;
    }
    return false;
  }

  public get user(): string | null {
    return this.userName;
  }

}

interface LoginResult {
  success: boolean;
}
