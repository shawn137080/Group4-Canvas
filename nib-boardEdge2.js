class BoardEdge2 extends PaintFunction{

    constructor(contextReal,contextDraft, canvas_log, mobile){
        super();
        this.context = contextReal; 
        this.canvas_log = canvas_log;
        this.lastPoint = {};
        this.currentPoint = {};
        this.lineheight = 15;
        this.linewidth = 6;
        this.mobile =mobile;
    }
    
    onMouseDown(coord,event){  
        if (!this.mobile){
            this.lineheight = 15 + parseInt($("#size_field").val());
            this.linewidth = 6 + parseInt($("#size_field").val())/2.5;
            this.context.fillStyle = $('#color-label-stroke')[0].style.backgroundColor; 
        } else{
            this.lineheight = 7.5 + parseInt($("#size_field_mobile").val()) || 7.5;
            this.linewidth = 3 + parseInt($("#size_field_mobile").val())/2.5 || 3;
            this.context.fillStyle = "black";
        }
        
        this.lastPoint = { x: coord[0], y: coord[1] };
        // this.context.drawImage(img,coord[0] ,coord[1], 20, 50)
    }

    onDragging(coord,event){
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
            this.drawSlash(x,y);
            //drawImage(image, dx, dy, dw, dh) dw dh = [pen size]
        }
        this.lastPoint = this.currentPoint
    }

    onMouseMove(){}
    onMouseUp(){
        this.canvas_log.saveState();
    }
    onMouseLeave(){}
    onMouseEnter(){}

    distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }

    angleBetween(point1, point2) {
        return Math.atan2( point2.x - point1.x, point2.y - point1.y );
    }

    drawSlash(x,y){
        this.context.beginPath();
        this.context.moveTo(x,y);
        this.context.lineTo(x+this.linewidth,y);
        this.context.lineTo(x,y-this.lineheight);
        this.context.lineTo(x-this.linewidth,y-this.lineheight);
        this.context.closePath();
        this.context.fill();
    }

}