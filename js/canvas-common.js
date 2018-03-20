let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
/*let canvasDraft2 = document.getElementById('canvas-draft2');
let contextDraft2 = nvasDraft2.getContext('2d');*/
// let currentFunction, canva_log ;
let dragging = false;
let left = false;

function desktopMode(){
    $('#canvas-draft').mousedown(function(e){
        console.log(this.offsetTop);
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        console.log(`Mouse position is - x: ${e.pageX}, y: ${e.pageY}`)
        currentFunction.onMouseDown([mouseX,mouseY],e);
        dragging = true;
    });
    $('#canvas-draft').mousemove(function(e){
        if(dragging){
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop;
            currentFunction.onDragging([mouseX,mouseY],e);
            left = false;
        }
        currentFunction.onMouseMove(e,this);
    });
    $('#canvas-draft').mouseup(function(e){
        console.log('Mouse is up!');
        dragging = false;
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.onMouseUp([mouseX,mouseY],e);
    });
    $('#canvas-draft').mouseleave(function(e){
        if(dragging){
            let mouseX = e.pageX - this.offsetLeft;
            let mouseY = e.pageY - this.offsetTop;
            currentFunction.onMouseLeave([mouseX,mouseY],e);
        }
        left = true;
    });
    $('#canvas-draft').mouseenter(function(e){
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        currentFunction.onMouseEnter([mouseX,mouseY],e);
    });

    $(window).keypress(function(e) {
        let mouseX = e.pageX - this.offsetLeft;
        let mouseY = e.pageY - this.offsetTop;
        if(e.which == 13) {
        currentFunction.onEnterPress([mouseX,mouseY],e);
        }   
    })

    //load on Cancel is the mouse is up while outside of the canvas
    $(window).mouseup(function(e){
        console.log(e.target.id);
        if ((left && dragging) || ((e.target.id == 'drawing-line-smooth') || (e.target.id == 'e-edge') || 
            (e.target.id == 'board-edge') || (e.target.id == 'draw-s-line3') || (e.target.id == 'quad-curve') ||
            (e.target.id == 'bezier-curve') || (e.target.id == 'drawing-rectangle2') || (e.target.id == 'drawing-circle2') ||
            (e.target.id == 'drawing-ellipse') || (e.target.id == 'insert-text') || (e.target.id == 'eraser') || (e.target.id == 'download') ||
            (e.target.id == 'redo') || (e.target.id == 'selector') || (e.target.id == 'drawing-line-smooth-mobile') || (e.target.id == 'e-edge-mobile') || 
            (e.target.id == 'board-edge-mobile') || (e.target.id == 'draw-s-line3-mobile') || (e.target.id == 'quad-curve-mobile') ||
            (e.target.id == 'bezier-curve-mobile') || (e.target.id == 'drawing-rectangle2-mobile') || (e.target.id == 'drawing-circle2-mobile') ||
            (e.target.id == 'drawing-ellipse-mobile') || (e.target.id == 'insert-text-mobile') || (e.target.id == 'eraser-mobile') ||
            (e.target.id == 'redo-mobile') || (e.target.id == 'selector-mobile') || (e.target.id == 'download-mobile') && (e.target.id != '') )){
            console.log(e.target.id);
            left = false;
            dragging = false;
            currentFunction.onCancel();
            //reset the slider value
            if (e.target.id != 'input-box'){
                $('#size-slider').slider({value: 3});
                $("#size_field").text(3);
                $("#size_field").val(3);
                $('#rotate-slider').slider({value: 0});
                $("#rotate_field").text(0);
                $("#rotate_field").val(0);
                $('#rotate-slider-mobile').slider({value: 0});
                $("#rotate_field_mobile").text(0);
                $("#rotate_field_mobile").val(0);
            }
        }
    });
}

/*control points event
$('.control_pt').mousedown(function(e){
    let mouseX = e.currentTarget.offsetLeft - $('#canvas-draft2').offset().left;
    let mouseY = e.currentTarget.offsetTop - $('#canvas-draft2').offset().top;
    dragging = true;
    currentFunction.onMouseDown([mouseX,mouseY],e);
});
$('.control_pt').mousemove(function(e){
    if(dragging){
        console.log(e);
        let mouseX = e.currentTarget.offsetLeft - $('#canvas-draft2').offset().left;
        let mouseY = e.currentTarget.offsetTop - $('#canvas-draft2').offset().top;
        currentFunction.onDragging([mouseX,mouseY],e);
    }
    currentFunction.onMouseMove(e,this);
});
$('.control_pt').mouseup(function(e){
    let mouseX = e.currentTarget.offsetLeft - $('#canvas-draft2').offset().left;
    let mouseY = e.currentTarget.offsetTop - $('#canvas-draft2').offset().top;
    dragging = false;
    currentFunction.onMouseDown([mouseX,mouseY],e);
});
$('#finish').click(function(e){
    currentFunction.onFinish();
});*/
$('#cancel').click(function(e){
    currentFunction.onCancel();
    dragging = false;
    //reset the slider value
    $('#size-slider').slider({value: 3});
    $("#size_field").text(3);
    $("#size_field").val(3);
    $('#rotate-slider').slider({value: 0});
    $("#rotate_field").text(0);
    $("#rotate_field").val(0);
});

$('#print, #print-mobile').click(function(e){
    currentFunction.onPrint();
});

function mobileMode(){
    var hammertime = new Hammer(canvasDraft);
    hammertime.on('drag swipe tap press pan panup pandown', function(ev) {
    //console.log(ev.type);
    });
    /*
        hammertime.on('tap',function(ev){
            let mouseX = ev.center.x - canvasDraft.offsetLeft;
            let mouseY = ev.center.y - canvasDraft.offsetTop;
            currentFunction.onMouseDown([mouseX,mouseY],ev);
            //console.log(mouseX+":"+mouseY + ":"+ev.center.x + ","+ev.center.y);
        })*/
    hammertime.on('panstart',function(ev){
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop;
        currentFunction.onMouseDown([mouseX,mouseY],ev);
        dragging = true;
        //console.log(mouseX+":"+mouseY + ":"+ev.center.x + ","+ev.center.y);
    })
    hammertime.on('panmove',function(ev){
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop;
        currentFunction.onDragging([mouseX,mouseY],ev);
    // currentFunction.onMouseMove([mouseX,mouseY],ev);
    // console.log("panmove");
    });
    hammertime.on('panend',function(ev){
        let mouseX = ev.center.x - canvasDraft.offsetLeft;
        let mouseY = ev.center.y - canvasDraft.offsetTop;
        currentFunction.onMouseUp([mouseX,mouseY],ev);
    // console.log("panend");
    });
}

$(document).ready(function(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width()<768) {
        mobileMode();
    }
    else if ($(window).width()>767){
        desktopMode();
    }
});

class PaintFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
    //additional functionality
    //onFinish(){}
    onCancel(){}
    onChange(){}
    onPrint(){}
    onRotate(){}
    onEnterPress(){}
    onColorChange(){}
}    