var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');


n = 500;
m = 2;

context.strokeStyle = "blue";

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 30
let radiusChange = 2;

let colorArray = [
    '#264653',
    '#2A9D8F',
    '#E9C46A',
    '#F4A261',
    '#E76F51'
]

function mouseMove(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}

function browserResize(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('mousemove', mouseMove)
window.addEventListener('resize', browserResize)

function Circle(x, y, dx, dy, r, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.dr = 0;
    this.color = color;

    this.draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.r + this.dr, 0, Math.PI * 2, false);
        context.stroke();
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.fill();
    }

    this.update = function() {
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50){
            if (this.dr < maxRadius){
                this.dr += radiusChange;
            }
        }
        else if (this.dr > 0){
            this.dr -= radiusChange;
        }
    }
}

let circles = [];


function initialize() {
    circles = [];

    for(var i = 0; i < n; i++){
        let r = 5 + (Math.random() * 10);
        let x = Math.random() * (canvas.width - 2 * r) + r;
        let y = Math.random() * (canvas.height - 2 * r) + r;
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;
        let color = colorArray[Math.floor(Math.random() * colorArray.length)]
    
        var circle = new Circle(x, y, dx, dy, r, color);
        circles.push(circle);
    }    
}

initialize();

function animate() {

    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < n; i++){
        circles[i].update();
        circles[i].draw();    
    }
}

animate();

/*
context.fillStyle = "purple";

for (let i = 0; i < n; i++){
    for (let j = 0; j < m; j++){
        let x = window.innerWidth * (i + 1) / (3 * (n + 2))
        let y = window.innerHeight * (j + 1) / (3 * (m + 2))

        context.fillRect(x, y, 50, 50);
    }
}

context.beginPath();
context.moveTo(400, 100);
context.lineTo(400, 400);
context.lineTo(500, 500);
context.strokeStyle = "green"
context.stroke();

context.beginPath();
context.arc(300, 300, 30, 0, Math.PI * 2, false);
context.stroke();
*/


/*
x_0 = canvas.width / 2;
y_0 = canvas.height / 2;
r_1 = 100;
r_2 = 10;
r_range = 20;
theta = 2 * Math.PI / n;

for (let i = 0; i < n; i++){
    theta_i = i * theta;
    x_i = x_0 + Math.cos(theta_i) * r_1;
    y_i = y_0 + Math.sin(theta_i) * r_1;
    r_3 = r_2 + Math.random() * r_range;
    context.beginPath();
    context.arc(x_i, y_i, r_3, 0, Math.PI * 2, false);
    context.stroke();
}
*/
