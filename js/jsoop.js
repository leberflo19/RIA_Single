class Ball{

    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

}


class Paddle{
    constructor(height, width, x, color){
        this.x = x;
        this.height = height;
        this.width = width;
        this.color = color;
    }

}

class Brick{

    width = 55;
    height = 20;
    padding = 10;
    offsetTop = 30;
    offsetLeft = 30;

    constructor(x, y, status, color){
        this.x = x;
        this.y = y;
        this.status = status;
        this.color = color;
    }
}

class POI{
    constructor(lat, long, description){
        this.lat = lat;
        this.long = long;
        this.description = description;
    }
}