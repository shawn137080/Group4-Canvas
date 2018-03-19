class DrawingLine extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    
    onMouseDown(coord,event){
        this.contextReal.strokeStyle = rgbaColor;
        this.contextReal.lineJoin = "round";
        this.contextReal.lineWidth = 3;
        this.contextDraft.strokeStyle = rgbaColor;
        this.contextDraft.lineJoin = "round";
        this.contextDraft.lineWidth = 3;
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        //if following line removed, makes succession of lines like "eventail"
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.origX,this.origY);
        this.contextDraft.lineTo(coord[0],coord[1]);
        this.contextDraft.stroke();
    }
    onMouseMove(){}
    onMouseUp(coord){
        this.contextReal.beginPath();
        this.contextReal.moveTo(this.origX,this.origY);
        this.contextReal.lineTo(coord[0],coord[1]);
        this.contextReal.stroke();
    }
    onMouseLeave(){}
    onMouseEnter(){}
}