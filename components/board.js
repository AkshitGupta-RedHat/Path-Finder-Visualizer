
var screenWidth = screen.width * .95;
var numOfRow = screen.height * .70 / 21;
var numOfCol = screen.width / 20;
var tbody = document.getElementById('tbody');
var selection = null;
var clickCounter = 0;
var adjacencyMatrix = [];


for (i = 0; i < numOfRow; i++) {
    var tr = document.createElement("tr");
    tr.setAttribute("id", Math.random() * 10000);
    for (j = 0; j < numOfCol; j++) {
        var td = document.createElement("td");
        td.setAttribute("id", Math.random() * 100000);
        td.setAttribute("onclick", "mouseDown(this.id)");
        td.style.height = 20;
        td.style.width = 20;
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
}
var table = document.getElementById("tableMain");



for (i = 0; i < numOfRow; i++) {
    var row = table.rows[i];
    for (j = 0; j < numOfCol; j++) {
        if (table.rows[i + 1] != undefined && row.cells[j + 1] != undefined && table.rows[i - 1] != undefined && row.cells[j - 1] != undefined) {
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id, row.cells[j - 1].id,table.rows[i - 1].cells[j].id, table.rows[i + 1].cells[j].id];
        }
        else if (table.rows[i - 1] == undefined && row.cells[j - 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id,0, 0, table.rows[i + 1].cells[j].id];
        }
        else if (table.rows[i - 1] == undefined && row.cells[j + 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [0,row.cells[j - 1].id, 0, table.rows[i + 1].cells[j].id];
        }
        else if (table.rows[i - 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id, row.cells[j - 1].id,0, table.rows[i + 1].cells[j].id];
        }

        else if (table.rows[i + 1] == undefined && row.cells[j - 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id,0,table.rows[i - 1].cells[j].id, 0];
        }
        else if (table.rows[i + 1] == undefined && row.cells[j + 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [0,row.cells[j - 1].id, table.rows[i - 1].cells[j].id, 0];
        }
        else if (table.rows[i + 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id,row.cells[j - 1].id, ,table.rows[i - 1].cells[j].id, 0];
        }
        else if (row.cells[j - 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id,0, table.rows[i - 1].cells[j].id, table.rows[i + 1].cells[j].id];
        }
        else if (row.cells[j + 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [0,row.cells[j - 1].id, table.rows[i - 1].cells[j].id, table.rows[i + 1].cells[j].id];
        }
    }
}
console.log("Mat", adjacencyMatrix);




function mouseDown(e) {
    selection = e;
    var selectedEle = document.getElementById(selection);
    if (clickCounter == 0) {
        selectedEle.style.background = 'green';
        selectedEle.setAttribute("class", "start");
        clickCounter++;
    }
    else if (clickCounter == 1) {
        selectedEle.style.background = 'red';
        selectedEle.setAttribute("class", "target");
        clickCounter++;
    }
    else {
        return;
    }
}





var select = document.getElementsByClassName("start");
var tar = document.getElementsByClassName("target");
console.log("se", select.inner);
console.log("se", tar);
var dikBut = document.getElementById("dikstra");

dikBut.setAttribute("onclick", "dikstra(select, tar)");
function dikstra(select, tar) {

    console.log("dik", select.item(0).id, tar.item(0).id);
    var queue = new Set();
    queue.add(select.item(0).id);
 var rightColCounter =0;
 var lefttColCounter =0;
 var upRowCounter =0;
 var downRowCounter =0;
    var target = tar.item(0).id;
    console.log("target", target);
    for (let item of queue) {
        for (var i = 0; i < 4; i++) {
            if(adjacencyMatrix[item][i]!=0 &&adjacencyMatrix[item][i]!=null && adjacencyMatrix[item][i]!=target){
                queue.add(adjacencyMatrix[item][i]);
                var visited = document.getElementById(adjacencyMatrix[item][i]);
                visited.setAttribute("class","visited");
                console.log("que",item);
            }
            else if(adjacencyMatrix[item][i]==target){
                console.log("Reached target");
                return;
            }
            
        }
      
        
    }
    console.log("out of loop");
}
console.log("out of function");