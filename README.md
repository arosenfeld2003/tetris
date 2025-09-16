# my_tetris
I built this version of Tetris as a project for Qwasar Silicon Valley.  It was a really fun way to learn about game architecture, while also focusing on the fundamentals of modern Javascript.  

Using a template by [Michael Karén](https://medium.com/@michael.karen/learning-modern-javascript-with-tetris-92d532bcd057), I built this game on a canvas rendered as a grid - if the space is empty, the matrix is filled with a '0', else it is filled with a number representing the shape of the piece.  The tetrominos are constructed around a center axis, and the matrix is transposed when the user roatates a piece.  We use classes for the board and the tetrominos, and use a proxy object to help keep track of the score.  In addition, I added sound effects, background music, and the ability to swap pieces in/out to a 'hold' box.  

### Run Locally
I've included a simple node server to run the game locally.  Once you clone the project, just run 'node html_server.js' in your terminal, then open 'localhost:8080' in your browser to get the party started.

