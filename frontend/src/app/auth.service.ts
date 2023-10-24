import { Injectable } from '@angular/core';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public signIn(userData: User){
    console.log("hello shamy");

    localStorage.setItem('ACCESS_TOKEN', "accessToken");
  }

  public isLoggedIn(){
    
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  
  }
}
