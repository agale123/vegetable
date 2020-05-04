import { DatabaseService } from './../database.service';
import { Component, Input, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnDestroy {

    @Input() first: string;
    @Input() second: string

    percent: string;
    rightBorder = false;

    private onDestroy = new Subject<boolean>();

    constructor(private readonly database: DatabaseService) {
        this.database.getVotes().pipe(takeUntil(this.onDestroy))
        .subscribe(votes => {
            this.updatePercent(votes[this.first] || 0, votes[this.second] || 0);
        })
    }

    ngOnDestroy(): void {
        this.onDestroy.next(true);
    }

    private updatePercent(firstVotes: number, secondVotes: number) {
        if (firstVotes + secondVotes === 0) {
            this.percent = '50%';
            this.rightBorder = false;
        } else {
            const numericPercent = Math.round(firstVotes / (firstVotes + secondVotes) * 100);
            this.percent = `${numericPercent}%`;
            this.rightBorder = numericPercent >= 96;
        }
    }

    getMatchup() {
        return `${this.first.trim()}${this.second.trim()}`;
    }

    handleClick(vegetable: string) {
        this.database.vote(this.getMatchup(), vegetable);
    }

}
