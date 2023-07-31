

import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireObject,} from '@angular/fire/compat/database';
import { AppUser } from './models/app-user';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user:User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      // isAdmin:true
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}



