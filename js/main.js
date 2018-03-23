$(window).on('load', function () {

    let canvasCoverage = 0.9;
    let controlboardWidth = $('#control-board').width();
    let optionboxHeight = $('.option-box').height();

    //Set the size for the canvas
    let canvas_width = ($(window).width() - controlboardWidth) * canvasCoverage;
    let canvas_width_margin = ($(window).width() - controlboardWidth) * (1 - canvasCoverage) / 4;
    let canvas_height_margin = ($(window).height() - optionboxHeight) * (1 - canvasCoverage) / 4;
    let canvas_height = ($(window).height() - 150) * canvasCoverage;
    $("#canvas-real")[0].width = $("#canvas-draft")[0].width = canvas_width;
    $("#canvas-real")[0].height = $("#canvas-draft")[0].height = canvas_height;
    $("#canvas-real").css({
        marginLeft: `${canvas_width_margin  + controlboardWidth}px`,
        marginTop: `${canvas_height_margin + optionboxHeight}px`
    });
    $("#canvas-draft").css({
        marginLeft: `${canvas_width_margin  + controlboardWidth}px`,
        marginTop: `${canvas_height_margin + optionboxHeight}px`
    });






    //init the background of canvas to white
    contextReal.save();
    contextReal.fillStyle = contextDraft.fillStyle = "#FFFFFF";
    contextReal.fillRect(0, 0, canvas_width, canvas_height);
    contextReal.fill();
    contextDraft.restore();

    $('#size-slider').slider({
        orientation: "horizontal",
        range: false,
        min: 1,
        max: 50,
        value: 3,
        step: 1,
        animate: true,
        slide: function (event, ui) {
            $("#size_field").text(ui.value);
            $("#size_field").val(ui.value);
            currentFunction.onChange(ui.value);
        }
    });

    //drawing function
    currentFunction = new DrawingLineSmooth(contextReal, contextDraft);

    $('#drawing-line-smooth').click(() => {
        currentFunction = new DrawingLineSmooth(contextReal, contextDraft);
    });
    $('#e-edge').click(() => {
        currentFunction = new EEdge2(contextReal, contextDraft);
    });
    $('#board-edge').click(() => {
        currentFunction = new BoardEdge2(contextReal, contextDraft);
    });

    $('#draw-s-line3').click(() => {
        currentFunction = new Draw_S_Line3(contextReal, contextDraft);
    });
    $('#drawing-line').click(()=>{
        currentFunction = new DrawingLine(contextReal,contextDraft);
    });
    $('#quad-curve').click(() => {
        currentFunction = new Quad_Curve(contextReal, contextDraft);
    });
    $('#bezier-curve').click(() => {
        currentFunction = new Bezier_Curve(contextReal, contextDraft);
    });

    $('#drawing-ellipse').click(() => {
        currentFunction = new DrawingEllipse(contextReal, contextDraft);
    });

    $('#drawing-rectangle-hollow').click(() => {
        currentFunction = new DrawingRectangleHollow(contextReal, contextDraft);
    });
    $('#drawing-rectangle').click(() => {
        currentFunction = new DrawingRectangle(contextReal, contextDraft);
    });
    $('#drawing-circle-hollow').click(() => {
        currentFunction = new DrawingCircleHollow(contextReal, contextDraft);
    });
    $('#drawing-circle').click(() => {
        currentFunction = new DrawingCircle(contextReal, contextDraft);
    });

    $('#eraser').click(() => {
        currentFunction = new Eraser(contextReal, contextDraft);
    });

    $('#selector').click(() => {
        currentFunction = new Selector(contextReal, contextDraft);
    });

    $('#color-label').click(function () {
        $('#color-picker').show()
    });

    $('#color-label').dblclick(function () {
        $('#color-picker').hide()
    });

    $('#clear').click(() => {
        contextReal.save();
        contextReal.fillStyle = contextDraft.fillStyle = "#FFFFFF";
        contextReal.fillRect(0, 0, canvas_width, canvas_height);
        contextReal.fill();
        contextReal.restore();
    });

    $(document).ready(function () {

        $('#brush-button').click(function () {
            $('#brush-icons').toggle();
        });
        $('#line-button').click(function () {
            $('#line-icons').toggle();
        });
        $('#shape-button').click(function () {
            $('#shape-icons').toggle();
        });

    });

})

//resize function - reset the canvas and clear the undo redo array
$(window).on('resize', () => {

    let canvasCoverage = 0.9;
    let controlboardWidth = $('#control-board').width();
    let optionboxHeight = $('.option-box').height();

    //Set the size for the canvas
    console.log($(window).width());
    // if ($(window).width() < 992) {
        
    //     let canvas_width = 768;
    //     let canvas_width_margin = ($(window).width() - controlboardWidth) * (1 - canvasCoverage) / 4;
    //     let canvas_height_margin = ($(window).height() - optionboxHeight) * (1 - canvasCoverage) / 4;
    //     let canvas_height = 600;
    
    //     $("#canvas-real")[0].width = $("#canvas-draft")[0].width = canvas_width;
    //     $("#canvas-real")[0].height = $("#canvas-draft")[0].height = canvas_height;
    //     $("#canvas-real").css({
    //         marginLeft: `${canvas_width_margin  + controlboardWidth}px`,
    //         marginTop: `${canvas_height_margin + optionboxHeight}px`
    //     });
    //     $("#canvas-draft").css({
    //         marginLeft: `${canvas_width_margin  + controlboardWidth}px`,
    //         marginTop: `${canvas_height_margin + optionboxHeight}px`
    //     });
    
    //     //Clear Real canvas screen
    //     contextReal.clearRect(0, 0, $('#canvas-real').width(), $('#canvas-real').height());
    // } else {
    //     let canvas_width = 1200;
    //     let canvas_width_margin = ($(window).width() - controlboardWidth) * (1 - canvasCoverage) / 4;
    //     let canvas_height_margin = ($(window).height() - optionboxHeight) * (1 - canvasCoverage) / 4;
    //     let canvas_height = 600;
    
    //     $("#canvas-real")[0].width = $("#canvas-draft")[0].width = canvas_width;
    //     $("#canvas-real")[0].height = $("#canvas-draft")[0].height = canvas_height;
    //     $("#canvas-real").css({
    //         marginLeft: `${canvas_width_margin  + controlboardWidth}px`,
    //         marginTop: `${canvas_height_margin + optionboxHeight}px`
    //     });
    //     $("#canvas-draft").css({
    //         marginLeft: `${canvas_width_margin  + controlboardWidth}px`,
    //         marginTop: `${canvas_height_margin + optionboxHeight}px`
    //     });
    
        // let canvas_width = 800;
        // let canvas_width_margin = ($(window).width()-controlboardWidth)*(1-canvasCoverage)/4;
        // let canvas_height_margin = ($(window).height()-optionboxHeight)*(1-canvasCoverage)/4;
        // let canvas_height = 600;
    
    
    
        // $("#canvas-real")[0].width = $("#canvas-draft")[0].width = canvas_width;
        // $("#canvas-real")[0].height = $("#canvas-draft")[0].height = canvas_height;
        // $("#canvas-real").css({
        //     marginLeft: `${canvas_width_margin  + controlboardWidth}px`,
        //     marginTop: `${canvas_height_margin + optionboxHeight}px`
        // });
        // $("#canvas-draft").css({
        //     marginLeft: `${canvas_width_margin  + controlboardWidth}px`,
        //     marginTop: `${canvas_height_margin + optionboxHeight}px`
        // });
    
        // Clear Real canvas screen
    //     contextReal.clearRect(0, 0, $('#canvas-real').width(), $('#canvas-real').height());
    // }

        // let canvas_width = ($(window).width() - controlboardWidth) * canvasCoverage;
        // let canvas_width_margin = ($(window).width() - controlboardWidth) * (1 - canvasCoverage) / 4;
        // let canvas_height_margin = ($(window).height() - optionboxHeight) * (1 - canvasCoverage) / 4;
        // let canvas_height = ($(window).height() - optionboxHeight) * canvasCoverage;
    
    // }// } else if ($(window).width() < 768) {

    //     let canvas_width = ($(window).width() - controlboardWidth) * 0.6;
    //     let canvas_width_margin = ($(window).width() - controlboardWidth) * (1 - canvasCoverage) / 4;
    //     let canvas_height_margin = ($(window).height() - optionboxHeight) * (1 - canvasCoverage) / 4;
    //     let canvas_height = ($(window).height() - optionboxHeight) * 0.6;
    // }
    let canvas_width = ($(window).width()-controlboardWidth)*canvasCoverage;
    let canvas_width_margin = ($(window).width()-controlboardWidth)*(1-canvasCoverage)/4;
    let canvas_height_margin = ($(window).height()-optionboxHeight)*(1-canvasCoverage)/4;
    let canvas_height = ($(window).height()-optionboxHeight)*canvasCoverage;



    $("#canvas-real")[0].width = $("#canvas-draft")[0].width = canvas_width;
    $("#canvas-real")[0].height = $("#canvas-draft")[0].height = canvas_height;
    $("#canvas-real").css({
        marginLeft: `${canvas_width_margin  + controlboardWidth}px`,
        marginTop: `${canvas_height_margin + optionboxHeight}px`
    });
    $("#canvas-draft").css({
        marginLeft: `${canvas_width_margin  + controlboardWidth}px`,
        marginTop: `${canvas_height_margin + optionboxHeight}px`
    });

    // Clear Real canvas screen
    contextReal.clearRect(0, 0, $('#canvas-real').width(), $('#canvas-real').height());
});