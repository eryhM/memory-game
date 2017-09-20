# Memory Game

The game board consists of sixteen cards arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbols face down.

The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

### How to play
---
Each turn:
The player flips one card over to reveal its underlying symbol. The player then flips a second card, trying to find the corresponding card with the same symbol. If the cards match, both cards stay flipped over. If the cards do not match, both cards are flipped face down.
The game ends once all cards have been correctly matched.

### Rating system
---
The timer in the game only reflects how much time a player has spent since the game started. It does not contribute positively or negatively to the final score. The player may decide to pause or resume the game at any time. If the game is paused, cards cannot be flipped over.

The number of turns taken to win determines how many stars are awarded at the end of the game.
The rating is as follow:

* Three stars if the game is won in 15 turns or less.
* Two stars if the game is won in 16 turns or more.
* One star if the game is won in 21 turns or more.


### Dependencies
---
* [jQuery v3.2.1](https://jquery.com/)
* [jQuery UI v1.12.1](https://jqueryui.com/), which only includes the effects core and the shake effect.
* [Bootstrap v4.0.0 Beta](https://getbootstrap.com/), which requires [Popper.js](https://popper.js.org/).
* [Font Awesome v4.7.0](https://fontawesome.io/) for all icons and symbols used in the game.

### License
---
The content of this repository is licensed under the MIT License, available [here](https://github.com/eryhM/memory-game/blob/master/LICENSE).