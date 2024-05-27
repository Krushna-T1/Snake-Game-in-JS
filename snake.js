document.addEventListener("DOMContentLoaded", function() {

    
let parent =document.getElementById("map");
let head   =document.querySelectorAll(".snake");
let food   =document.querySelector("#food");
let start  =document.getElementById("start");
let restart=document.getElementById("restart");
let score  = document.getElementById("score");


let rightMovement;
let leftMovement;
let topMovement;
let bottomMovement;

let onCollide;
let direction="";
let speed=700;
let i=0;
score.value=0;
let isStart=false;
let startGenerate=false;




    


function move(e){
 if(isStart){

//Left Movement
        if (e.key === "a" || e.key === "A") {
            if (direction != "right") {
                clearInterval(topMovement);
                clearInterval(bottomMovement);

                if (leftMovement) {clearInterval(leftMovement);}

                direction="left";
                leftMovement=setInterval(()=>{
                    let head=document.querySelectorAll(".snake");
                    let len=head.length;
                    let pos=parseInt(head[len-1].style.left);//get last index element position
                    console.log(pos);
                    let y=parseInt(head[len-1].style.top);
                    if(pos>-1){      //checking position from wall
                        pos-=30;
                        console.log(pos);
                        //creating new element and removing last element
                       let child=document.createElement("div");
                       child.setAttribute("class","snake");
                       child.style.left=pos+"px";
                       child.style.top=y+"px";
                       parent.appendChild(child);

                       //remove last element
                       head[0].remove();
                       //calling function to check snake and food position 
                       getpos();

        
                    }
                },speed);
            }
            else{
                clearInterval(leftMovement);
                direction="";
            }  
        } 
//Right Movement
        else if (e.key === "d" || e.key === "D") {
            if (direction != "left") {
                clearInterval(topMovement);
                clearInterval(bottomMovement);

                if (rightMovement) {clearInterval(rightMovement);}

                direction = "right";

                rightMovement =  setInterval(()=>{
                    let head=document.querySelectorAll(".snake");
                    let len=head.length;
                    let pos=parseInt(head[len-1].style.left);
                    let y=parseInt(head[len-1].style.top);

                    if(pos<271){
                        pos+=30;
                        console.log("X:"+pos,"Y:"+y);
                       
                       let child=document.createElement("div");
                       child.setAttribute("class","snake");
                       child.style.left=pos+"px";
                       child.style.top=y+"px";
                       parent.appendChild(child);
                       head[0].remove();

                       getpos();
        
                    }
                    else{
                        clearInterval(rightMovement);
                        direction="";
                    }
                   
                },speed);
            }
        }
//Up Movement
        else if (e.key === "w" || e.key === "W") {
            if (direction != "bottom") {
                clearInterval(leftMovement);
                clearInterval(rightMovement);
                clearInterval(bottomMovement);

                if (topMovement) {clearInterval(topMovement);}

                direction = "top";
              
                topMovement =setInterval(()=>{
                    let head=document.querySelectorAll(".snake");
                    let len=head.length;
                    let pos=parseInt(head[len-1].style.top);
                    let x=parseInt(head[len-1].style.left);
                    if(pos>-1){
                        pos-=30;
                        let child=document.createElement("div");
                        child.setAttribute("class","snake");
                        child.style.top=pos+"px";
                        child.style.left=x+"px";
                        parent.appendChild(child);
                        head[0].remove();
                        getpos();
                    }
                    else{
                        clearInterval(topMovement);
                        direction="";
                    }
                },speed); 
            }
        }
//Down Movement

        else if (e.key === "s" || e.key === "S") {
            if (direction != "top") {
                clearInterval(leftMovement);
                clearInterval(rightMovement);
                clearInterval(topMovement);

                if (bottomMovement) {clearInterval(bottomMovement);}

                direction = "bottom";
               
                bottomMovement = 
                setInterval(()=>{
                    let head=document.querySelectorAll(".snake");
                    let len=head.length;
                    let pos=parseInt(head[len-1].style.top);
                    let x=parseInt(head[len-1].style.left);
                    if(pos<271){
                        pos+=30;
                        let child=document.createElement("div");
                        child.setAttribute("class","snake");
                        child.style.top=pos+"px";
                        child.style.left=x+"px";
                        parent.appendChild(child);

                        head[0].remove();

                        getpos();
                    }
                    else{
                        clearInterval(bottomMovement);
                        direction="";
                    }
                },speed);
            }
        }
      }
}

//food Generation

function generatefood() {
    if(startGenerate){
    let leftMax = 270;
    let topMax = 270;
    let min = 0;
    let leftdiff = leftMax - min;
    let topdiff = topMax - min;
    //getting random location on map in multiple of 30
    let xaxis = Math.floor((Math.random() * leftdiff) + min);
    let x=Math.ceil(xaxis/30)*30;
    let yaxis = Math.floor((Math.random() * topdiff) + min);
    let y=Math.ceil(yaxis/30)*30;
    food.style.display = "block";
    //setting in - because assing to bottom right corner
    food.style.left = -x + "px";
    food.style.top = -y + "px";
   
}
}

//increasing snake length

function getpos() {
    let head=document.querySelectorAll((".snake"));
    let food=document.getElementById("food");
    let snakeL = parseInt(head[head.length-1].style.left);
    let snakeT = parseInt(head[head.length-1].style.top);
    let endL = parseInt(head[0].style.left);
    let endT = parseInt(head[0].style.top);
    
    let foodL = parseInt(food.style.left);
    let foodT = parseInt(food.style.top);
    console.log(snakeL-foodL,snakeT-foodT);
    //comparing food and snake position
    if ((snakeL-foodL)==270 && (snakeT-foodT)==270) {
        //assing new location for food
        generatefood();
        //update score
        score.value = parseInt(score.value) + 10;
        i++;
        //to increase length adding new element at last position snake
        let add = document.createElement("div");
        add.setAttribute("class", "snake");
        add.setAttribute("id", "snake" + i);
        add.style.left = endL+"px";
        add.style.top = endT+"px";
        parent.insertBefore(add,head[0]);
        //to increase difficulty by increasing speed 
        speed-=10;
    }
}


//check snake collision with itself or wall
function collision() {
    let head = document.querySelectorAll(".snake");
    let rect = head[head.length-1].getBoundingClientRect();
    let mapRect = document.getElementById("map").getBoundingClientRect();
    //checking with wall
    if (rect.left < mapRect.left || 
        rect.right > mapRect.right || 
        rect.top < mapRect.top || 
        rect.bottom > mapRect.bottom) {

    //clearing all intervals to stop snake from moving after collision
        clearInterval(onCollide);
        clearInterval(leftMovement);
        clearInterval(rightMovement);
        clearInterval(topMovement);
        clearInterval(bottomMovement);
        gameOver();
        return;
    }
//checking with itself
//check after snake length is more than 3
    if (head.length > 3) {
        //last element of snake because it is head of snake
        let lastNode = head[head.length - 1];
        for (let i = 0; i < head.length - 1; i++) {
            let currentNode = head[i];
            let currentNodeRect = currentNode.getBoundingClientRect();
            if (rect.left === currentNodeRect.left && rect.top === currentNodeRect.top) {
                clearInterval(onCollide);
                clearInterval(leftMovement);
                clearInterval(rightMovement);
                clearInterval(topMovement);
                clearInterval(bottomMovement);
                //display gameOver Text
                gameOver();
                return;
            }
        }
    }
}



function gameOver() {
    let gameElement = document.createElement("div");
    gameElement.id = "game";
    gameElement.style.height = "300px";
    gameElement.style.width = "240px";
    gameElement.style.color = "#fff";
    gameElement.style.fontSize = "40px";
    gameElement.style.backgroundColor = "red";
    gameElement.innerHTML = "Game Over";
    start.disabled=true;
    start.style.display="none";
    restart.style.display="block";
    parent.appendChild(gameElement);
}


//to start game
start.onclick=()=>{
    if(!isStart){
        isStart=true;
        //starting keyEvent
        document.addEventListener("keypress",move);
       onCollide= setInterval(collision,100);

    }
    if(!startGenerate){
        startGenerate=true;
        generatefood();
    }
}//to restart game after game Over
restart.onclick=()=>{
    location.reload();

}
});