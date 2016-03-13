function run(){
	var xStart = 3,
		yStart = 1,
		xFin = 1,
		yFin = 0;
	position(xStart,yStart,xStart,yStart);
	finishPositionShow(finishPosition());
	choiceRoute(xStart,yStart);
};

function finishPosition(){
	var xFin = 1,
		yFin = 0;
	return [xFin,yFin];
};

function finishPositionShow(finPos){
	field[finPos[1]][finPos[0]].elem.classList.add("finishCell");
};

function position(x,y,x1,y1){
	field[y][x].elem.classList.remove("currentCell");
	field[y1][x1].elem.classList.add("currentCell");
};

function choiceRoute(x,y, direct){
	var routeArr = [],
		route = null;
	routeArr = choiceRouteWOWall(x,y,routeArr);
	if(ifNotFinish(x,y)){
		ifNotFinishDo(x,y,routeArr,route,direct);
	}else{
		alert("finish");
	};
};

function ifNotFinishDo(x,y,routeArr,route,direct){
	if(routeArr.length > 1){
			route =  ifMoreOneRoute(routeArr,direct);
		}else{
 			route = ifOnlyRoute(x,y,routeArr);
		};
		setRoute(x,y,route);
};

function ifNotFinish(x,y){
	var finPos = finishPosition();
	return x === finPos[0] && y === finPos[1]?false:true;
};

function choiceRouteWOWall(x,y,arr){
	wallAround(x,y)[0].forEach(function(item,i){
		if(item){
	   		arr.push(i);
   		};
	});
	return arr;
};

function ifOnlyRoute(x,y,routeArr){
 	field[y][x].lock = true;
 	return routeArr[0];
};

function ifMoreOneRoute(routeArr,direct){	
		// допилить счетчик на элементы, где меньше счет туда в первую очередь
		// проверяет доступно ли предыдущее направление если да то идет дальше
		// а вот если нет удаляет из доступных направление назад -  чтоб туда сюда не ходил
		// на элемент нужно повесить счеткик наездов и выбирать направление там где их меньше
	var route =  ifRouteFree(routeArr,direct);	
	if(route === null){	
		if(direct === 0){											
			routeArr.splice(routeArr.indexOf(1), 1);
		};
		if(direct === 1){
			routeArr.splice(routeArr.indexOf(0), 1);
		};
		if(direct === 2){
			routeArr.splice(routeArr.indexOf(3), 1);
		};
		if(direct === 3){
			routeArr.splice(routeArr.indexOf(2), 1);
		};
		var rand = Math.floor(Math.random() * routeArr.length);
		route = routeArr[rand];
	}
	return route;  	
};

function ifRouteFree(routeArr,direct){
	var route = null;
	routeArr.forEach(function(item){
		if(item === direct){
			route = direct;
		}
	});
	return route;
};

function setRoute(x,y,route){
	setTimeout(function(){
   		switch (route) {
		case 0:
			moveLeft(x,y);
			break;
		case 1:
			moveRight(x,y);
			break;
		case 2:
			moveUp(x,y);
			break;
		case 3:
			moveDown(x,y);
			break;
		default:
			console.log("route error");
		};
	},500);
};


function doStep(xNow,yNow,xNext,yNext,direct){
  	if(wallAround(xNow,yNow)[0][direct]){
   		position(xNow,yNow,xNext,yNext);
   		choiceRoute(xNext,yNext,direct);
	}else{
   		choiceRoute(xNow,yNow,direct);
	}
};

function moveLeft(x,y){
	doStep(x,y,x-1,y,0);
};

function moveRight(x,y){
	doStep(x,y,x+1,y,1);
};

function moveUp(x,y){
	doStep(x,y,x,y-1,2);
};

function moveDown(x,y){
	doStep(x,y,x,y+1,3);
};

function wallAroundSum(routes){
	return routes.reduce(function(result,current){
		return current?result+1:result;
   	});
};
	
function wallAround(x,y){
	var left = x-1 < 0 || field[y][x-1].wall || field[y][x-1].lock?false:true,
		right = x+1 > field[0].length || field[y][x+1].wall || field[y][x+1].lock?false:true,			
		up = y-1 < 0 || field[y-1][x].wall || field[y-1][x].lock?false:true,
		down = y+1 > field.length || field[y+1][x].wall || field[y+1][x].lock?false:true,
		arr = [left,right,up,down];
	var trueSum = wallAroundSum(arr);
	return [arr,trueSum];
};

run();