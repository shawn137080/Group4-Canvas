class EEdge extends PaintFunction{

    constructor(contextReal,contextDraft){
        super();
        this.context = contextReal; 
        this.lastPoint = {};
        this.currentPoint = {};
        this.isDrawing = false;
        this.eNibHead = new Image(10,20);
        this.eNibHead.src = 'assets/img/NibE43.png';
    }
    
    onMouseDown(coord,event){  
        this.isDrawing = true;
        this.lastPoint = { x: coord[0], y: coord[1] };
        // this.context.drawImage(img,coord[0] ,coord[1], 20, 50)
    }

    onDragging(coord,event,canvas_log){
        if (!this.isDrawing) return;

        this.currentPoint = { x: coord[0], y: coord[1] };
        let dist = this.distanceBetween(this.lastPoint, this.currentPoint);
        let angle = this.angleBetween(this.lastPoint, this.currentPoint);
        // for (var i = 0; i < dist; i++) {
        //     let x = this.lastPoint.x + (Math.sin(angle) * i);
        //     let y = this.lastPoint.y + (Math.cos(angle) * i);
                    
        for (var i = 0; i < dist; i++) {
            let x = this.lastPoint.x  + (Math.sin(angle) * i);
            let y = this.lastPoint.y  + (Math.cos(angle) * i);            
            // this.context.scale(2,2);
            // this.context.drawImage(eNibHead,x ,y, 20, 50);
            //drawImage(image, dx, dy, dw, dh) dw dh = [pen size]
            this.rotateAndPaintImage(45, x, y, 20, 30, 50, 80 );
            //rotateAndPaintImage(context, image, angleInRad , positionX, positionY, axisX, axisY, dw, dh) dw dh = [pen size]
            //this.canvas_log.saveState();   
        }
        this.lastPoint = this.currentPoint;
    }

    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

    //class internal function
    distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    angleBetween(point1, point2) {
        return Math.atan2( point2.x - point1.x, point2.y - point1.y);
    }
    
    rotateAndPaintImage (angleInRad , positionX, positionY, axisX, axisY, dw, dh) {
        this.context.translate( positionX, positionY );
        this.context.rotate( angleInRad );
        this.context.drawImage(this.eNibHead, -axisX, -axisY ,dw, dh);
        this.context.rotate( -angleInRad );
        this.context.translate( -positionX, -positionY );
      }


}