
var screenWidth = screen.width * .95;
var numOfRow = screen.height * .70 / 21;
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


function startbutton() {
    isStartClicked = true;
    isTargetClicked = false;
}

function targetbutton() {
    isStartClicked = false;
    isTargetClicked = true;
}
function mouseDown(e) {
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
    else {
        return;
    }
}





var select = document.getElementsByClassName("start");
anime({
    targets: [select, '.mixed-array-demo .el-02', '.mixed-array-demo .el-03'],
    translateX: 250
});
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
    var text = document.createTextNode(0);
    document.getElementById(root).appendChild(text);
    var target = tar.item(0).id;
    console.log("target", target);



    for (let item of queue) {
        var rootDistance = parseInt(document.getElementById(item).textContent);
        rootDistance++;
        for (var i = 0; i < 4; i++) {
            var visited = document.getElementById(adjacencyMatrix[item][i]);
            if (adjacencyMatrix[item][i] != 0 && adjacencyMatrix[item][i] != null && adjacencyMatrix[item][i] != target && document.getElementById(adjacencyMatrix[item][i]).className != "visited") {
                queue.add(adjacencyMatrix[item][i]);
                visited.setAttribute("class", "visited");
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
                text = document.createTextNode(rootDistance);
                visited.appendChild(text);
                console.log("que", item);
            }
            else if (adjacencyMatrix[item][i] == target) {
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
                backTrace(item, root);
                displayPath();
                return;
            }
        }



        console.log("outside inner loop");
    }



}

function backTrace(id, root) {
    let stack = [id];
    let path;

    for (var i = 0; i < stack.length; i++) {
        path = document.getElementById(stack[i]);
        //  path.setAttribute("class", "backtrace");

        if (stack[i] == root) {
            console.log("reached root");
            pathColor(stack);
            return;
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
    for (var i = stack.length - 1; i >= 0; i--) {
        node = document.getElementById(stack[i]);
        node.setAttribute("class", "backtrace");
    }
    return;
}

function displayPath() {
    let visitedNodes = document.querySelectorAll("td.visited");

    let paths = document.querySelectorAll("td.backtrace");
    let num = 0;
    visitedNodes.forEach(visitedNode => {
        setTimeout(() => {
            visitedNode.style.backgroundColor = 'purple';
        }, num += 200);
    })
    num = 0;
    paths.forEach(path => {
        setTimeout(() => {
            path.style.backgroundColor = 'yellow';
        }, num += 200);
    })
    //    anime({
    //        targets:".visited",
    //        scale: [
    //         {value: .1, easing: 'easeOutSine', duration: 500},
    //         {value: 1, easing: 'easeInOutQuad', duration: 1200}
    //       ],
    //       delay: anime.stagger(200, {grid: [numOfCol, numOfRow], from: 'center'})
    //    })
}
