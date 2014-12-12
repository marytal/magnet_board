function SideBar(element, x, id, mouseX){

  var size_status = $(element).data('size')
  if ((size_status == "false" || !size_status) && mouseX < 175){
    $(element).data('size', true);
    
    $.post('/magnets/' + id, {size_status: true});

    element.style['-webkit-transform'] = "scale(0.3)";
    // $("element").addClass("shrunk");

  } else if ((size_status == "true" || size_status || element.className == "magnet shrunk") && mouseX >= 175) {
    $(element).data('size', false);
    
    $.post('/magnets/' + id, {size_status: false});


    element.style['-webkit-transform'] = "scale(1)";
    element.className = "magnet";

  }
}

function onArrowClick(element, arrow, direction, id) {

  var new_y = 0;

  var interval = setInterval (function() {
    var y_field = parseInt(element.style.top) || 0;
    console.log(direction);
    if(direction == "arrow_down") {
      new_y = y_field + 1;
      console.log('down');
    } else {
      new_y = y_field - 1;
      console.log('up');
    }
    var stringval = new_y + "px";
    element.style.top = stringval;


  });

  var removeInterval = function() {
    console.log('mouseup')
    clearInterval(interval);
    arrow.removeEventListener('mouseup', removeInterval);
    y_diff = parseInt(element.style.top);
    if(id){
      $.post('/magnets/' + id, {y: y_diff});
    }
  
  }

  arrow.addEventListener('mouseup', removeInterval);
}

function removeMagnetOnRightClick(magnet, element) {

  var id = magnet.id;
  element.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    $.get('/remove/' + id);
    element.src ="http://www.foiledagainchocolate.com/sites/all/themes/foiledagain/images/poof.png";
    setTimeout(function() {
      element.remove();
    }, 1000)
  }, false);

}

function linkMagnetWithArrowClick(magnet, element) {
  var id = magnet.id;
  var arrow_up = document.getElementById('arrow_up');
  var arrow_down = document.getElementById('arrow_down');

  arrow_up.addEventListener('mousedown', function(event) {
    if (event.button != 0){
    return;
    };
    onArrowClick(element, arrow_up, "arrow_up", id);
  });

  arrow_down.addEventListener('mousedown', function(event) {
    if (event.button != 0){
    return;
    };
    onArrowClick(element, arrow_down, "arrow_down", id);
  })
}

function renderMagnet(magnet) {
  var element = document.createElement('img');
  element.src = magnet.url;
  element.className = 'magnet';
  console.log(magnet);
  element.style.top = magnet.y + "px";
  element.style.left = magnet.x + "px";
  if (magnet.size_status == true) {
    element.className = 'magnet shrunk';
  }
  var magnetsContainer = document.getElementById('magnets');
  magnetsContainer.appendChild(element);

  linkMagnetWithArrowClick(magnet, element);
  removeMagnetOnRightClick(magnet, element);

  whenElementDropped(element, function(x,y, mouseX, mouseY) {
    $.post('/magnets/' + magnet.id, {x: x, y: y});
    SideBar(element, x, magnet.id, mouseX);
  });
}