class VectorSpace {

    constructor(position, zAxis) {
        this.position = position;
        this.xAxis = null;
        this.yAxis = null;
        this.zAxis = zAxis.nor(); 
        this.calculateAxis();
    }

    calculateAxis() {
        var up = new Vector(0, 1, 0);
        this.xAxis = up.cross(this.zAxis).nor();
        this.yAxis = this.zAxis.cross(this.xAxis).nor();
    }

    draw(context) {
        var len = 40;

        var zAxisP = this.zAxis.mul(len).add(this.position).project();
        this.drawLine(context, this.position.project(), zAxisP, '#ff0000');

        var yAxisP = this.yAxis.mul(len).add(this.position).project();
        this.drawLine(context, this.position.project(), yAxisP, '#00ff00');

        var xAxisP = this.xAxis.mul(len).add(this.position).project();
        this.drawLine(context, this.position.project(), xAxisP, '#0000ff');

    }

    drawLine(context, start, end, color) {
        context.beginPath();
        context.moveTo(halfWidth + start.x, halfHeight - start.y);
        context.lineTo(halfWidth + end.x, halfHeight - end.y);
        context.strokeStyle = color;
        context.stroke();
    }

    inverse() {
        var mA = utils.getMatrix(this.xAxis, this.yAxis, this.zAxis);
        var mB = utils.inverse(mA);
        mB = utils.mulMatrix(mA, mB); // Identity matrix, just for testing
        this.xAxis = new Vector(mB[0], mB[3], mB[6]);
        this.yAxis = new Vector(mB[1], mB[4], mB[7]);
        this.zAxis = new Vector(mB[2], mB[5], mB[8]);

    }

    yaw(degrees) {
        var yaw = utils.getYawMatrix(degrees);
        var mA = utils.getMatrix(this.xAxis, this.yAxis, this.zAxis);
        var mB = utils.inverse(mA);
        var mC = utils.mulMatrix(yaw, mB);
        var m = utils.inverse(mC);
        this.xAxis = new Vector(m[0], m[3], m[6]);
        this.yAxis = new Vector(m[1], m[4], m[7]);
        this.zAxis = new Vector(m[2], m[5], m[8]);
    }

    pitch(degrees) {
        var pitch = utils.getPitchMatrix(degrees);
        var mA = utils.getMatrix(this.xAxis, this.yAxis, this.zAxis);
        var mB = utils.inverse(mA);
        var mC = utils.mulMatrix(pitch, mB);
        var m = utils.inverse(mC);
        this.xAxis = new Vector(m[0], m[3], m[6]);
        this.yAxis = new Vector(m[1], m[4], m[7]);
        this.zAxis = new Vector(m[2], m[5], m[8]);
    }

    clone() {
        return new VectorSpace(this.position.clone(), this.zAxis.clone());
    }

}