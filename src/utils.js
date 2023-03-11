function doOverlap(domRect1, domRect2, margin = 2) {
  var l1 = {
    x: domRect1.x - margin,
    y: domRect1.y + domRect1.height
  };
  var r1 = {
    x: domRect1.x + domRect1.width + margin,
    y: domRect1.y + domRect1.height - domRect1.height
  };
  var l2 = {
    x: domRect2.x - margin,
    y: domRect2.y + domRect2.height
  };
  var r2 = {
    x: domRect2.x + domRect2.width + margin,
    y: domRect2.y + domRect2.height - domRect2.height
  };
  if (l1.x == r1.x || l1.y == r1.y || l2.x == r2.x || l2.y == r2.y ||
    l1.x >= r2.x || l2.x >= r1.x || r1.y >= l2.y || r2.y >= l1.y) return false;
  return true;
}