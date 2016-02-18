var posHeroY = 200;
var posHeroX = 0;
var dt = 100; // Tiempo de refresco en milisegundos.
var enemySpeed = 50000; // pixeles por segundo
var ms2sec = 1000; // Para pasar de segundos a milisegundos.
var canvas;
var ctx;
var shapes = [];
const desp = 25;
var count = 0;
var level = 0;
var heal = 3;
var click = 8;

function Hero(id, y, rad, color){
    this.id = id;
    this.x = rad;
    this.y = y;
    this.rad = rad;
    this.color = color;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.move = function(despY){
        this.y = this.y + despY;
        if((this.y - this.rad) < 0){
            this.y = this.rad;
        }
        if((this.y + this.rad) >= canvas.height){
            this.y = canvas.height - this.rad;
        }
        drawShapes();
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
        if((this.y + this.sy) < canvas.height ){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.sx, this.sy);
        }else{
            ctx.fillStyle = this.color;
            this.y = canvas.height - this.sy;
            ctx.fillRect(this.x, this.y, this.sx, this.sy);
        }  
    }

    this.move = function(despx){
        this.x = this.x + despx;
        drawShapes();    
    }
}

function gameOver(){
    alert("GAME OVER");
    document.location.reload();
}

function moveEnemies(){
    // mueve a todas las naves enemigas y comprueba si se salen del limite del canvas
    var i;
    
    for(i = 1; i < shapes.length; i++){
        if((shapes[i].x - enemySpeed/ms2sec) > -10 ){
            shapes[i].move(-(enemySpeed/ms2sec));
        }else{
            shapes.splice(i,1);
        }
    }
}

function checkCollides(){
    //Comprueba colisiones y cambia el valor de las vidas.
    var posBack;
    var posFront;
    var posLeft;
    var posRight;
    var i;
    
    posBack = shapes[0].x - shapes[0].rad;
    posFront = shapes[0].x + shapes[0].rad;
    posLeft = shapes[0].y - shapes[0].rad;
    posRight = shapes[0].y + shapes[0].rad;

    for(i = 1; i < shapes.length; i++){
        if(((shapes[i].x + shapes[i].sx) <= posFront)){
            if(((shapes[i].y + shapes[i].sy) <= posRight) && ((shapes[i].y + shapes[i].sy) >= posLeft)){
                if(heal > 0){                
                    heal = heal - 1;
                    if(heal === 0){
                        gameOver();
                    }
                }
            }
        }
    }
}

function drawShapes(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(x in shapes){
        shapes[x].draw();
    }

    ctx.font = '10pt Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('LEVEL: '+ level , 1000, 20);
    ctx.fillText('LIVES: '+ heal , 1000, 40);
    ctx.fillText('POINTS: '+ count, 1000,60);
}

function getShape(id) {
    for(x in shapes) {
        if(shapes[x].id === id){
            return shapes[x];
        }
    }
}

function keyHandler(event) {
    var obj;
    obj = getShape("hero");
    if(obj === undefined)
        return;

    switch(event.key) {
        case "w":
        obj.move(-desp);
        break;
    case "s":
        obj.move(+desp);
        break;
    default:
        console.log("Key not handled");
  }
}

function render() {
    var obj = getShape("hero");
    if((count === 1) || ((count % click) === 0 )){
        shapes.push(new Enemy("Enemy"+count , canvas.width, 400*(Math.random()), 40, 20, 'rgba(255, 0, 0, 0.5)'));
    }
    checkCollides();
    moveEnemies();
    count++;
    drawShapes();
    if((count % 150) === 0){
        level = level + 1;
        enemySpeed = enemySpeed + 10000;
        if(enemySpeed === 70000){
            click = 5;
        }
    }
}

function main(){
    canvas = document.getElementById('espacioexterior');

    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    ctx = canvas.getContext('2d');
    document.addEventListener('keydown', keyHandler, false);
    
    shapes.push(new Hero("hero", posHeroY, 20, 'rgba(0, 0, 255, 1)'));

    setInterval(render, dt);
}




