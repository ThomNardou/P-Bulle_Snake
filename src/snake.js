let coor = 0
let coorY = 0

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

    update(goingDown, goingUp, goingRight, goingLeft) {

        if (goingDown) {
            coorY += 100;
        }
    
        else if (goingUp) {
            coorY -= 100;
        }
    
        else if (goingRight) {
            coor += 100;
        }
    
        else if (goingLeft) {
            coor -= 100;
        }
    }
}