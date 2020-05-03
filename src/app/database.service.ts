import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Entry {
    vegetable: string;
    votes: number;
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

export const ROUND = 'round1';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    votes: Observable<{ [key: string]: number }>;

    constructor(private readonly firestore: AngularFirestore) {
        this.votes = this.firestore.collection<Entry>(ROUND).valueChanges().pipe(map(values => {
            const toReturn = {};
            for (let value of values) {
                toReturn[value.vegetable] = value.votes;
            }
            return toReturn;
        }));
    }

    vote(vegetable: string) {
        const matchVegetable = ref => {
            return ref.where('vegetable', '==', vegetable);
        }
        this.firestore.collection<Entry>(ROUND, matchVegetable).get()
            .subscribe(response => {
                // TODO(agale): Lock down permissions for writes
                if (response.size >= 1) {
                    const votes = (response.docs[0].get('votes') || 0) + 1;
                    this.firestore.doc(response.docs[0].ref).update({ votes });
                } else {
                    this.firestore.collection(ROUND).add({ vegetable, votes: 1 });
                }
            })
    }

    getVotes() {
        return this.votes;
    }

    isValidMatchup(first: string, second: string) {
        return !!MATCHUPS.find(entry =>
            entry.first === first && entry.second === second);
    }
}
