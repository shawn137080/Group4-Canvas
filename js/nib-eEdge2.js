class EEdge2 extends PaintFunction{
    
    constructor(contextReal,contextDraft, canvas_log, mobile){
        super();
        this.canvas_log = canvas_log;
        this.context = contextReal; 
        this.lastPoint = {};
        this.currentPoint = {};
        this.isDrawing = false;
        this.space = 4; //spacing between square
        this.size = 4; //height of each square
        this.mobile=mobile;
    }
    
    onMouseDown(coord,event){ 
        if (!this.mobile){
            this.size = 4 + parseInt($("#size_field").val())/4;
            this.context.fillStyle = $('#color-label-stroke')[0].style.backgroundColor; 
        } else{
            this.size = 4 + parseInt($("#size_field_mobile").val())/4 ||4;
            this.context.fillStyle = "black";
        }
        this.lastPoint = { x: coord[0], y: coord[1] };
        // this.context.drawImage(img,coord[0] ,coord[1], 20, 50)
    }

    onDragging(coord,event,canvas_log){
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
    onMouseUp(){
        this.canvas_log.saveState();
    }
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
        this.drawFourRect(-axisX, -axisY);
        this.context.rotate( -angleInRad );
        this.context.translate( -positionX, -positionY );
    }

    drawFourRect(x,y){
        this.context.fillRect(x, y, 2,this.size);
        this.context.fillRect(x, y+this.space+(this.size), 2,this.size);
        this.context.fillRect(x, y+this.space*2+(this.size*2), 2,this.size);
        this.context.fillRect(x, y+this.space*3+(this.size*3), 2,this.size);
    }


}