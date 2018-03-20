$(document).ready(function (){
    let canvasCoverage = 0.9;
    let controlboardWidth = $('#control-board').width();
    let mobileboxHeight = $('#mobile-box').height();

    console.log(canvasCoverage);
    //Hiding current buttons or rotation
    $('#cancel').hide();
    $('#print').hide();
    $('#size-slider-bar').hide();
    $('#rotate-slider-bar').hide();
    $('#text-input').draggable().hide();
    $('#color-choice1').hide();
    $('#color-choice2').hide();
    $('#color-choice3').hide();
    $('#color-picker').hide();
    $('#text-style-bar').hide();

    //Set the size for the canvas
    let canvas_width = ($(window).width()-controlboardWidth)*canvasCoverage;
    let canvas_width_margin = ($(window).width()-controlboardWidth)*(1-canvasCoverage)/2;
    let canvas_height_margin = ($(window).height()-mobileboxHeight)*(1-canvasCoverage)/2;
    let canvas_height = ($(window).height()-mobileboxHeight)*canvasCoverage;
    $( "#canvas-real" )[0].width = $( "#canvas-draft" )[0].width = canvas_width;
    $( "#canvas-real" )[0].height = $( "#canvas-draft" )[0].height = canvas_height;
    $( "#canvas-real" ).css({marginLeft: `${canvas_width_margin  + controlboardWidth}px`, 
                             marginTop: `${canvas_height_margin + mobileboxHeight}px`});
    $( "#canvas-draft" ).css({marginLeft: `${canvas_width_margin  + controlboardWidth}px`, 
                              marginTop: `${canvas_height_margin + mobileboxHeight}px`});

    //init the background of canvas to white
    contextReal.save();
    contextReal.fillStyle = contextDraft.fillStyle = "#FFFFFF";
    contextReal.fillRect(0,0,canvas_width , canvas_height);
    contextReal.fill();
    contextDraft.restore();

    let canvas_log = new ActionLog(contextReal,contextDraft);
    

    //Set Bootstrap Toggle
    $('#fill-choice').bootstrapToggle({
        on: 'Enabled',
        off: 'None'
    });

    $('#border-choice').bootstrapToggle({
        on: 'Enabled',
        off: 'None'
    });
    $('#border-choice').bootstrapToggle('on');

    $('#fill-border-toggle-box').hide();

    //Set Slider
    $('#size-slider').slider({
        orientation: "horizontal",
        range: false,
        min: 1,
        max: 50,
        value: 3,
        step: 1,
        animate: true,
        slide: function(event, ui){
            $("#size_field").text(ui.value);
            $("#size_field").val(ui.value);
            currentFunction.onChange(ui.value);
        }
    });

    var sizeVal = $('#size-slider').slider("value") 

    $('#rotate-slider').slider({
        orientation: "horizontal",
        range: false,
        min: 0,
        max: 359,
        value: 0,
        step: 1,
        animate: true,
        slide: function(event, ui){
            $("#rotate_field").text(ui.value);
            $("#rotate_field").val(ui.value);
            currentFunction.onRotate(ui.value);
        }
    });

    $('#size-slider-mobile').slider({
        orientation: "horizontal",
        range: false,
        min: 1,
        max: 25,
        value: 1,
        step: 1,
        animate: true,
        slide: function(event, ui){
            $("#size_field_mobile").text(ui.value);
            $("#size_field_mobile").val(ui.value);
            currentFunction.onChange(ui.value);
        }
    });

    var sizeVal = $('#size-slider').slider("value") 

    $('#rotate-slider-mobile').slider({
        orientation: "horizontal",
        range: false,
        min: 0,
        max: 359,
        value: 0,
        step: 1,
        animate: true,
        slide: function(event, ui){
            $("#rotate_field_mobile").text(ui.value);
            $("#rotate_field_mobile").val(ui.value);
            currentFunction.onRotate(ui.value);
        }
    });
    //End Slider

    //seeting initial drawing
    currentFunction = new DrawingLineSmooth(contextReal,contextDraft, canvas_log);
    $('#size-slider-bar').show();
    $('#size-slider-bar-mobile').show();
    $('#color-choice1').show();
    $('#color-choice2').hide();
    $('#color-choice3').hide();
    $('#color-picker').show();
    $('#text-style-bar').hide();
    
    //drawing function (non-mobile)
    $('#drawing-rectangle2').click(()=>{
        $('#size-slider-bar').show();
        $('#color-choice1').show();
        $('#color-choice2').show();
        $('#color-choice3').hide();
        $('#color-picker').show();
        $('#text-style-bar').hide();
        currentFunction = new DrawingRectangle2(contextReal,contextDraft, canvas_log, false);
    });
    $('#drawing-line-smooth').click(()=>{
        $('#size-slider-bar').show();
        $('#color-choice1').show();
        $('#color-choice2').hide();
        $('#color-choice3').hide();
        $('#color-picker').show();
        $('#text-style-bar').hide();
        currentFunction = new DrawingLineSmooth(contextReal,contextDraft, canvas_log, false);
    });
    $('#draw-s-line3').click(()=>{
        $('#size-slider-bar').show();
        $('#color-choice1').show();
        $('#color-choice2').hide();
        $('#color-choice3').hide();
        $('#color-picker').show();
        $('#text-style-bar').hide();
        currentFunction = new Draw_S_Line3(contextReal,contextDraft, canvas_log, false);
    });
    $('#quad-curve').click(()=>{
        $('#size-slider-bar').show();
        $('#color-choice1').show();
        $('#color-choice2').hide();
        $('#color-choice3').hide();
        $('#color-picker').show();
        $('#text-style-bar').hide();
        currentFunction = new Quad_Curve(contextReal,contextDraft, canvas_log, false);
    });
    $('#bezier-curve').click(()=>{
        $('#size-slider-bar').show();
        $('#color-choice1').show();
        $('#color-choice2').hide();
        $('#color-choice3').hide();
        $('#color-picker').show();
        $('#text-style-bar').hide();
        currentFunction = new Bezier_Curve(contextReal,contextDraft, canvas_log, false);
    });
    $('#drawing-circle2').click(()=>{
        $('#size-slider-bar').show();
        $('#color-choice1').show();
        $('#color-choice2').show();
        $('#color-choice3').hide();
        $('#color-picker').show();
        $('#text-style-bar').hide();
        currentFunction = new DrawingCircle2(contextReal,contextDraft, canvas_log, false);
    });
    $('#drawing-ellipse').click(()=>{
        $('#size-slider-bar').show();
        $('#color-choice1').show();
        $('#color-choice2').show();
        $('#color-choice3').hide();
        $('#color-picker').show();
        $('#text-style-bar').hide();
        currentFunction = new DrawingEllipse(contextReal,contextDraft, canvas_log, false);
    });
    $('#e-edge').click(()=>{
        $('#size-slider-bar').show();
        $('#color-choice1').show();
        $('#color-choice2').hide();
        $('#color-choice3').hide();
        $('#color-picker').show();
        $('#text-style-bar').hide();
        currentFunction = new EEdge2(contextReal,contextDraft, canvas_log, false);
    });
    $('#board-edge').click(()=>{
        $('#size-slider-bar').show();
        $('#color-choice1').show();
        $('#color-choice2').hide();
        $('#color-choice3').hide();
        $('#color-picker').show();
        $('#text-style-bar').hide();
        currentFunction = new BoardEdge2(contextReal,contextDraft, canvas_log, false);
    });
    $('#insert-text').click(()=>{
        $('#size-slider-bar').show();
        $('#color-choice1').hide();
        $('#color-choice2').hide();
        $('#color-choice3').show();
        $('#color-picker').show();
        $('#text-style-bar').show();
        currentFunction = new InsertText(contextReal,contextDraft, canvas_log, false);
    });
    $('#eraser').click(()=>{
        $('#size-slider-bar').show();
        $('#color-choice1').hide();
        $('#color-choice2').hide();
        $('#color-choice3').hide();
        $('#color-picker').hide();
        $('#text-style-bar').hide();
        currentFunction = new Eraser(contextReal,contextDraft, canvas_log, false);
    });
    $('#selector').click(()=>{
        $('#size-slider-bar').hide();
        $('#color-choice1').hide();
        $('#color-choice2').hide();
        $('#color-choice3').hide();
        $('#color-picker').hide();
        $('#text-style-bar').hide();
        currentFunction = new Selector2(contextReal,contextDraft, canvas_log, false);
    });
    $('#clear').click(()=>{
        $('#size-slider-bar').hide();
        $('#color-choice1').hide();
        $('#color-choice2').hide();
        $('#color-choice3').hide();
        $('#color-picker').hide();
        $('#text-style-bar').hide();
        contextReal.save();
        contextReal.fillStyle = contextDraft.fillStyle = "#FFFFFF";
        contextReal.fillRect(0,0,canvas_width , canvas_height);
        contextReal.fill();
        contextReal.restore();
        canvas_log.saveState();
    });
    $('#undo').click(()=>{
        canvas_log.undo();
    });
    $('#redo').click(()=>{
        canvas_log.redo();
    });


    //mobile version
    $('#drawing-rectangle2-mobile').click(()=>{
        currentFunction = new DrawingRectangle2(contextReal,contextDraft, canvas_log, true);
    });
    $('#drawing-line-smooth-mobile').click(()=>{
        currentFunction = new DrawingLineSmooth(contextReal,contextDraft, canvas_log, true);
    });
    $('#draw-s-line3-mobile').click(()=>{
        currentFunction = new Draw_S_Line3(contextReal,contextDraft, canvas_log, true);
    });
    $('#quad-curve-mobile').click(()=>{
        currentFunction = new Quad_Curve(contextReal,contextDraft, canvas_log, true);
    });
    $('#bezier-curve-mobile').click(()=>{
        currentFunction = new Bezier_Curve(contextReal,contextDraft, canvas_log, true);
    });
    $('#drawing-circle2-mobile').click(()=>{
        currentFunction = new DrawingCircle2(contextReal,contextDraft, canvas_log, true);
    });
    $('#drawing-ellipse-mobile').click(()=>{
        currentFunction = new DrawingEllipse(contextReal,contextDraft, canvas_log, true);
    });
    $('#e-edge-mobile').click(()=>{
        currentFunction = new EEdge2(contextReal,contextDraft, canvas_log, true);
    });
    $('#board-edge-mobile').click(()=>{
        currentFunction = new BoardEdge2(contextReal,contextDraft, canvas_log, true);
    });
    $('#eraser-mobile').click(()=>{
        currentFunction = new Eraser(contextReal,contextDraft, canvas_log, true);
    });
    $('#selector-mobile').click(()=>{
        currentFunction = new Selector2(contextReal,contextDraft, canvas_log, true);
    });
    $('#clear-mobile').click(()=>{
        contextReal.save();
        contextReal.fillStyle = contextDraft.fillStyle = "#FFFFFF";
        contextReal.fillRect(0,0,canvas_width , canvas_height);
        contextReal.fill();
        contextReal.restore();
        canvas_log.saveState();
    });
    $('#undo-mobile').click(()=>{
        canvas_log.undo();
    });
    $('#redo-mobile').click(()=>{
        canvas_log.redo();
    });

     //Reset and hide input box when current function change

    
    /*$('#download').click(()=>{
        var dt = canvasReal.toDataURL('image/jpeg');
        this.href = dt;
    });*/

    //Unused functions below
    /*
    $('#drawing-rectangle').click(()=>{
        currentFunction = new DrawingRectangle(contextReal,contextDraft);
    });
    $('#drawing-line').click(()=>{
        currentFunction = new DrawingLine(contextReal,contextDraft);
    });
    $('#draw-s-line').click(()=>{
        currentFunction = new Draw_S_Line(contextReal,contextDraft);
    });
    $('#draw-s-line2').click(()=>{
        currentFunction = new Draw_S_Line2(contextReal,contextDraft,contextDraft2);
    });
    $('#drawing-circle').click(()=>{
        currentFunction = new DrawingCircle(contextReal,contextDraft);
    });
    $('#print2').click(() =>{
        let x = $('#draggable').position().left-50;
        let y = $('#draggable').position().top-50;
        let h = $('#image').height();
        let w = $('#image').width();
        let img = document.getElementById("image");
        contextReal.drawImage(img,x,y, w, h);
    });
    */
});

//resize function - reset the canvas and clear the undo redo array
$(window).on('resize', ()=>{
    
    let canvasCoverage = 0.9;
    let controlboardWidth = $('#control-board').width();
    let mobileboxHeight = $('#mobile-box').height();
    
    //Hiding current buttons or rotation
    $('#cancel').hide();
    $('#print').hide();
    //$('#rotate-slider-bar').hide();
    $('#text-input').hide();

    //Set the size for the canvas
    let canvas_width = ($(window).width()-controlboardWidth)*canvasCoverage;
    let canvas_width_margin = ($(window).width()-controlboardWidth)*(1-canvasCoverage)/2;
    let canvas_height_margin = ($(window).height())*(1-canvasCoverage)/2;
    let canvas_height = ($(window).height()-mobileboxHeight)*canvasCoverage;
    $( "#canvas-real" )[0].width = $( "#canvas-draft" )[0].width = canvas_width;
    $( "#canvas-real" )[0].height = $( "#canvas-draft" )[0].height = canvas_height;
    $( "#canvas-real" ).css({marginLeft: `${canvas_width_margin  + controlboardWidth}px`, 
                             marginTop: `${canvas_height_margin+mobileboxHeight}px`});
    $( "#canvas-draft" ).css({marginLeft: `${canvas_width_margin  + controlboardWidth}px`, 
                              marginTop: `${canvas_height_margin+mobileboxHeight}px`});

    //init the background of canvas to white
    contextReal.save();
    contextReal.fillStyle = contextDraft.fillStyle = "#FFFFFF";
    contextReal.fillRect(0,0,canvas_width , canvas_height);
    contextReal.fill();
    contextDraft.restore();
});