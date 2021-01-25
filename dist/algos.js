

var screenWidth = screen.width * .95;
var numOfRow = screen.height *.8 / 21;
var numOfCol = screen.width / 20;
var tbody = document.getElementById('tbody');
var selection = null;
var strClickCounter = 0;
var tarClickCounter = 0;
var adjacencyMatrix = [];
var isStartClicked = false;
var isTargetClicked = false;

for (i = 0; i < numOfRow; i++) {
    var tr = document.createElement("tr");
    tr.setAttribute("id", Math.random() * 10000);
    for (j = 0; j < numOfCol; j++) {
        var td = document.createElement("td");
        td.setAttribute("id", Math.random() * 100000);
        td.setAttribute("onmousedown", "mouseDown(this.id)");   
       // td.setAttribute("onmousedown","mouseDn(this.id)");
        td.setAttribute("onmouseup","mouseUp()");
        td.setAttribute("onmousemove","mouseMove(this.id)");
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
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id, row.cells[j - 1].id, table.rows[i - 1].cells[j].id, table.rows[i + 1].cells[j].id];
        }
        else if (table.rows[i - 1] == undefined && row.cells[j - 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id, 0, 0, table.rows[i + 1].cells[j].id];
        }
        else if (table.rows[i - 1] == undefined && row.cells[j + 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [0, row.cells[j - 1].id, 0, table.rows[i + 1].cells[j].id];
        }
        else if (table.rows[i - 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id, row.cells[j - 1].id, 0, table.rows[i + 1].cells[j].id];
        }

        else if (table.rows[i + 1] == undefined && row.cells[j - 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id, 0, table.rows[i - 1].cells[j].id, 0];
        }
        else if (table.rows[i + 1] == undefined && row.cells[j + 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [0, row.cells[j - 1].id, table.rows[i - 1].cells[j].id, 0];
        }
        else if (table.rows[i + 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id, row.cells[j - 1].id, , table.rows[i - 1].cells[j].id, 0];
        }
        else if (row.cells[j - 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [row.cells[j + 1].id, 0, table.rows[i - 1].cells[j].id, table.rows[i + 1].cells[j].id];
        }
        else if (row.cells[j + 1] == undefined) {
            adjacencyMatrix[row.cells[j].id] = [0, row.cells[j - 1].id, table.rows[i - 1].cells[j].id, table.rows[i + 1].cells[j].id];
        }
    }
}
console.log("Mat", adjacencyMatrix);

var isMouseDown = false;
function startbutton() {
    isStartClicked = true;
    isTargetClicked = false;
}

function targetbutton() {
    isStartClicked = false;
    isTargetClicked = true;
}
function bombbutton(){
    isBombClicked = true;
}

function mouseUp(){
    isMouseDown = false;
}
function mouseMove(e){
    console.log("mousemove", isMouseDown,e);

    

        selection = e;
        var selectedEle = document.getElementById(selection);
         if( isMouseDown==true&&isBombClicked == true 
            && !selectedEle.classList.contains("start") && !selectedEle.classList.contains("target") && !selectedEle.classList.contains("bomb")){
           selectedEle.style.background = 'yellow';
           selectedEle.setAttribute("class", "bomb");
        }
}

function mouseDown(e) {
    console.log("mousedown",e)
    selection = e;
    var selectedEle = document.getElementById(selection);
    if (isStartClicked == true && strClickCounter == 0) {
        isStartClicked = false;
        strClickCounter++;
        selectedEle.style.background = 'green';
        selectedEle.setAttribute("class", "start fas fa-angle-right");
    }
    else if (isTargetClicked == true && tarClickCounter == 0) {
        tarClickCounter++;
        isTargetClicked = false;
        selectedEle.style.background = 'red';
        selectedEle.setAttribute("class", "target far fa-dot-circle");
        tarClickCounter++;
    }
 
     else if(isBombClicked == true){
        isMouseDown = true;
    //     selectedEle.style.background = 'black';
    //     selectedEle.setAttribute("class", "bomb fas fa-bomb");
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
    if (select.item(0) == null || tar.item(0) == null) {
        return;
    }
    strClickCounter = 0;
    tarClickCounter = 0;
    console.log("dik", select.item(0).id, tar.item(0).id);
    var queue = new Set();
    var root = select.item(0).id;
    queue.add(root);
    var rtElement = document.getElementById(root);
    rtElement.setAttribute("rtDis",0);
    rtElement.classList +=" visited";
    var target = tar.item(0).id;
    console.log("target", target);



    for (let item of queue) {
        var rootDistance = parseInt(document.getElementById(item).getAttribute('rtDis'));
        rootDistance++;
        for (var i = 0; i < 4; i++) {
            var visited = document.getElementById(adjacencyMatrix[item][i]);
            var current = adjacencyMatrix[item][i];
            if (current != 0 && current != null && current != target && !document.getElementById(current).classList.contains("visited") && !document.getElementById(current).classList.contains("bomb")) {
                queue.add(adjacencyMatrix[item][i]);
                visited.classList +="visited";
                if (i == 0) {
                    visited.setAttribute("path", "rt");
                }
                else if (i == 1) {
                    visited.setAttribute("path", "lt");
                }
                else if (i == 2) {
                    visited.setAttribute("path", "up");
                }
                else {
                    visited.setAttribute("path", "down");
                }
               // text = document.createTextNode(rootDistance);
                visited.setAttribute("rtDis",rootDistance);
                console.log("que", item);
            }
            else if (adjacencyMatrix[item][i] == target) {
                queue.add(adjacencyMatrix[item][i]);
                if (i == 0) {
                    visited.setAttribute("path", "rt");
                }
                else if (i == 1) {
                    visited.setAttribute("path", "lt");
                }
                else if (i == 2) {
                    visited.setAttribute("path", "up");
                }
                else {
                    visited.setAttribute("path", "down");
                }
                console.log("Reached target", rootDistance);
                backTrace(target, root, queue);

                return;
            }
        }
        console.log("outside inner loop");
    }
}

function backTrace(id, root, queue) {
    var stack = [id];
    let path;

    for (var i = 0; i < stack.length; i++) {
        path = document.getElementById(stack[i]);
        if (stack[i] == root) {
            console.log("reached root");
            pathColor(stack);
            displayTraversal(queue,stack,root);
        }
        else if (path.getAttribute('path') == "down") {
            stack.push(adjacencyMatrix[stack[i]][2]);
        }
        else if (path.getAttribute('path') == "rt") {
            stack.push(adjacencyMatrix[stack[i]][1]);
        }
        else if (path.getAttribute('path') == "lt") {
            stack.push(adjacencyMatrix[stack[i]][0]);
        }
        else if (path.getAttribute('path') == "up") {
            stack.push(adjacencyMatrix[stack[i]][3]);
        }

        console.log(path.getAttribute('path'));

    }
}
function pathColor(stack) {
    let node;
    for (var i = stack.length - 2; i > 0; i--) {
        node = document.getElementById(stack[i]);
        node.setAttribute("class", "backtrace");
    }
    return stack;
}

function displayTraversal(queue,stack,root) {
    let num = 0;
    queue.delete(root);
    for (let item of queue) {
        setTimeout(function () {
            let node = document.getElementById(item);
            node.style.backgroundColor = 'blue';
            if(stack[0]==item){
                displayPath(stack);
            }
        }, num += 30)
    }
    return;
    //Test Code--------------------------------------
    // const array = [0, 1, 2, 4, 8, 16, 32, 16, 8, 4, 2, 1, 0];

    // for (let i = 0; i < array.length; i++) {
    //     setTimeout(function () {
    //         console.log("delay",array[i]);
    //     }, array[i] * 5000)
    // }
}


function displayPath(stack) {
   let num = 0;


    for (let i = stack.length-1; i >=0; i--) {
        setTimeout(function () {
            let path = document.getElementById(stack[i]);
            path.style.backgroundColor = 'green';;
        }, num += 100)
    }
    return;
}
