function whenElementDropped(element, onDropped) {
  function startDrag(e) {
    if(e.button != 0) return; // only respond to left click
    var draggingElement = e.target;

    var offsetX = e.clientX;
    var offsetY = e.clientY;

    var coordX = parseInt(draggingElement.style.left) || 0;
    var coordY = parseInt(draggingElement.style.top) || 0;

    var mousemove = function(_e) {
      draggingElement.style.left=coordX+_e.clientX-offsetX+'px';
      draggingElement.style.top=coordY+_e.clientY-offsetY+'px';
    }

    var mouseup = function(e) {
      document.removeEventListener('mouseup', mouseup);
      document.removeEventListener('mousemove', mousemove);
      if(onDropped)
        onDropped(parseInt(draggingElement.style.left), parseInt(draggingElement.style.top), e.pageX, e.pageY);
    };
    
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    e.preventDefault()
  }
  element.addEventListener('mousedown', startDrag)
}
