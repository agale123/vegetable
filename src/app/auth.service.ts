import { map, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { UrlSerializer } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isSignedIn = false;
    user?: User;

    constructor(private readonly auth: AngularFireAuth) {
        this.auth.user.subscribe(user => {
            this.user = user;
            this.isSignedIn = !!user;
        });
    }

    signIn() {
        return this.auth.signInAnonymously();
    }

    getCurrentUser() {
        return this.user;
    }

    isUserSignedIn(): boolean {
        return this.isSignedIn;
    }
}