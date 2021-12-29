<h1 align="center">Project 1: Tic-Tac-Toe</h1>

<p>The purpose of this project was to create a browser Tic-Tac-Toe game using HTML, CSS, and Javascript. We created this project from nothing into a fully functioning game. We were given a few user stories and technical requirements as well as some extra goals to guide our projects.
</p>

![Screenshot image](/README_IMG/Tic-Tac-Toe.png)
---
<h3 align="center">Technologies Used</h3>
<p align="center">HTML</p> 
<p align="center">CSS</p>
<p align="center">JavaScript</p>

---

<br></br>
<h3>User Story Requirments</h3>

   - [x] As a user, I should be able to start a new tic tac toe game
   - [x] As a user, I should be able to click on a square to add X first and then O, and so on
   - [x] As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
   - [x] As a user, I should not be able to click the same square twice
   - [x] As a user, I should be shown a message when I win, lose or tie
   - [x] As a user, I should not be able to continue playing once I win, lose, or tie
   - [x] As a user, I should be able to play the game again without refreshing the page

<h3>Technical Requirments</h3>


   - [x] Render a game board in the browser
   - [x] Switch turns between X and O (or whichever markers you select)
   - [x] Visually display which side won if a player gets three in a row, or show a draw if neither player wins
   - [x] Include separate HTML / CSS / JavaScript files
   - [x] Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
   - [x] Use JavaScript for DOM manipulation
   - [x] Deploy your game online, where the rest of the world can access it
   - [x] Use semantic markup for HTML and CSS (adhere to best practices)
   - [x] Have well-formatted, and well-commented code

<h3>Potential Extra Tic Tac Toe Features</h3>

   - [x] Keep track of multiple game rounds with a win, lose and tie counter
   - [x] Allow players to customize their tokens (X, O, name, picture, etc)
   - [x] Use localStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity
   - [x] Involve Audio in your game
   - [ ] Create an AI opponent: teach JavaScript to play an unbeatable game against you
   - [x] Make your site fully responsive so that it is playable from a mobile phone
   - [x] Get inventive with your styling e.g. use hover effects or animations


<h3>Super Potential Extra Tic Tac Toe Features</h3>

- [ ] Allow 2 players to play online with each other using any means such as WebSockets, Firebase, or other 3rd-party services.

---
<h3 align="center">The Process</h3>

![wireframe image](/README_IMG/wireframe.svg)

This wireframe was an initial sketch of what I thought the game may look like. It gave me a rough idea on where the different elements might be placed in both desktop and mobile. The final product came out slightly different than the wireframe but it's mostly the same layout.

![win_conditions_image](/README_IMG/winning.png)

Next, I thought about the game and what it would take to win. I drew a game board and assigned each square a number starting with 0 since that's how it would start in code. Then I went through the board and wrote the winning combinations. This would be the basis on which the code was developed around. These numbers were made into an array so it could be compared to player arrays. 

I also thought about the requirements beyond the technical and user story requirements and made a list to help keep track of what I was doing.

- 3x3 grid
- Display who won
- Display draw
- Reset entire game
- Display player current turn
- Track clicks made in squares
- Check if moves are valid/Check if square is taken
- Update game status
- Update UI with game changes
- Repeat until the end of the game

This these few requirements I could track what needed to be done and could make sure I didn't stray away from the core game requirements.

I also gave thought about what the code might look like, for example:
```
HTML
   Create board
      div board
         div squares/cells  (each cell has a number)
         
         score board
         
         player icons
         
         reset button
         
         X symbol
         
         O symbol
         
```

This doesn't look like much but it gave me a rough idea of how the HTML may be layed out. I also gave so thought about making game using classes, for example:

```
Game Logic
   board
   score
   turn
   winning conditions
   
Player 1
   spaces taken
   
Player 2
   spaces taken
   
```

Again this gave me a rough idea on how a class based code may be layed out. Ultimately I decide to go with a function system. For me it was easier to quickly implement and keep track of the data. I may refactor the code to a class system on a later date.

When I finally started coding I starts with the bare minimums. I made a boilerplate HTML document and created the divs for the game board so I can assign them later to the Javascript code. In CSS I sized the squares for the gameboard and gave it a border so I could see it on the screen while testing. After that I started working on the Javascript code. First, I declared all the variables I might use, since I didn't yet know how I was going to go about certain things like turn tracking I created more variables than I needed at the end. Some did come into use later in the process. 

The next code I created was the DOM section. I was thinking of all the functions the game might have and created sections in the HTML for them and did document queries for grab them for later use. Again, I wasn't 100% sure how or if I was going to use them, but they were there in case I did decide to use them. 

I started working on the logic. First was to loop through the square array that I grabbed with  ```const squares = document.querySelectorAll('.squares');``` so I can access each individual square. Within that loop I also created a event listener to listen for a click so it would grab the square with the id that was clicked on. I passed that data onto another function.

The function I passed the square data onto would determine player turns, player symbols, and be used to add the square id to the player array to keep track of spaces taken. The player turn was kept track of by using a numerical count that would increment each turn. If the counter hit 10 then that would result in a tie game. To determine which player's turn it was I used a modulus operator to check divisibility by 2. In order to prevent clicking on a space that has been already play and changing the symbol, check was put into place. First, the innerHTML is filled with a space. This is need because a space is still a detectable character but won't show up in the html page, this is important a little later. Once that the innerHTML is filled with a space, the length of the innerHTML becomes 1. So a check was put into place to check whether a space returns a 0 or a 1. If it returns a 0, that means the space has no characters in it and hasn't been played yet, so the logic continues. If a 1 is returned then the logic is stopped until the player clicks on an empty spot.

A check function was created just to check if the player array matches any of the arrays of winning combinations. If there is a match then the function returns true to the if check player section and a winner is declared. 

In order to display the player symbols on the board new attributes were set dynamically with the attribute of XO and the value of the player symbol of either X or O. This attribute is used for the CSS to assign custom symbols and styling to the symbols. 

For resetting the board, I made a function that would go through and default all the values and updates the interface with the default values. At this point it was also resetting the score. This would be a seperate function later.

After completing the user stories, I moved on to the extra features. The first feature I worked on was keeping track of multiple game round. This is where seperated the reset score to it's own function so it doesn't reset with the board reset. I also removed it from the startGame function so doesn't clear every round. I also added a reset score button when the player does want to clear the score board. 

I decided to work on responsive design. This was mainly done is CSS. I created media queries based on screen size. This took me a little while to figure out the sizing. I used the template of the Galaxy S10 as a base. I created rules for the min and max resolution of the screen and created CSS rules for the different elements to work with the screen size. Then I created another media query for bigger screen like tablets and repeated the process.

The next feature I worked on was the localStorage for persistent data storage. This required a bit of research since we never touched on it in class. It turned out to be a bit easier than I initally thought. In the localStorage I stored the player and tie points. I then created a function that retrieves that data and then updates the innerHTML for the score board with the values so the UI displays the score. This function is called with the window loads.

Adding audio was the next thing I worked on. For this I added an audio file in HTML and then used DOM to get access to it and stored it in a variable. The audio file is played after the square check to it would play whenever an empty square was clicked.

I'm currently working on player tokens, it is way more complex than I originally thought. I have to take into account content replacement in CSS so the symbols can replace the deafult symbol. I also have to create logic so the player can keep choosing tokens as the game is in progress. There is also the issue of the player choosing the same token which would make the game very confusing. I have an idea of comparing the image source this both player tokens come from the same source. 

Beside the player token I still need to work on AI opponent and online play. I also want to work on visual styling such as drop down menu for the tokens and more animations. 

If I had to choose a favorite function I would say it would be playerSymbols. That's where all the game magic happens. It plays audio, does scoring, adds to the player array, adds points, set attributes and announces the winner. It's a very hard working function. 
