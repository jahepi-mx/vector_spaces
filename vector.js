class Vector {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    mul(scalar) {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    nor() {
        return this.mul(1 / this.len());
    }

    cross(vector) {
        var x = this.y * vector.z - this.z * vector.y;
        var y = this.z * vector.x - this.x * vector.z;
        var z = this.x * vector.y - this.y * vector.x;
        return new Vector(x, y, z);
    }

    clone() {
        return new Vector(this.x, this.y, this.z);
    }

    project() {
        var fl = (300 + this.z) / 300;
        return new Vector(this.x * fl, this.y * fl, 0);
    }
}