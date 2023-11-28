export default class Snake {
    constructor(_posX, _posY) {
        this.coor = _posX;
        this.coorY = _posY;
    }
    getCoorX() {
        return this.coor;
    }

    getCoorY() {
        return this.coorY;
    }
}