import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    readonly cards = [
        {first: 'beets', second: 'bok choy'},
        {first: 'broccoli', second: 'cabbage'},
        {first: 'carrots', second: 'corn'},
        {first: 'cucumber', second: 'green beans'},
        {first: 'green onions', second: 'kale'},
        {first: 'lettuce', second: 'onions'},
        {first: 'potatoes', second: 'snap peas'},
        {first: 'spinach', second: 'sweet peppers'},
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
