import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    readonly cards = [
        {first: 'potatoes', second: 'carrots'},
        {first: 'tomatoes', second: 'corn'},
        {first: 'snap peas', second: 'cucumber'},
        {first: 'broccoli', second: 'lettuce'},
    ];

    readonly votingOpen = true;

    constructor() { }

    ngOnInit(): void {
    }

}
