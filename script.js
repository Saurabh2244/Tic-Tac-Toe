//fetch required variables9
const gameInfo = document.querySelector('[data-currPlayer]');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('[data-newGame]');

//variables need
let currPlayer; // O or X
let grid; // arr

let winningPositions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
    [0, 4, 8], [2, 4, 6], //diagonal
];

//function to initilize game
function initGame() {
    currPlayer = "X";
    grid = ["", "", "", "", "", "", "", "", ""];

    gameInfo.innerText = `Current Player - ${currPlayer}`;

    //emptying boxes on UI
    for(let i=0;i<boxes.length;i++){
        boxes[i].innerText=grid[i];
        boxes[i].style.pointerEvents="all";

        //one thing remain --> green ko hatao
        boxes[i].classList.remove('win');
    }

    newGameBtn.classList.remove('active');
}

initGame();

//add event listener on boxes
boxes.forEach(function (box, index) {
    box.addEventListener('click', function () {
        handleClick(index); //index se pata lagega ki konse box pe click kiya hai
    })
});

//click handle function
function handleClick(index) {
    //if box empty then only place
    if (grid[index] === "") {
        //show on UI
        boxes[index].innerText = currPlayer;

        //grid --> boxes ka array ke form me jo track hai usko update kriyo
        grid[index] = currPlayer;

        //remove cursor pointer
        boxes[index].style.pointerEvents = "none";

        //change turn
        changeTurn();

        //check koi jita to nhi?
        checkGameOver();
    }
}

//change turn function
function changeTurn() {
    if (currPlayer === "X") {
        currPlayer = "O";
    }
    else if (currPlayer === "O") {
        currPlayer = "X";
    }

    //update on UI
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

//function for to check game is over or not
function checkGameOver(){
    let winner="";
    winningPositions.forEach(function(position){
        //agar 3 values same hai aur voh empty nhi hai, so hmko winner mil gya
        if( (grid[position[0]]!=="" || grid[position[1]]!=="" || grid[position[2]]!=="" ) && ( (grid[position[0]]===grid[position[1]]) && (grid[position[1]]===grid[position[2]]) ) ){
            //check if winner is X
            if(grid[position[0]]==='X'){
                winner="X";
            }
            else{
                winner="O";
            }
            //disable pointer events
            boxes.forEach(function(box){
                box.style.pointerEvents="none";
            })
            //abb hmko winner pata hai, so green winning position ko green karo
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    })

    //winner mil gya hai, so new game ko enable kro
    if(winner!==""){
        gameInfo.innerText=`Winner Player - ${winner}`;
        newGameBtn.classList.add('active');

        return; //winner mola so return karo aage mat jao
    }

    //when there is no winner--> tie
    let fillCnt=0;
    grid.forEach(function(block){
        if(block!==""){
            fillCnt++;
        }
    })

    //if board if completly filled
    if(fillCnt===9){
        //game info me -> game tie show karo 
        gameInfo.innerText=`Game Tied!`;

        //new game btn ko enable karo
        newGameBtn.classList.add("active");
    }
}

//listener on new game button
newGameBtn.addEventListener('click',function(){
    initGame();
})