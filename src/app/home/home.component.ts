import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    readonly cards = [
        {first: 'broccoli', second: 'carrot'},
        {first: 'tomato', second: 'potato'},
        {first: 'cucumber', second: 'spinach'},
        {first: 'cauliflower', second: 'onion'},
        {first: 'beet', second: 'squash'},
        {first: 'radish', second: 'pepper'},
        {first: 'artichoke', second: 'corn'},
        {first: 'lettuce', second: 'green bean'},
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
