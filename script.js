table.addEventListener('click', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'div') {
        processButtonClick(evt.target);
    };
});

table.addEventListener('contextmenu', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'div') {
        evt.preventDefault();
        processButtonClickRight(evt.target);
    };
});

startButton.addEventListener('click', matrixData);

infoButton.addEventListener('click', info);

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

function reload() {
    location.reload(false);
};

function info(){
	alert("Левая кнопка мыши открывает ячейки, правая маркирует. Нужно поставить маркер на все бомбы.");
};

function cellObj(table) {
    var self = this;
    this.positionId;
    this.bomb = false;
    this.open = false;
    this.iThink = false;
    this.elem = null;
    this.create = function (a, b) {
        var newDiv = document.createElement("div");
        newDiv.classList.add("cell");
        newDiv.id = "m" + a + "." + b;
        table.appendChild(newDiv);
        self.elem = newDiv;
    };
};

function setFieldSize(){
	var size = (width + 1) * 22;
	document.getElementById('table').style.width = size + "px";
	document.getElementById('table').style.height = size + "px";
	if(size > 450){
		document.getElementById('begin').style.width = size + "px";
	};
};

function dontEnterSize(){
	matrixSize.disabled = true;
	matrixBomb.disabled = true;
	startButton.disabled = true;
};

function matrix() {
    var matrix = [],
    	table = document.getElementById('table');
    for (var i = 0; i <= width; i++) {
        matrix[i] = [];
        for (var j = 0; j <= height; j++) {
            matrix[i][j] = new cellObj(table);
            matrix[i][j].create(i, j);
        };
    };
    return matrix;
};

function matrixData(){
	height = +document.getElementById("matrixSize").value -1;
	width = +document.getElementById("matrixSize").value -1;
	bomb = +document.getElementById("matrixBomb").value;
	if(!isNumeric(height)||!isNumeric(bomb)){
		alert("Вы ввели не число");
		reload();
	}else{
		if((height+1)*(width+1) >= bomb){
			setFieldSize(); 
			dontEnterSize();
			bombMatrix = matrix();	
			bombPosition();
		}else{
			alert("Бомб не может быть больше количества ячеек");
			reload();
		};
	};
};

function getPositionDiv(elem){
	var arr = elem.id.slice(1,elem.id.length).split(".");
	arr[0] = +arr[0];
	arr[1] = +arr[1];
	return arr;
};

function openCell(item) {
    if (!item.open) {
		item.elem.click();
    };
};

function processButtonClick(element) {
    element.classList.add("near");
	var takeIJs = getPositionDiv(element),
	 	i = +takeIJs[0],
     	j = +takeIJs[1],
     	surCellsArr = getSurroundCells(i, j),
     	bombAround = getBombSurroundSum(i, j, surCellsArr);
	if (bombMatrix[i][j].iThink){
		bombMatrix[i][j].iThink = false;
		element.classList.remove("flag");
	} else {
		if (bombMatrix[i][j].bomb) {
       		gameOver(element);
    	} else {
        	doOpenCell(i, j, element, bombAround, surCellsArr);
    	};	
	};	    
};

function processButtonClickRight(element) {
    var takeIJs = getPositionDiv(element),
		i = +takeIJs[0],
    	j = +takeIJs[1];
    if (!bombMatrix[i][j].open) {
        if (!bombMatrix[i][j].iThink) {
            bombMatrix[i][j].iThink = true;
            element.classList.add("flag");
        } else {
            bombMatrix[i][j].iThink = false;
            element.classList.remove("flag");
        };
    };
    winYouInspect();
};

function doOpenCell(i, j, elem, bombSur, surCellsArr){
	if (bombSur === 0) {
            elem.classList.add("empty");
           surCellsArr.forEach(openCell); 
        };
    bombMatrix[i][j].open = true;
    elem.innerHTML = "<div class=\"bombAroundText\">" + bombSur + "</div>";
};

function winYouInspect(){
	if (isBombPositionTrue()) {
        alert('YOU WIN');
        reload();
    };
};

function gameOver(element){
	element.classList.add("bomb");
    alert("GAME OVER");
    reload();
};

function bombPosition() {
    for (var b = 0; b < bomb; b++) {
        function bombOne() {
            var i = random(0, height);
            var j = random(0, width);
            if (bombMatrix[i][j].bomb) {
                bombOne();
            } else {
                bombMatrix[i][j].bomb = true;
            };
        };
        bombOne();
    };
};

function isBombPositionTrue() {
    var arr = bombMatrix.reduce(function (a, b) {
        return a.concat(b);
    });
	var sumBombFlaf = arr.filter(function(a){
		return a.iThink;
	});
	if(bomb === sumBombFlaf.length){ 
		var bombArr = arr.filter(function (a) {
			return a.bomb;
		});
		return bombArr.every(function (a) {
			return a.bomb === a.iThink;
		});
	};
};

function getSurroundCells(i, j) {
    var arr = [];
    for (var a = i - 1; a <= i + 1; a++) {
        for (var b = j - 1; b <= j + 1; b++) {
            if (a >= 0 && a <= width && b >= 0 && b <= height) {
                if (!(a === i && b === j)){
                    arr.push(bombMatrix[a][b]);
                };
            };
        };
    };
    return arr;
};

function getBombSurroundSum(i, j,surCellsArr) {
    return surCellsArr.filter(function (elem) {
        return elem.bomb === true;
    }).length;
};


var height,
	width,
	bomb,
    bombMatrix;