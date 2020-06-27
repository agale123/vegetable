# Vegetable Bracket

## Background

I worked with Elk Run Farm which is a member of the South King County Food
Coalition to create an interactive bracket site where vegetables compete
to see which is everyone's favorite. This was part of a virtual fundraiser
with the goal of driving engagement with supporters and bringing in donations.

## Project

The site features a bracket showcasing the current state of the competition.

<img src="https://raw.githubusercontent.com/agale123/vegetable-bracket/master/bracket.png" width="500px">

While the knockout rounds were open, cards were populated with each matchup.
When you vote, you can see the current results. These cards highlight
pictures of vegetables grown at Elk Run Farm.

<img src="https://raw.githubusercontent.com/agale123/vegetable-bracket/master/knockout.png" width="500px">


## Deploying the site

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Deploy app

To deploy the app, run `ng build --prod` to build the Angular project and then run `firebase deploy --project vegetable-276002`.

### Firebase auth issues

If there are issues with it not being recognized, try `firebase login --reauth`.