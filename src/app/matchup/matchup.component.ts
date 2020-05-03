import { DatabaseService } from './../database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-matchup',
    templateUrl: './matchup.component.html',
    styleUrls: [
        './matchup.component.css'
    ]
})
export class MatchupComponent implements OnInit {
    first: string;
    second: string;

    constructor(route: ActivatedRoute, router: Router,
        database: DatabaseService) {
        const params = route.snapshot.queryParams;
        if (params.first && params.second
            && database.isValidMatchup(params.first, params.second)) {
            this.first = params.first;
            this.second = params.second;
        } else {
            router.navigateByUrl('/');
        }
    }

    ngOnInit(): void {
    }

}
