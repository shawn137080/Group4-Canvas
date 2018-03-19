class DrawingEllipse extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft; 
        this.start = x;
        this.end = y;           
    }
    onMouseDown(coord,event){
        this.contextReal.strokeStyle = this.contextDraft.strokeStyle = rgbaColor;
        this.contextReal.lineJoin = this.contextDraft.lineJoin = "round";
        this.contextReal.lineWidth = this.contextDraft.lineWidth = 4;
        this.contextReal.fillStyle = this.contextDraft.fillStyle = "transparent";
        this.origX = coord[0];
        this.origY = coord[1];
        this.contextDraft.beginPath();
    }
        onDragging(coord,event){
            this.contextDraft.strokeStyle = rgbaColor;
            this.contextDraft.lineWidth = 4;
            this.contextDraft.fillStyle= "transparent";
            this.contextDraft.beginPath();
            this.contextDraft.ellipse(100, 100, 50, 75, 45 * Math.PI/180, 0, 2 * Math.PI);
            context.ellipse(x, y, rx, ry, rotation, start, end, anticlockwise);
            ctx.stroke();
        }
}