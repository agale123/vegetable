import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    readonly cards = [
        {first: 'beets', second: 'carrots'},
        {first: 'potatoes', second: 'pumpkin'},
        {first: 'tomatoes', second: 'sweet peppers'},
        {first: 'melon', second: 'corn'},
        {first: 'snap peas', second: 'green beans'},
        {first: 'cucumber', second: 'green onions'},
        {first: 'broccoli', second: 'cauliflower'},
        {first: 'lettuce', second: 'leeks'},
    ];

    readonly votingOpen = false;

    constructor() { }

    ngOnInit(): void {
    }

}
