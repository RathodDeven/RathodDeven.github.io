const board = [
    null,null,null,1,null,null,2,null,null,null,
    null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,
    3,null,null,null,null,null,null,null,null,4,
    null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,
    5,null,null,null,null,null,null,null,null,6,
    null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,
    null,null,null,7,null,null,8,null,null,null,
]

// DOM references

const cells = document.querySelectorAll("td");
let whitePieces = document.querySelectorAll(".white-piece");
let blackPieces = document.querySelectorAll(".black-piece");
const whiteTurnText = document.querySelectorAll(".white-turn-text");
const blackTurnText = document.querySelectorAll(".black-turn-text");
const divider = document.querySelector("#divider")


let turn = true;
let playerPieces;
var available_moves;
available_moves = [];
let temp_id;

let selectedPiece = {
    pieceID: -1,
    x_pos: -1,
    y_pos: -1,
}


//initailize event listeners on pieces
function givePiecesEventListeners(){
    if(turn){
        for(let i=0;i< whitePieces.length;i++){
            whitePieces[i].addEventListener("click",function(){temp(whitePieces[i].id);});
        }
    }else{
        for(let i=0;i<blackPieces.length;i++){
            blackPieces[i].addEventListener("click",function(){temp(blackPieces[i].id);});
        }
    }
}
function temp(id){
    temp_id = id;
    getPlayerPieces();
}
function getPlayerPieces(){
    
    if(turn){
        playerPieces = whitePieces;
    }else{
        playerPieces = blackPieces;
    }

    removeCellonClick();
    resetBorders();
}

function removeCellonClick(){
    for(let i=0;i<cells.length;i++){
        cells[i].removeAttribute("onclick");
    }
}

function resetBorders(){
    for(let i =0;i<playerPieces.length;i++){
        playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

function resetSelectedPieceProperties(){
    
    selectedPiece.pieceID = -1;
    selectedPiece.pieceID = -1;
    selectedPiece.x_pos = -1;
    selectedPiece.y_pos = -1;
    available_moves = [];
    
}

function getSelectedPiece(){
    selectedPiece.pieceID = parseInt(temp_id);
    selectedPiece.x_pos = findx(selectedPiece.pieceID);
    selectedPiece.y_pos = findy(selectedPiece.pieceID);
    getAvailableSpaces();
}

let findx = function(pieceId){
    let parsed = parseInt(pieceId);
    return (board.indexOf(parsed)%10);
}

let findy = function(pieceId){
    let parsed = parseInt(pieceId);
    return Math.floor(board.indexOf(parsed)/10);
}

function getAvailableSpaces(){
    let x = selectedPiece.x_pos
    let y = selectedPiece.y_pos
    let flag = true
    let temp_index;
    //for left side horizontally
    x--;
    flag = true;
    
    while(x>=0 && flag){
        temp_index = 10*y + x;
        if(board[temp_index]===null){
            available_moves.push(temp_index);
            x--;
        }else{
            flag = false;
        }
    }

    
    //for right side horizntally
    flag = true;
    x = selectedPiece.x_pos
    y = selectedPiece.y_pos
    x++;
    while(x<=9 && flag){
        temp_index = 10*y + x;
        if(board[temp_index]===null){
            available_moves.push(temp_index);
            x++;
        }else{
            flag = false;
        }
    }
    //for up side vertically

    flag = true;
    x = selectedPiece.x_pos
    y = selectedPiece.y_pos

    y--;
    while(y>=0 && flag){
        temp_index = 10*y + x;
        if(board[temp_index]===null){
            available_moves.push(temp_index);
            y--;
        }else{
            flag = false;
        }
    }

    //for downside vertically

    flag = true;
    x = selectedPiece.x_pos
    y = selectedPiece.y_pos

    y++;
    while(y<=9 && flag){
        temp_index = 10*y + x;
        if(board[temp_index]===null){
            available_moves.push(temp_index);
            y++;
        }else{
            flag = false;
        }
    }
    //for left top side diagonally

    flag = true;
    x = selectedPiece.x_pos
    y = selectedPiece.y_pos

    x--;
    y--;
    while(x>=0 &&  y>=0 && flag){
        temp_index = 10*y + x;
        if(board[temp_index]===null){
            available_moves.push(temp_index);
            x--;
            y--;
        }else{
            flag = false;
        }
    }
    //for right down side diagonally
    flag = true;

    x = selectedPiece.x_pos
    y = selectedPiece.y_pos

    x++;
    y++;
    while(x<=9 && y<=9 && flag){
        temp_index = 10*y + x;
        if(board[temp_index]===null){
            available_moves.push(temp_index);
            x++;
            y++;
        }else{
            flag = false;
        }
    }
    //for left down side diagonally

    flag = true;
    x = selectedPiece.x_pos
    y = selectedPiece.y_pos
    y++;
    x--;
    while(x>=0 && y<=9 && flag){
        temp_index = 10*y + x;
        if(board[temp_index]===null){
            available_moves.push(temp_index);
            y++;
            x--;
        }else{
            flag = false;
        }
    }
    //for right up side diagonally
    flag = true;

    x = selectedPiece.x_pos
    y = selectedPiece.y_pos
    x++;
    y--;
    while(x<=9 && y>=0 && flag){
        temp_index = 10*y + x;
        if(board[temp_index]===null){
            available_moves.push(temp_index);
            x++;
            y--;
        }else{
            flag = false;
        }
    }  
    givePieceBorder();  
}

function givePieceBorder(){
    if(available_moves.length !== 0){
        document.getElementById(selectedPiece.pieceID).style.border = "3px solid green";
        giveCellsClick();
    }else{
        return;
    }
}

function giveCellsClick(){
    for(let i=0;i<available_moves.length;i++){
        cells[available_moves[i]].setAttribute("onclick",`makeMove(${available_moves[i]})`);
    }
}

function makeMove(number){
    document.getElementById(selectedPiece.pieceID).remove();
    cells[selectedPiece.y_pos*10 + selectedPiece.x_pos].innerHTML = "";
    board[selectedPiece.y_pos*10 + selectedPiece.x_pos] = null;
    if(turn){
        cells[number].innerHTML =  `<div class="white-piece" id="${selectedPiece.pieceID}">♕</div>`;
        board[number] = selectedPiece.pieceID;
        whitePieces = document.querySelectorAll(".white-piece");
    }else{
        cells[number].innerHTML = `<div class="black-piece" id="${selectedPiece.pieceID}">♛</div>`;
        board[number] = selectedPiece.pieceID;
        blackPieces = document.querySelectorAll(".black-piece");
    }
    resetSelectedPieceProperties();
    removeCellonClick();
    removeEventListeners();
}

function removeEventListeners(){
    if(turn){
        for(let i=0;i<whitePieces.length;i++){
            whitePieces[i].removeEventListener("click",getPlayerPieces);
        }
    }else{
        for(let i=0;i<blackPieces.length;i++){
            blackPieces[i].removeEventListener("click",getPlayerPieces);
        }
    }
    //need to change from here
    changePlayer();
}

function changePlayer(){
    if(turn){
        turn = false;
    
        for(let i=0;i< whiteTurnText.length;i++){
            whiteTurnText[i].style.color = "lightGrey";
            blackTurnText[i].style.color = "black";
        }
    }else{
        turn = true;
        for(let i=0;i<blackTurnText.length;i++){
            blackTurnText[i].style.color = "lightGrey";
            whiteTurnText[i].style.color = "black";
        }
        givePiecesEventListeners();
    }
}

givePiecesEventListeners();


