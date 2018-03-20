class InsertText extends PaintFunction{
   constructor(contextReal,contextDraft,canvas_log){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.offset = $('#canvas-draft').offset();
        this.lastPosition = [0,0]; 
        this.canvas_log = canvas_log;  
        this.adjustFont = function(size, style){
            this.contextReal.font = `${size} ${style}` ; 
            $("#input-box").css({"font":`${size} ${style}`})
        }  
    }
    

    onMouseDown(coord,event){
        console.log(coord[0],coord[1])
        console.log(`Text box positioned at x: ${coord[0] + this.offset.left}  y: ${coord[1] + this.offset.top}`)
        $("#input-box").css({display: 'inline-block', left: coord[0] + this.offset.left, top: coord[1] + this.offset.top});
        this.lastPosition = [coord[0] , coord[1] ]
    }        
    
    onDragging(){}
    onMouseMove(){
        $("#input-box").css({color: rgbaColor})
    }
    onMouseUp(){
        $("#input-box").focus();
    }
    onMouseLeave(){}
    onMouseEnter(){}
    onCancel(){}
    onChange(){
        //this.adjustFont($('#size-slider').slider("value"))
    }
    onEnterPress(coord,event){
        this.textSizeVal =  parseInt($("#size_field").val())+4;

        let fontFamily = $( "#text-style-choice option:selected" ).text();
        console.log(`enter being pressed`);
        this.contextReal.font = `${this.textSizeVal}px ${fontFamily}` //different from html
        this.contextReal.fillStyle = rgbaColor
        this.contextReal.fillText($('#input-box').val(),this.lastPosition[0],this.lastPosition[1]+($('#input-box').height()/2))
        $('#input-box').css({display: 'none'})
        $('#input-box').val("")
        this.canvas_log.saveState();
    }
    //context.fillText(text,x,y,maxWidth);
}

