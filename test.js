
describe("getPositionDiv", function() {
  it(" читает id и создает массив", function() {
    var divEl = document.createElement("div");
    divEl.id = "m0.3";
    assert.equal(getPositionDiv(divEl)[0],0);
    assert.equal(getPositionDiv(divEl)[1],3);
    });
});
