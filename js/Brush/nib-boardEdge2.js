class BoardEdge2 extends PaintFunction {

    constructor(contextReal, contextDraft) {
        super();
        this.context = contextReal;
        this.lastPoint = {};
        this.currentPoint = {};
        this.lineheight = 15;
        this.linewidth = 6;
        this.context.fillStyle = rgbaColor;
    }

    onMouseDown(coord, event) {
        this.context.fillStyle = rgbaColor;
        this.lineheight = 15 + parseInt($("#size_field").val());
        this.linewidth = 6 + parseInt($("#size_field").val()) / 2.5;
        this.context.fillStyle = rgbaColor;
        this.lastPoint = { x: coord[0], y: coord[1] };
    }

    onDragging(coord, event) {
        this.context.fillStyle = rgbaColor;
        this.currentPoint = { x: coord[0], y: coord[1] };
        let dist = this.distanceBetween(this.lastPoint, this.currentPoint);
        let angle = this.angleBetween(this.lastPoint, this.currentPoint);

        for (var i = 0; i < dist; i++) {
            let x = this.lastPoint.x + (Math.sin(angle) * i);
            let y = this.lastPoint.y + (Math.cos(angle) * i);
            this.drawSlash(x, y);
        }
        this.lastPoint = this.currentPoint
    }

    onMouseMove() { }
    onMouseUp() {}
    onMouseLeave() { }
    onMouseEnter() { }

    distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }

    angleBetween(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }

    drawSlash(x, y) {
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x + this.linewidth, y);
        this.context.lineTo(x, y - this.lineheight);
        this.context.lineTo(x - this.linewidth, y - this.lineheight);
        this.context.closePath();
        this.context.fill();
    }

}