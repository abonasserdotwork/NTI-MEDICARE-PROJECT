import { Injectable } from '@angular/core';

export interface User {
  id: number,
  name: string,
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {
    const data = localStorage.getItem('users');
    if (data) {
      this.users = JSON.parse(data);
    }
  }
  users: User[] = [];


  setUser(user: User) {
    this.users.push(user);
  }
  getUsers() {
    return this.users;
  }
  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
