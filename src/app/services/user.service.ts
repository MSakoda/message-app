import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  username: string = '';
  users: User[] = [];
  showLogin: boolean = false;
  showRegister: boolean = false;
  loggedInUser: string = '';

  logoutSub: Subject<any> = new Subject();
  logoutChange = this.logoutSub.asObservable();

  constructor() {
    if (window.localStorage.users == undefined) {
      window.localStorage.users = "[]";
    }
    this.getUsers();
    this.getLoggedInUser();
  }

  getUsers(){
    this.users = JSON.parse(window.localStorage.users);
  }

  createUser(username){
    let user: User = {
      username: username,
      id: UUID.UUID(),
      c_at: new Date(),
      u_at: new Date()
    }
    console.log(`user:`,user);
    this.users.push(user);
    this.updateUsers();
    return user;
  }

  getUserById(id){
    if (id == "") return null;
    let user = this.users.find(u => u.id === id);
    if (user) return user;
    return null;
  }

  getUserByUsername(username){
    let user = this.users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  updateUser(){

  }

  updateUsers(){
    window.localStorage.users = JSON.stringify(this.users);
  }

  // returns response with valid boolean and errors
  validateNewUser(username){
    // check if not empty
    if (username.trim() == "") {
      this.username = '';
      return {
        valid: false,
        error: 'Username is empty'
      }
    }
    // check if username already exists
    let user = this.users.find(u => u.username.trim().toLowerCase() == username.trim().toLowerCase());
    if (user) {
      return {
        valid: false,
        error: 'Username already exists'
      }
    }
    return {valid: true};
  }

  onShowLogin(){
    this.showLogin = true;
    this.showRegister = false;
  }

  onShowRegister(){
    this.showRegister = true;
    this.showLogin = false;
  }

  loginUser(user) {
    window.localStorage.loggedInUser = user.id;
  }

  logoutUser() {
    this.user = null;
    window.localStorage.loggedInUser = '';
    this.logoutSub.next(true);
  }

  getLoggedInUser(){
    if (window.localStorage.loggedInUser == undefined) {
      window.localStorage.loggedInUser = '';
    }
    this.user = this.getUserById(window.localStorage.loggedInUser);
  }
}
