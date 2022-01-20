# Tic Tac Toe
A simple tic tac toe game for two players. Place your symbol in a blank square until there are three in a row or there is a draw.

<img width="1440" alt="Screen Shot 2022-01-16 at 11 30 53 AM" src="https://user-images.githubusercontent.com/79027364/149671021-1180d53d-e6be-433d-8578-5f040fd686bd.png">

## How to Run

1. Fork the repository
2. Clone down your new, forked repo
3. `cd` into the repository
4. Type `open index.html` from the command line

## About This Game

#### Tech

This site was built using JavaScript, HTML, and CSS. The main functionality of the site is created through the Game and Player classes. All DOM manipulation is handled in the main JavaScript file.

#### Contributors
This site was built by [Kim Ward](https://github.com/kmewrd) as a Mod 1 solo project at Turing School of Software & Design.

#### Future Additions

  - Add a dark mode and light mode theme that users can toggle
  - Add local storage that allows wins and theme choice to persist after page reload
  - Add the option to increase the size of your board to 4 x 4, 5 x 5, and 6 x 6

#### Design Inspiration

  - Board: [Tic Tac Toe by Palmi](https://dribbble.com/shots/5536601-Tic-Tac-Toe)
  - Colors: [Coolors](https://coolors.co/3d5a80-98c1d9-e0fbfc-ee6c4d-293241)

## Reflections

I spent a lot of time on the front-end of the project figuring out which properties and methods were essential to my Classes, and which Class they needed to exist on. This prep work was probably the most challenging aspect of the project, but also the most insightful.

#### Wins

  - Using the `.every()` method to check win conditions.
  - Getting my placeToken function to trigger a cascade of functions based on the status of the game, rather than calling each function individually.
  - Refactoring - always super satisfying to clean up code!

#### Challenges

  - Getting the board squares styled with alternating colors and a bright middle square. A deceptively difficult task, this involved using outlines instead of borders, adding margins to my squares, and adding a background-color to my game board container.
