import { Injectable } from '@angular/core';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  surname: string;
  address: string;

}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = UserService.dummyUserList[0];
  isSignedIn: boolean = false;

  static dummyUserList: Array<User> = [
    {
      id: 1,
      email: "test1@test.com",
      password: "test123456",
      name: "Pera",
      surname: "Perić",
      address: "Mirka Mirkovića 17, Beograd",
    },
    {
      id: 2,
      email: "test2@test.com",
      password: "test123456",
      name: "Mika",
      surname: "Mikić",
      address: "Ružice Sokić 54, Beograd",
    }
  ];

  //Uzimanje id-a aktivnog korisnika, za prikaz njegovih podataka i izmenu istih u Profile komponenti (dijalog za promenu podataka)
  getUserById(id: number): User {
    var foundUser: User
    UserService.dummyUserList.forEach(user => {
      if (user.id == id) {
        foundUser = user;
      }
    });
    this.currentUser = foundUser;
    return foundUser;
  }

  //Provera za postojanje korisnika na prijavi i registraciji
  getUser(userEmail: string): User {
    this.currentUser = UserService.dummyUserList.find(userToFind => userToFind.email == userEmail);
    return this.currentUser;
  }

  //Provera ispravne šifre
  isPasswordCorrect(userEmail: string, password: string): boolean {
    return UserService.dummyUserList.find(userToFind =>
      (userToFind.email == userEmail && userToFind.password == password)) != undefined;
  }

  //Registrovanje novog korisnika
  registerUser(email: string, password: string, name: string, surname: string, address: string): User {
    var maxId: number = 0;
    UserService.dummyUserList.forEach(user => {
      if (maxId < user.id) {
        maxId = user.id;
      }
    });

    var id = ++maxId;

    var user: User = { id, email, password, name, surname, address };

    UserService.dummyUserList.push(user);

    this.currentUser = user;

    this.isSignedIn = true;
    return user;
  }

  constructor() { }
}
