import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface Entry {
    matchup: string;
    user: string;
    favorite: string;
}

export const MATCHUPS = [
    { first: 'broccoli', second: 'carrot' },
    { first: 'tomato', second: 'potato' },
    { first: 'cucumber', second: 'spinach' },
    { first: 'cauliflower', second: 'onion' },
    { first: 'beet', second: 'squash' },
    { first: 'radish', second: 'pepper' },
    { first: 'artichoke', second: 'corn' },
    { first: 'lettuce', second: 'green bean' },
];

export const ROUND = 'round2';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    votes: Observable<{ [key: string]: number }>;

    userFavorites: Observable<string[]>;

    constructor(
        private readonly firestore: AngularFirestore,
        private readonly auth: AuthService) {

        this.votes = this.firestore.collection<Entry>(ROUND).valueChanges().pipe(
            map(values => {
                const toReturn = {};
                for (let value of values) {
                    if (value.favorite in toReturn) {
                        toReturn[value.favorite] = toReturn[value.favorite] + 1;
                    } else {
                        toReturn[value.favorite] = 1;
                    }
                }
                return toReturn;
            }),
            shareReplay(1),
        );

        this.userFavorites = this.firestore.collection<Entry>(ROUND).valueChanges()
            .pipe(
                map(values => {
                    const user = this.auth.getCurrentUser();
                    if (!user) {
                        return [];
                    }
                    const toReturn = [];
                    for (let value of values) {
                        if (value.user === user.uid) {
                            toReturn.push(value.favorite);
                        }
                    }
                    return toReturn;
                }),
                shareReplay(1));
    }

    vote(matchup: string, favorite: string) {
        if (!this.auth.isUserSignedIn()) {
            this.auth.signIn().then(() => {
                this.voteInternal(matchup, favorite)
            });
        } else {
            this.voteInternal(matchup, favorite);
        }

    }

    private voteInternal(matchup: string, favorite: string) {
        const user = this.auth.user!.uid;
        const matchVegetable = ref => {
            return ref.where('matchup', '==', matchup)
                .where('user', '==', user);
        }
        this.firestore.collection<Entry>(ROUND, matchVegetable).get()
            .subscribe(response => {
                if (response.size >= 1) {
                    // User has already voted so change the vote.
                    this.firestore.doc(response.docs[0].ref)
                        .update({ favorite });
                } else {
                    // User hasn't voted yet.
                    this.firestore.collection(ROUND)
                        .add({ matchup, user, favorite });
                }
            })
    }

    getVotes() {
        return this.votes;
    }

    getUserFavorites() {
        return this.userFavorites;
    }

    isValidMatchup(first: string, second: string) {
        return !!MATCHUPS.find(entry =>
            entry.first === first && entry.second === second);
    }
}
