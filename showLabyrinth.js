var field = 

[[{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false}],[{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false}],[{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false}],[{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false}],[{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false}],[{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false}],[{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false}],[{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false}],[{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":false,"lock":false},{"wall":true,"lock":false}],[{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false},{"wall":true,"lock":false}]];


function printField(field){
	var mainDiv = document.querySelector(".main");
	field.forEach(function(line){
		var elemDiv = document.createElement("div");
		line.forEach(function(cell){
			craeteCell(cell,elemDiv);
  		});
    	mainDiv.appendChild(elemDiv);
	});
};

function craeteCell(string,elemDiv){
	var elemSpan = document.createElement("span");
    string.elem = elemSpan;
	elemSpan.classList.add("elemSpan");
    if(string.wall){
    	elemSpan.classList.add("wallTrue");
    }else{
    	elemSpan.classList.add("wallFalse");
    };
    elemDiv.appendChild(elemSpan);
}
printField(field);