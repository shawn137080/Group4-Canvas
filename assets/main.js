
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
    $('#color-input').prop(unchecked,false);
    //$('#color-picker').toggle();//
    });
    // $('#upload-img').click(()=>{
    // currentFunction = new FileReader (contextReal,contextDraft);
    // });
    //trying to do show/hide for the color-picker
    //var colLabel = document.getElementById('color-label')
    //colLabal.click()

    currentFunction = new DrawingRectangle(contextReal,contextDraft);