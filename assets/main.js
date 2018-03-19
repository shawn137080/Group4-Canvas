$(window).on('load', function(){

    let canvasCoverage = 0.8;
    let buttonboxWidth = $('#button-box').width();
    let pickerboxHeight = $('#picker-box').height();
    
    //Set the size for the canvas
    let canvas_width = ($(window).width()-buttonboxWidth)*canvasCoverage;
    let canvas_width_margin = ($(window).width()-buttonboxWidth)*(1-canvasCoverage)/2;
    let canvas_height_margin = ($(window).height()-pickerboxHeight)*(1-canvasCoverage)/2;
    let canvas_height = ($(window).height()-pickerboxHeight)*canvasCoverage;
    $( "#canvas-real" )[0].width = $( "#canvas-draft" )[0].width = canvas_width;
    $( "#canvas-real" )[0].height = $( "#canvas-draft" )[0].height = canvas_height;
    $( "#canvas-real" ).css({marginLeft: `${canvas_width_margin  + buttonboxWidth}px`, 
                             marginTop: `${canvas_height_margin + pickerboxHeight}px`});
    $( "#canvas-draft" ).css({marginLeft: `${canvas_width_margin  + buttonboxWidth}px`, 
                              marginTop: `${canvas_height_margin + pickerboxHeight}px`});
});

    $( document ).ready(function() {
    $('#drawing-rectangle').click(()=>{
    currentFunction = new DrawingRectangle(contextReal,contextDraft);
    });
    $('#drawing-rectangle-hollow').click(()=>{
    currentFunction = new DrawingRectangleHollow(contextReal,contextDraft);
    });
    $('#drawing-line').click(()=>{
    currentFunction = new DrawingLine(contextReal,contextDraft);
    });
    $('#drawing-ribbon').click(()=>{
    currentFunction = new DrawingRibbon(contextReal,contextDraft);
    }); 
    $('#eraser').click(()=>{
    currentFunction = new Eraser(contextReal,contextDraft);
    }); 
    $('#drawing-circle').click(()=>{
    currentFunction = new DrawingCircle (contextReal,contextDraft);
     });
     $('#drawing-circle-hollow').click(()=>{
    currentFunction = new DrawingCircleHollow (contextReal,contextDraft);
    });
    $('#color-label').click(function(){
        $('#color-picker').show()
    });
    $('#color-label').dblclick(function(){
        $('#color-picker').hide()
    });
    $('#clear').click(function redraw(){
    });
    currentFunction = new DrawingRectangle(contextReal,contextDraft);
    });
    // $('#upload-img').click(()=>{
    // currentFunction = new FileReader (contextReal,contextDraft);
    // });

   