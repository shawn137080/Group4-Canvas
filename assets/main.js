
    $('#drawing-rectangle').click(()=>{
    currentFunction = new DrawingRectangle(contextReal,contextDraft);
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
    $('#color-label').click(function(){
    $('#color-input').prop(unchecked,false);
    //$('#color-picker').toggle();//
    });
    // $('#upload-img').click(()=>{
    // currentFunction = new FileReader (contextReal,contextDraft);
    // });
    currentFunction = new DrawingRectangle(contextReal,contextDraft);