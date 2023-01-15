var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};

let maxSpeed = 1;

let n = 300;

let friction = 30;

let colorArray = ["#4a4e69","#9a8c98","#c9ada7","#f2e9e4"]

function mouseMove(event){
    mouse.x = event.x;
    mouse.y = event.y;
}

function browserResize(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('mousemove', mouseMove);
window.addEventListener('resize', browserResize);

function Circle(x, y, r, dxdt, dydt, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dxdt = dxdt;
    this.dydt = dydt;
    this.color = color;

    this.draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        context.stroke();
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.fill();
    }

    this.update = function() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        let r2 = (dx * dx) + (dy * dy);

        ddxdtdt = dx / r2;
        ddydtdt = dy / r2;

        dirx = this.dxdt > 0 ? 1 : -1;
        diry = this.dydt > 0 ? 1 : -1;
        
        this.dxdt = Math.abs(this.dxdt + ddxdtdt) < maxSpeed ? this.dxdt + ddxdtdt : maxSpeed * dirx;
        this.dydt = Math.abs(this.dydt + ddydtdt) < maxSpeed ? this.dydt + ddydtdt : maxSpeed * diry;

        this.x = (this.x + this.dxdt + ddxdtdt / 2) % canvas.width;
        this.y = (this.y + this.dydt + ddydtdt / 2) % canvas.height;
    }
}

const circles = [];

for (let i = 0; i < n; i++){
    let r = 5 + (Math.random() * 10);
    let x = Math.random() * (canvas.width - 2 * r) + r;
    let y = Math.random() * (canvas.height - 2 * r) + r;
    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 5;
    let color = colorArray[Math.floor(Math.random() * colorArray.length)]
    circles.push(new Circle(x, y, r, dx, dy, color));
}

let i = 0;

function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = "#22223b";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < n; i++){
        circles[i].update();
        circles[i].draw();
    }
}

animate();