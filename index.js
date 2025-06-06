const boxes = document.querySelectorAll('.box');
const gameinfo = document.querySelector('.game-info');
const newgamebtn = document.querySelector('.btn');


let currentplayer;
let gamegrid ;
let winingpositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a function to intialize the game

function initgame(){
    currentplayer='X';
    gamegrid=['','','','','','','','',''];
    //ui ko bhi update krna padega 
    boxes.forEach((box,index) => {
        box.innerText='';
        boxes[index].style.pointerEvents="all";
        //one more thingi.e green hatana padega i.e css default prop lga denge har ek box pe
        box.classList = `box box${index+1}`; // o index ke liye 1 , 1 index ke liye 2
    })
    newgamebtn.classList.remove('active');
    gameinfo.innerText=`current Player-${currentplayer}`;

}

initgame();
function swapTurn(){
    
    if(currentplayer === 'X'){
        currentplayer='O';
    }
    else{
        currentplayer='X';
    }
    //UI Update
    gameinfo.innerText=`current Player-${currentplayer}`;    // upr wala box chage kiya
}

function checkGameOver(){
    
    let answer="";

    winingpositions.forEach((position)=>{
        // all 3 boxes should be non -epmpty and equal in value
        if((gamegrid[position[0] ]!== '' || gamegrid[position[1] ]!== '' || gamegrid[position[2]] !== '') && (gamegrid[position[0]] === gamegrid[position[1]]) && (gamegrid[position[1]] === gamegrid[position[2]])){
            //mtlb winner ya to x hai ya o koi bhi answer me copy krdo
            answer=gamegrid[position[0]];

            // disable pointer events taki ek bar winner milne  ke bad phirse click na ho

            boxes.forEach((box,index)=>{
                box.style.pointerEvents="none";
            })

            // now we konw x or o is winner so add win class in these boxes to highlight green 

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


        }
    });

    //it means we have a winner
    if(answer !== ""){
        gameinfo.innerText=`winner is ${answer}`;
        newgamebtn.classList.add("active");
        return;  // ek winner dene ke bad return kr jao
    }

    // yha tk aaye mtlb winner nhi mila agr milta to upr return kr jate hence check for fillcount , fillcount krna hi padega becz har box ke liye gameover function call ho rha hai naki bs pura boxes bhrne ke bad 

    let fillcount=0;

    gamegrid.forEach((box) => {
        if (box !== '') {
            fillcount++;
        }
    });
    

    if(fillcount === 9 ){
        gameinfo.innerText=`game tied !!`;
        newgamebtn.classList.add("active");
    }

}
function handleClick(index){
    if(gamegrid[index] === ''){  // this also check for unckickbalaty that is if gamegrid[index] is not empty to if block will not exexute only
        boxes[index].innerText=currentplayer;  // ui me display karwaya
        boxes[index].style.pointerEvents = "none";
        gamegrid[index]=currentplayer;  // internally gamegrid me changes kiye

        //swap karo turn ko
        swapTurn();

        //check kro game over hua ya nhi
        checkGameOver();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleClick(index));
});


newgamebtn.addEventListener("click",initgame);



