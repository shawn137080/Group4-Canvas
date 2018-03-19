
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
    currentFunction = new DrawingRectangle(contextReal,contextDraft);
    // $('#upload-img').click(()=>{
    // currentFunction = new FileReader (contextReal,contextDraft);
    // });

   