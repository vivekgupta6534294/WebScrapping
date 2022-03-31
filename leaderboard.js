const request=require('request');
const jsdom=require("jsdom");
const {JSDOM}=jsdom;
let leaderBoard=[];
const link="https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";
request(link,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        const dom=new JSDOM(html);
        const document=dom.window.document;
        let allScoreCardTags=document.querySelectorAll('a[data-hover="Scorecard"]');
        // console.log(allScoreCardTags.length);
        for(let i=0;i<allScoreCardTags.length;i++){
            let link=allScoreCardTags[i].href;
            let completeLink ="https://www.espncricinfo.com"+link;
            // console.log(completeLink);
            request(completeLink,scoreCard);
        }
    }
}
function scoreCard(error, response, html){
    if(error){
        console.log(error);
    }else{
        const dom=new JSDOM(html);
        const document =dom.window.document;
        // console.log("Ok");
        let batsmenRow=document.querySelectorAll(".table.batsman tbody tr")
        for(let i=0;i<batsmenRow.length;i++){
            let cell=batsmenRow[i].querySelectorAll("td");
            if(cell.length==8){
                let name=cell[0].textContent;
                let runs=cell[0].textContent;
                let balls=cell[3].textContent;
                let fours=cell[5].textContent;
                let sixes=cell[6].textContent;
                // console.log("Name: ", name, "Runs", runs, "Balls", balls,"Four",fours,"Sixes",sixes);
               // processPlayer(name,runs,balls,fours,sixes);
            }
        }
    }
}
    processPlayer('Rohit','15','4','2','4');
    processPlayer('Virat','50','20','4','3')
    processPlayer('Rohit','40','20','1','2');
    console.log(leaderBoard);
function processPlayer(name, runs, balls, fours, sixes){
    
    runs=Number(runs);
    balls=Number(balls);
    fours=Number(fours);
    sixes=Number(sixes);
    
    for(let i=0;i<leaderBoard.length;i++){
        let playerObj=leaderBoard[i];
        if(playerObj.Name==name){
            playerObj.Runs+=runs;
            playerObj.Balls+=balls;
            playerObj.Fours+=fours;
            playerObj.Sixes+=sixes;
            return;
        }
    }
        // if not exist
        let obj={
            Name:name,
            Runs:runs,
            Balls:balls,
            Fours:fours,
            Sixes:sixes
        }
        leaderBoard.push(obj);
    
}