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

function SideBar(element, x, id, mouseX){

  var size_status = $(element).data('size')
  if ((size_status == "false" || !size_status) && mouseX < 175){
    console.log('get smaller!');
    $(element).data('size', true);
    
    $.post('/magnets/' + id, {size_status: true});

    element.style['-webkit-transform'] = "scale(0.3)";
    //$("element").addClass("shrunk");

  } else if ((size_status == "true" || size_status) && mouseX >= 175) {
    console.log('get larger!');
    $(element).data('size', false);
    
    $.post('/magnets/' + id, {size_status: false});

    element.style['-webkit-transform'] = "scale(1)";

  }
}

function UpOrDown(element, arrow, event, direction, id) {

  if (event.button != 0){
    return;
  };

  var myVar = setInterval (function() {
    var x1 = parseInt(element.style.top) || 0;
    if(direction == "arrow_down") {
      var x2 = x1 + 1;
    } else {
      var x2 = x1 - 1;
    }
    var stringval = x2 + "px";
    element.style.top = stringval;


  });

  var removeInterval = function() {
    console.log('mouseup')
    clearInterval(myVar);
    arrow.removeEventListener('mouseup', removeInterval);
    y_diff = parseInt(element.style.top);
    $.post('/magnets/' + id, {y: y_diff});

  
  }

  arrow.addEventListener('mouseup', removeInterval);


}


