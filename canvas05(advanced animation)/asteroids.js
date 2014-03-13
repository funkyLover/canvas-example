$(document).ready(function(){
    var canvas = $("#myCanvas");
    var context = canvas.get(0).getContext("2d");
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();

    $(window).resize(resizeCanvas);

    function resizeCanvas(){
        canvas.attr("width",$(window).get(0).innerWidth);
        canvas.attr("height",$(window).get(0).innerHeight);
        canvasWidth = canvas.width();
        canvasHeight = canvas.height();
    }
    resizeCanvas();
    var playAnimation = true;
    var startButton = $("#startAnimation");
    var stopButton = $("#stopAnimation");

    startButton.hide();
    startButton.click(function(){
        $(this).hide();
        stopButton.show();
        playAnimation = true;
        animate();
    });
    stopButton.click(function(){
        $(this).hide();
        startButton.show();
        playAnimation = false;
    });
    var Asteroid = function(x,y,radius,mass,vX,vY,aX,aY){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = mass;
        this.vX = vX;
        this.vY = vY;
        this.aX = aX;
        this.aY = aY;

    };
    var asteroids = new Array();
    var x;
    var y;
    var radius;
    var mass;
    var vX;
    var vY;
    var aX;
    var aY;
    for(var i=0;i<10;i++){
        x = 20 + (Math.random() * (canvasWidth - 40));
        y = 20 + (Math.random() * (canvasHeight - 40));
        radius = 15 + Math.random() * 10;
        mass = radius/2;
        vX = Math.random() * 8 - 2;
        vY = Math.random() * 8 - 2;
        aX = Math.random() * 0.2 - 0.1;
        aY = Math.random() * 0.2 - 0.1;
        asteroids.push(new Asteroid(x,y,radius,mass,vX,vY,aX,aY));
    }
    function animate(){
        context.clearRect(0,0,canvasWidth,canvasHeight);
        context.fillStyle = "rgb(255,255,255)";
        var asteroidsLength = asteroids.length;
        var tmpAsteroid = null;
        var tmpAsteroidB = null;
        var dx;
        var dy;
        var distance;
        var angle;
        var sine;
        var cosine;
        var x;
        var y;
        var xb;
        var yb;
        var vx;
        var vy;
        var vxb;
        var vyb;
        var  vTotal;
        for(var i=0;i<asteroidsLength;i++){
            tmpAsteroid = asteroids[i];
            for(var j=i+1;j<asteroidsLength;j++){
                tmpAsteroidB = asteroids[j];
                dx = tmpAsteroidB.x - tmpAsteroid.x;
                dy = tmpAsteroidB.y - tmpAsteroid.y;
                distance = Math.sqrt((dx * dx) + (dy * dy));
                if(distance < tmpAsteroid.radius + tmpAsteroidB.radius){
                    angle = Math.atan2(dy,dx);
                    sine = Math.sin(angle);
                    cosine = Math.cos(angle);
                    x = 0;
                    y = 0;
                    xb = dx * cosine + dy * sine;
                    yb = dy * cosine - dx * sine;
                    vx = tmpAsteroid.vX * cosine + tmpAsteroid.vY * sine;
                    vy = tmpAsteroid.vY * cosine - tmpAsteroid.vX * sine;
                    vxb = tmpAsteroidB.vX * cosine + tmpAsteroidB.vY * sine;
                    vyb = tmpAsteroidB.vY * cosine - tmpAsteroidB.vX * sine;

                    /*vx *= -1;
                    vxb *= -1;*/
                    vTotal = vx - vxb;
                    vx = ((tmpAsteroid.mass - tmpAsteroidB.mass) * vx + 2 * tmpAsteroidB.mass * vxb)/(tmpAsteroid.mass + tmpAsteroidB.mass);
                    vxb = vTotal + vx;
                    xb = x + (tmpAsteroid.radius + tmpAsteroidB.radius);

                    tmpAsteroid.x = tmpAsteroid.x + (x * cosine - y * sine);
                    tmpAsteroid.y = tmpAsteroid.y + (y * cosine + x * sine);
                    tmpAsteroidB.x = tmpAsteroid.x + (xb * cosine - yb * sine);
                    tmpAsteroidB.y = tmpAsteroid.y + (yb * cosine + xb * sine);
                    tmpAsteroid.vX = vx * cosine - vy * sine;
                    tmpAsteroid.vY = vy * cosine + vx * sine;
                    tmpAsteroidB.vX = vxb * cosine - vyb * sine;
                    tmpAsteroidB.vY = vyb * cosine + vxb * sine;
                }
            }
            if(tmpAsteroid.x - tmpAsteroid.radius < 0){
                tmpAsteroid.x = tmpAsteroid.radius;
                tmpAsteroid.vX *= -1;
               //tmpAsteroid.aX *= -1;
            }else if(tmpAsteroid.x + tmpAsteroid.radius > canvasWidth){
                tmpAsteroid.x = canvasWidth - tmpAsteroid.radius;
                tmpAsteroid.vX *= -1;
               // tmpAsteroid.aX *= -1;
            }
            if(tmpAsteroid.y - tmpAsteroid.radius < 0){
                tmpAsteroid.y = tmpAsteroid.radius;
                tmpAsteroid.vY *= -1;
               // tmpAsteroid.aY *= -1;
            }else if(tmpAsteroid.y + tmpAsteroid.radius > canvasHeight){
                tmpAsteroid.y = canvasHeight - tmpAsteroid.radius;
                tmpAsteroid.vY *= -1;
              //  tmpAsteroid.aY *= -1;
            }
            tmpAsteroid.x += tmpAsteroid.vX;
            tmpAsteroid.y += tmpAsteroid.vY;
           /* if(Math.abs(tmpAsteroid.vX) < 10){
                tmpAsteroid.vX += tmpAsteroid.aX;
            }
            if(Math.abs(tmpAsteroid.vY) < 10){
                tmpAsteroid.vY += tmpAsteroid.aY;
            }
            if(Math.abs(tmpAsteroid.vX) > 0.1){
                tmpAsteroid.vX *= 0.9;
            }else{
                tmpAsteroid.vX = 0;
            }
            if(Math.abs(tmpAsteroid.vY) > 0.1){
                tmpAsteroid.vY *= 0.9;
            }else{
                tmpAsteroid.vY = 0;
            }*/
            context.beginPath();
            context.arc(tmpAsteroid.x,tmpAsteroid.y,tmpAsteroid.radius,0,Math.PI*2,false);
            context.closePath();
            context.fill();
        }
        if(playAnimation){
            setTimeout(animate,33);
        }
    }
    animate();

});