import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    readonly cards = [
        {first: 'snap peas', second: 'carrots'},
    ];

    readonly votingOpen = true;

    constructor() { }

    ngOnInit(): void {
    }
}
