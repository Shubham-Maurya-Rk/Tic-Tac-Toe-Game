let player1=true;
let player2=false;
let start=false;
let Line=true;
let boxId=["1","2","3","4","5","6","7","8","9"];
let x=[];
let zero=[];

document.addEventListener('mouseover',(e)=>{
    let id=e.target.id;
    let boxEle=document.getElementById(id);
    if(boxId.includes(id)){
        boxEle.style.borderColor="rgba(0,0,0,0.5)";
        boxEle.style.backgroundColor="rgba(128, 128, 128, 0.271)"
    }
    if(player1 && boxId.includes(id) && start){
        boxEle.innerText="X";
        boxEle.classList.add('X-0');
    }else if(player2 && boxId.includes(id) && start){
        boxEle.innerText="0";
        boxEle.classList.add('X-0');
    }
});
document.addEventListener('mouseout',(e)=>{
    let id=e.target.id;
    let boxEle=document.getElementById(id);
    if(boxId.includes(id)){
        boxEle.style.borderColor="rgba(0,0,0,0.4)";
        boxEle.style.backgroundColor="white"

    }
    if(player1 && boxId.includes(id) && start){
        boxEle.innerText=id;
        boxEle.classList.remove('X-0');
    }else if(player2 && boxId.includes(id) && start){
        boxEle.innerText=id;
        boxEle.classList.remove('X-0');
    }
});

startGame=()=>{
    if(p1.value==="" && p2.value===""){
        p1.value="Player 1";p2.value="Player 2";
    }
    start=true;
}

document.addEventListener('keypress',(e)=>{
    let keyCode=[49,50,51,52,53,54,55,56,57];
    if(keyCode.includes(e.keyCode)){
    Game(((keyCode.indexOf(e.keyCode))+1).toString())
    }
});
Game=(e)=>{
    let clickedEle=document.getElementById(e);
    if(start){
    if(player1 && boxId.includes(e)){
        clickedEle.style.backgroundColor="rgba(128, 128, 128, 0.271)";
        clickedEle.innerText="X";
        clickedEle.classList.add('X-0');
        boxId.splice(boxId.indexOf(e),1);
        player2=true;
        player1=false;
        chance.innerText=p2.value+"'s chance";
        x.push(parseInt(e));
    }else if(player2 && boxId.includes(e)){
        clickedEle.style.backgroundColor="rgba(128, 128, 128, 0.271)";
        clickedEle.innerText="0";
        clickedEle.classList.add('X-0');
        boxId.splice(boxId.indexOf(e),1);
        player1=true;
        player2=false;
        chance.innerText=p1.value+"'s chance";
        zero.push(parseInt(e));
    }
    }else{
        alert("Pls start to play game.");
    }
    let ans;
    if(x.length>=3 && !player1){
        ans=decision(p1.value,x);
    }else if(zero.length>=3 && !player2){
        ans=decision(p2.value,zero);
    }
    if((x.length>=3 || zero.length>=3) && Line){
        if((ans[1])!= "false"){
        displayLine(ans[0],ans[1]);
        Line=false;
        }
    }
    if(boxId.length<=0 && ans[1]==="false"){
        music.play();
        setInterval(()=>{        
    let winner=document.querySelector('.winner');
    let img=document.querySelector('.image');
        img.style.display='block';
        winner.innerText="- It is a Tie -";
    },300);
    }
}

decision=(type,mark)=>{
let winOpt=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let win=[false,false,false];
let a=0;
let i=0;
    for(let i=0;i<winOpt.length;i+=1){
        for(let j=0;j<winOpt[i].length;j+=1){
            if(mark.includes(winOpt[i][j])){
                win[a]=true;a+=1;
            }
            if(win[0] && win[1] && win[2]){
                return [type,i];
            }
        }
        win[0]=false;win[1]=false;win[2]=false;
        a=0;
    }
return [type,"false"];
}

displayLine=(name,element)=>{
    let line=document.querySelector('.line');
    let winner=document.querySelector('.winner');
    let chance=document.getElementById('chance');
    line.style.display='block';
    line.classList.add(`line${element+1}`);
    setInterval(()=>{
        music.play();   
    },300);
    setInterval(()=>{
        line.classList.remove('animation-line');
    },500);
    setTimeout(()=>{
        let img=document.querySelector('.image');
        img.style.display='block';
        winner.innerText="Congratulations! "+name;
    },700);
    chance.innerText="";
}