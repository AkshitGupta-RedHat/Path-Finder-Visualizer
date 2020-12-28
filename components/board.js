
// let board= document.getElementById("board");
// let dynamic = [];
// // for(let i =0;i<100;i+10){
// //     for(let j =0;j<100;j+10){
// //         if(j==0){
// //         //    dynamic[i]=`<tr>`;
// //         }
// //         else if (j==window.innerWidth-1){
// //         //    dynamic[i][j]=`</tr>`;
// //         }
// //         else {
// //         //    dynamic[i][i]=`<td>>h1>aa</h1></td>`;
// //         }
// //     }
// // }
// board.innerHTML =`<tr><td></td></tr>`;
// var board = document.getElementById('chessContainer');
// var screenWidth = screen.width*.95;
// var screenHeight = screen.height*.70;
// console.log(screenHeight) //540;
// console.log(screenWidth) //1216;
// board.style.width = screenWidth;
// board.style.height = screenHeight;
// //board.style.gridTemplateColumns = repeat(12);
// for(i =0;i<screenHeight/21;i++){
//     for(j=0;j<screenWidth/47;j++){
//         let box1 = document.createElement('div');
//         box1.style.border = '1px solid black';
//         board.appendChild(box1);
//     }
  
// }

var screenWidth = screen.width*.95;
var numOfRow = screen.height*.70/21;
var numOfCol = screen.width/20;
var tbody = document.getElementById('tbody');



for (i =0 ;i<numOfRow;i++){
    var tr = document.createElement("tr");
    for (j=0;j<numOfCol;j++){
        var td = document.createElement("td");
        
td.style.height= 20;
td.style.width= 20;
        tr.appendChild(td);
    }   
    tbody.appendChild(tr);
}



 
 

