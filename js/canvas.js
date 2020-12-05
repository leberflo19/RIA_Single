jQuery(document).ready(function() {
    const canvas = $("#myCanvas")[0];
    const ctx = canvas.getContext("2d");

    let dx = 2;
    let dy = -2;
    
    let paddle = new Paddle(12, 85, (canvas.width-85)/2, 'black');
    let ball = new Ball(canvas.width/2, canvas.height-30, 10, 'orange');

    let rightPressed = false;
    let leftPressed = false;
    let brickColumnCount = 4;
    let brickRowCount = 1;

    let score = 0;

    let bricks = [];
    for(let c=0; c<brickRowCount+1; c++) {
        bricks[c] = [];
        for(let r=0; r<brickColumnCount; r++) {
            bricks[c][r] = new Brick(0, 0, 1, getRandomColor());
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

    function mouseMoveHandler(e) {
        let relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddle.x = relativeX - paddle.width/2;
        }
    }

    function collisionDetection() {
        for(let c=0; c<brickRowCount; c++) {
            for(let r=0; r<brickColumnCount; r++) {
                let b = bricks[c][r];
                if(b.status == 1) {
                    if(ball.x > b.x && ball.x < b.x + b.width && ball.y > b.y && ball.y < b.y+b.height) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    
                    if(score == brickColumnCount*brickRowCount) {
                            document.location.reload();
                            drawStartMenu('');
                        }
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    }


    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddle.x, canvas.height-paddle.height, paddle.width, paddle.height);
        ctx.fillStyle = paddle.color;
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
    
        for(let c=0; c<brickRowCount; c++) {
            for(let r=0; r<brickColumnCount; r++) {
                let brick = bricks[c][r];
                if(brick.status == 1) {
                    let brickX = (r*(brick.width+brick.padding))+brick.offsetLeft;
                    let brickY = (c*(brick.height+brick.padding))+brick.offsetTop;
                    brick.x = brickX;
                    brick.y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brick.width, brick.height);
                    ctx.fillStyle = brick.color;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Punkte: "+score, 8, 20);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
            
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        collisionDetection();

        if(ball.x + dx > canvas.width-ball.radius || ball.x + dx < ball.radius) {
            dx = -dx;
        }
        if(ball.y + dy < ball.radius) {
            dy = -dy;
        }
        else if(ball.y + dy > canvas.height-ball.radius) {
            if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                dy = -dy;
            }
            else {
                document.location.reload();
                drawStartMenu('');
            }
        }

        if(rightPressed && paddle.x < canvas.width-paddle.width) {
            paddle.x += 7;
        }
        else if(leftPressed && paddle.x > 0) {
            paddle.x -= 7;
        }

        ball.x += dx;
        ball.y += dy;      
    }

    function updateBricks(){
        ++brickRowCount;
        bricks.unshift([]);
        for(let c=0; c<brickColumnCount; c++) {
            bricks[0][c] = new Brick(0, 0, 1, getRandomColor());
        }
    }

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    drawStartMenu('Starten');

    function drawStartMenu(title){
        canvas.addEventListener('click', function(evt) {
            setInterval(draw, 10);
            setInterval(updateBricks, 2999);
        }, false);

        ctx.beginPath();
        ctx.rect(20, canvas.height/2-100, canvas.width-40, canvas.height/2.5); 
        ctx.fillStyle = 'black'; 
        ctx.fillStyle = 'rgba(225,225,225,0.5)';
        ctx.fillRect(25,72,32,32);
        ctx.fill(); 
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black'; 
        ctx.stroke();
        ctx.closePath();
        ctx.font = '40pt Kremlin Pro Web';
        ctx.fillStyle = 'black';
        ctx.fillText(title, 100, 200);
    }
});
