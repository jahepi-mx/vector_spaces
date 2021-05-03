class VectorUtils {

    constructor() {
        this.toRadians = Math.PI / 180;
        this.toDegrees = 180 / Math.PI;
    }

    getYawMatrix(degrees) {
        var cos = Math.cos(degrees * this.toRadians);
        var sin = Math.sin(degrees * this.toRadians);
        var matrix = [
            cos,  0,  sin,
            0,    1,  0,
            -sin, 0,  cos
        ];
        return matrix;
    }

    getPitchMatrix(degrees) {
        var cos = Math.cos(degrees * this.toRadians);
        var sin = Math.sin(degrees * this.toRadians);
        var matrix = [
            1,  0,    0,
            0,  cos,  -sin,
            0,  sin,  cos
        ];
        return matrix;
    }

    getMatrix(x, y, z) {
        var matrix = [
            x.x, y.x, z.x,
            x.y, y.y, z.y,
            x.z, y.z, z.z
        ];
        return matrix;
    }

    inverse(matrix) {
        var inversed = new Array(); 
        inversed[0] = matrix[0];
        inversed[1] = matrix[3];
        inversed[2] = matrix[6];
        inversed[3] = matrix[1];
        inversed[4] = matrix[4];
        inversed[5] = matrix[7];
        inversed[6] = matrix[2];
        inversed[7] = matrix[5];
        inversed[8] = matrix[8];
        return inversed;
    }

    mulMatrix(a, b) {
        var matrix = new Array();
        matrix[0] = a[0] * b[0] + a[1] * b[3] + a[2] * b[6];
        matrix[1] = a[0] * b[1] + a[1] * b[4] + a[2] * b[7];
        matrix[2] = a[0] * b[2] + a[1] * b[5] + a[2] * b[8];

        matrix[3] = a[3] * b[0] + a[4] * b[3] + a[5] * b[6];
        matrix[4] = a[3] * b[1] + a[4] * b[4] + a[5] * b[7];
        matrix[5] = a[3] * b[2] + a[4] * b[5] + a[5] * b[8];

        matrix[6] = a[6] * b[0] + a[7] * b[3] + a[8] * b[6];
        matrix[7] = a[6] * b[1] + a[7] * b[4] + a[8] * b[7];
        matrix[8] = a[6] * b[2] + a[7] * b[5] + a[8] * b[8];
        return matrix;
    }

    getDirVector(phi, theta) {
        phi = phi * this.toRadians;
        theta = theta * this.toRadians;

        var x = Math.cos(phi) * Math.cos(theta);
        var y = Math.sin(theta);
        var z = Math.sin(phi) * Math.cos(theta);
        return new Vector(x, y, z);

    }

}