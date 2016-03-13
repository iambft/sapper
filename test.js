describe("ifMoreOneRoute", function() {
   it("выбирает направление - если доступного пути вправо нет", function() {
    assert.equal(ifMoreOneRoute([0,2], 1), 2);
  });
    it("выбирает направление - если доступного пути влево нет", function() {
    assert.equal(ifMoreOneRoute([2,3], 0), 2||3);
  });
     it("выбирает направление - если доступного пути вверх нет", function() {
    assert.equal(ifMoreOneRoute([0,3], 2), 0);
  });
      it("выбирает направление - если доступного пути вниз нет", function() {
    assert.equal(ifMoreOneRoute([2,0], 3), 0);
  });
});

describe("ifRouteFree", function() {
  it("выбирает направление - шел вправо и свободно вправо идет дальше вправо", function() {
    assert.equal(ifRouteFree([0,1,2,3], 1), 1);
  });
  it("выбирает направление - шел влево и свободно влево идет дальше влево", function() {
    assert.equal(ifRouteFree([0,1,2,3], 0), 0);
  });
  it("выбирает направление - шел вверх и свободно вверх идет дальше вверх", function() {
    assert.equal(ifRouteFree([0,1,2,3], 3), 3);
  });
  it("выбирает направление - шел вниз и свободно вниз идет дальше вниз", function() {
    assert.equal(ifRouteFree([0,1,2,3], 3), 3);
  });
});


describe("wallAround", function() {
  it("проверка правильности проверки заблокированных ячеек по кол-ву", function() {
    assert.equal(wallAround(3,1)[1], 2);
    assert.equal(wallAround(8,1)[1], 1);
    assert.equal(wallAround(7,3)[1], 3);
  });
});

describe("wallAroundSum", function() {
  it("проверка правильности подсчета кол-ва true в массиве", function() {
    assert.equal(wallAroundSum([true,false,true]), 2);
    assert.equal(wallAroundSum([false,false,false,true]), 1);
    assert.equal(wallAroundSum([true,true,true,false]), 3);
  });
});

describe("finishPositionShow", function() {
  it("проверка прорисовки финиша", function() {
  	var fin = finishPosition();
  //	finishPositionShow(fin);
    assert(field[fin[1]][fin[0]].elem.classList.contains("finishCell"));
  });
});