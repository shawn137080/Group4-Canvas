var eNibHead = new Image(10,20);
eNibHead.src = 'assets/img/NibE43.png';

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

function rotateAndPaintImage ( context, image, angleInRad , positionX, positionY, axisX, axisY, dw, dh ) {
    context.translate( positionX, positionY );
    context.rotate( angleInRad );
    context.drawImage( image, -axisX, -axisY ,dw, dh);
    context.rotate( -angleInRad );
    context.translate( -positionX, -positionY );
  }

class EEdge extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.context = contextReal; 
        this.lastPoint = {};
        this.currentPoint = {};
        this.isDrawing = false;
    }
    
    onMouseDown(coord,event){  
        this.isDrawing = true;
        this.lastPoint = { x: coord[0], y: coord[1] };
    }

    onDragging(coord,event){
        if (!this.isDrawing) return;
        this.currentPoint = { x: coord[0], y: coord[1] };
        let dist = distanceBetween(this.lastPoint, this.currentPoint);
        let angle = angleBetween(this.lastPoint, this.currentPoint);
        
        this.brushSizeX =  parseInt($("#size_field").val())+7
        this.brushSizeY =  parseInt($("#size_field").val())+15
        this.brushAngle =  parseInt($("#image_degree_field").val())
        
        for (var i = 0; i < dist; i++) {
            let x = this.lastPoint.x  + (Math.sin(angle) * i);
            let y = this.lastPoint.y  + (Math.cos(angle) * i);            

            rotateAndPaintImage(this.context,eNibHead, this.brushAngle, x, y, 20, 30, this.brushSizeX, this.brushSizeY);
            //rotateAndPaintImage(context, image, angleInRad , positionX, positionY, axisX, axisY, dw, dh) dw dh = [pen size]
            //this.canvas_log.saveState();   
        }
        this.lastPoint = this.currentPoint
    }

    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
    onImageRotate(){}


}