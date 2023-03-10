class SplitViewPercentage {
  
  _leftState = 50;
  _rightState = 50;
  _template = undefined;

  onKey(percentageChange) {
    //var res = $("div").filter(function() {
    //  return $(this).css('width').includes("calc");
    //}).toArray();
    //
    //console.log(res);
    // todo - move top bar
    
    var left = $("#ws-left").get(0);
    var right = $("#ws-right").get(0);

    if (left === undefined || right === undefined) {
      stLog("cannot set sides percentage, only 1 view is opened");
      return;
    }
    
    if (this._leftState === 10 && this._rightState === 90 && percentageChange == -10) return;
    if (this._leftState === 90 && this._rightState === 10 && percentageChange == 10) return;

    this._leftState += percentageChange;
    this._rightState -= percentageChange;

    this.onChange();
  }

  onChange() {
    var left = $("#ws-left").get(0);
    var right = $("#ws-right").get(0);

    if (left === undefined || right === undefined) return;
    if (this._template === undefined) {
      this._template = left.style.width.replace("50%", "_state_%");
    }

    left.style.width = this._template.replace("_state_", this._leftState);
    right.style.width = this._template.replace("_state_", this._rightState);
  }
}