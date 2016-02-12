var posHeroY = 200;
var posHeroX = 0;
var posEnemyX = 600;
var dt = 100; // Tiempo de refresco en milisegundos.
var enemySpeed = 50; // pixeles por segundo
var ms2sec = 1000; // Para pasar de segundos a milisegundos.
var canvas;
var ctx;

function Hero(id, y, rad, color){
    this.id = id;
    this.x = posHeroX;
    this.y = y;
    this.rad = rad;
    this.color;

    this.move = function(despY){
        this.y = this.y + despY;
        if((this.y - this.rad) < 0){
            this.y = this.rad;
        }
        if(this.y + this.rad >= canvas.width){
            this.y = canvas.width - this.rad;
        }
    }
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radious, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function Enemy(id, x, y, sx, sy, color){
    this.id = id;
    this.x = x;
    this.y = y;
    this.sx = sx;
    this.sy = sy;
    this.color = color;
    
    this.draw = function(){
    }
}

function main(){
}
