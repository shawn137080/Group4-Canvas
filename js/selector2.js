//not implementing rotation for this
class Selector2 extends PaintFunction{
    constructor(contextReal,contextDraft, canvas_log){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;  
        this.canvas_log = canvas_log;
        this.startpt = {x:0, y:0};
        this.endpt = {x:0, y:0};
        this.prevCoord = {x:0, y:0};
        this.cp_size = 20;  //setting standard size of the control points
        this.phase_adjust = this.finish = this.move  = this.scale = false;
        this.boxWidth, this.boxHeight;
        this.imgWidth, this.imgHeight;
        this.imgX, this.imgY;
        this.movept = {x:0, y:0};
        this.image = new Image();  
        this.scaleX = this.scaleY = 1;
    }
    
    onMouseDown(coord,event){
        //check to see the phase adjust has started or not
        if (!this.phase_adjust){
            //to begin, set all points to be the same
            this.startpt = {x:coord[0], y:coord[1]};
            this.endpt = {x:coord[0], y:coord[1]};
        } else{
            this.checkCP(coord[0], coord[1]);
            if (this.scale){
                this.endpt = {x:coord[0], y:coord[1]};
            }
        }
        this.prevCoord = {x:coord[0], y:coord[1]};
    }

    onDragging(coord,event){
        if (!this.finish){
            if (!this.move){
                //make sure that the endpt is never smaller than start pt's location
                if (this.endpt.x < this.startpt.x || this.endpt.y < this.startpt.y){
                    this.endpt = this.prevCoord;
                } else{
                    this.endpt = {x:coord[0], y:coord[1]};
                    this.prevCoord = {x:coord[0], y:coord[1]};
                }
                
                if (!this.scale){
                    this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                    this.drawRect();
                } else{
                    this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                    this.drawRect();
                    this.scaleCanvasDraft();
                }
            } else if (this.move){
                this.movept = {x:coord[0], y:coord[1]};
                this.movePos();
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.drawRect();
                this.scaleCanvasDraft();
                this.prevCoord = {x:coord[0], y:coord[1]};
            }
            
        } 
    }

    onMouseMove(){}
    onMouseUp(coord){
        if (!this.finish && !this.move){ 
            if (!this.scale){
                this.phase_adjust = true;
                $('#cancel').show();
                $('#print').show();
                this.drawRect();
                this.getImage();
            } else{
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.drawRect();
                this.scaleCanvasDraft();
                this.scale = false;
            }
            this.prevCoord = {x:coord[0], y:coord[1]};
            
        } else if (this.move){
            this.movept = {x:coord[0], y:coord[1]};
            this.movePos();
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.drawRect();
            this.scaleCanvasDraft();
            this.prevCoord = {x:coord[0], y:coord[1]};
            this.move = false;
        } else{
            console.log('ending..')
            //draw the points on the real canvas
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.printCanvasReal();
            this.canvas_log.saveState();
            //reset all parameter
            this.finish = this.phase_adjust = this.move = this.scale = false;

            //hide cancel and rotation panel
            $('#cancel').hide();
            $('#print').hide();
        }
        
    }
    onMouseLeave(){
        if (this.scale){
            this.endpt = {x:this.prevCoord.x, y:this.prevCoord.y};
        } else if (this.move){
            this.movept = {x:this.prevCoord.x, y:this.prevCoord.y};
            this.movePos();
            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.drawRect();
            this.scaleCanvasDraft();
        }
    }
    onMouseEnter(){}
    onFinish(){}
    onCancel(){
        this.finish = this.phase_adjust = this.move = this.scale = false;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        console.log('clearing');
        $('#cancel').hide();
        $('#print').hide();
    }
    onChange(){}
    onPrint(){
        //print a copy onto the real canvas and move the curve and control points to the right and down 10px
        this.printCanvasReal();
        this.canvas_log.saveState();
        this.startpt = {x: this.startpt.x +10 , y: this.startpt.y +10};
        this.endpt = {x: this.endpt.x +10 , y: this.endpt.y +10};

        //clear the Draft canvas and redraw with new poistion
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.drawRect();
        this.scaleCanvasDraft();

        //console.log(`Finished: ${this.finish}`);
        //console.log(`Phase 2: ${this.phase_adjust}`);
    }
    onRotate(){}

    //internal method
    getImage(){
        console.log('get selected');
        //Set the image src
        this.image.src = document.getElementById("canvas-real").toDataURL();
        //set the imgX and Y position in the DataURL
        this.imgX = this.startpt.x;
        this.imgY = this.startpt.y;
        //store the original img width and height for scaling afterward
        this.imgWidth = this.boxWidth;
        this.imgHeight = this.boxHeight;
        //put a white rect at the real canvas draft
        this.contextReal.save();
        this.contextReal.fillStyle = "#FFFFFF";
        this.contextReal.beginPath();
        this.contextReal.fillRect(this.startpt.x, this.startpt.y, this.boxWidth, this.boxHeight);
        this.contextReal.restore();
        this.image.onload = ()=>{
            //console.log('image loaded');
            document.getElementById("canvas-draft").getContext('2d').drawImage(this.image, this.imgX, this.imgY, this.boxWidth, this.boxHeight, this.startpt.x, this.startpt.y, this.boxWidth, this.boxHeight);
            //console.log(this.image);
        };
        
        console.log('print selected');
    }

    /*drawLine(){
        this.contextDraft.save();
        this.contextDraft.strokeStyle = this.contextReal.strokeStyle = "red";
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.startpt.x, this.startpt.y);
        this.contextDraft.lineTo(this.endpt.x, this.endpt.y);
        this.contextDraft.stroke();
        this.contextDraft.restore();
    }*/

    movePos(){
        //get the different between end point and prevCoord then move the start point
        console.log(`Moving from ${JSON.stringify(this.prevCoord)} to ${JSON.stringify(this.movept.x)} `);
        let x_change = this.movept.x - this.prevCoord.x;
        let y_change = this.movept.y - this.prevCoord.y;
        this.startpt = {x: this.startpt.x +x_change , y: this.startpt.y +y_change}
        this.endpt = {x: this.endpt.x +x_change , y: this.endpt.y +y_change}
    }

    printCanvasReal(){
        //get the scaling then scale canvas
        this.contextReal.scale(this.scaleX, this.scaleY);
        //draw the scaled image in the canvas
        document.getElementById("canvas-real").getContext('2d').drawImage(this.image, 
                            this.imgX, this.imgY, this.imgWidth, this.imgHeight,
                            this.startpt.x/this.scaleX, this.startpt.y/this.scaleY, this.imgWidth, this.imgHeight);
        //unscale the canvas
        this.contextReal.setTransform(1, 0, 0, 1, 0, 0);
    }

    scaleCanvasDraft(){
        //get the scaling then scale canvas
        this.scaleX = this.boxWidth/this.imgWidth;
        this.scaleY = this.boxHeight/this.imgHeight;
        this.contextDraft.scale(this.scaleX, this.scaleY);
        //draw the scaled image in the canvas
        document.getElementById("canvas-draft").getContext('2d').drawImage(this.image, 
                            this.imgX, this.imgY, this.imgWidth, this.imgHeight,
                            this.startpt.x/this.scaleX, this.startpt.y/this.scaleY, this.imgWidth, this.imgHeight);
        //unscale the canvas
        this.contextDraft.setTransform(1, 0, 0, 1, 0, 0);
    }

    getBoxSize(){
        this.boxWidth = this.endpt.x - this.startpt.x;
        this.boxHeight = this.endpt.y - this.startpt.y;
    }

    drawRect(){
        //This is only used to draw the 4 CPs and the border line

        //Get the rect height and width
        this.getBoxSize();
        //console.log(`${this.boxWidth} and ${this.boxHeight}`)


        //set initial style
        this.contextDraft.save();

        //control point style set
        this.contextDraft.lineWidth = this.contextReal.lineWidth = 2;
        this.contextDraft.strokeStyle = this.contextReal.strokeStyle = "black";
        this.contextDraft.fillStyle = this.contextReal.fillStyle = "transparent";
        this.contextDraft.setLineDash([2, 4]);

        //print out the end corner control point
        this.drawCPDraft(this.endpt.x, this.endpt.y);
        //this.drawCPDraft(this.startpt.x, this.startpt.y);
        
        //Draw centre point - this.drawCPDraft(this.centre_pt.x, this.centre_pt.y);

        //draw out the rectangle
        this.contextDraft.beginPath();
        this.contextDraft.rect(this.startpt.x, this.startpt.y, this.boxWidth, this.boxHeight);
        this.contextDraft.stroke();

        //restore previous setting
        this.contextDraft.restore();
    }

    drawCPDraft(x, y){
        //draw circle on current mouse point
        this.contextDraft.beginPath();
        this.contextDraft.arc(x, y, this.cp_size/2, 0, 2*Math.PI);
        this.contextDraft.stroke();
    }


    between(test, num1, num2){
        return test >= num1 && test <= num2;
    }

    checkCP(x,y){
        // check which point is clicked and the diagonal becomes the start point
        if ((this.between(x,this.endpt.x - this.cp_size/2, this.endpt.x + this.cp_size/2))
            && (this.between(y,this.endpt.y - this.cp_size/2, this.endpt.y+ this.cp_size/2))){
            this.scale = true;
            console.log('Scaling point was clicked');
        } else {
            //draw the path out and use isPointInPath
            this.contextDraft.beginPath();
            this.contextDraft.moveTo(this.startpt.x, this.startpt.y);
            this.contextDraft.lineTo(this.startpt.x, this.endpt.y);
            this.contextDraft.lineTo(this.endpt.x, this.endpt.y);
            this.contextDraft.lineTo(this.endpt.x, this.startpt.y);
            this.contextDraft.closePath();
            console.log(this.contextDraft.isPointInPath(x,y));
            if (this.contextDraft.isPointInPath(x,y)){
                this.move = true;
                this.movept = {x: x, y: y};
                console.log('The box is ready to be moved');
            } else{
                console.log('Ready to end the value');
                //if the mouse is not clicked inside the circle then end phase adjust and cancel
                this.finish = true;
            }
        }
    }
}