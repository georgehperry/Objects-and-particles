
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let rectangles = [];
let circles = [];
let i,j = 0;
let stop = false;
const circlesMax = 800;
const button = document.getElementsByTagName('button')[0];
button.addEventListener("click", pause);

const c = canvas.getContext('2d');

class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle extends Shape {
  constructor(x, y, width, height) {
    super(x, y);
    this.width = width;
    this.height = height;
  }
  fillRect = () => c.strokeRect(this.x, this.y, this.width, this.height);
}

class Circle extends Shape {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
  }
  fillCircle = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    c.stroke();
    c.strokeStyle = `#${colour()}`;
  }
}

function createRectangle(x, y, width, height) {
  let rec = (x === undefined || y === undefined) ? new Rectangle(Math.random() * window.innerWidth, Math.random() * window.innerHeight,
  Math.random() * 100, Math.random() * 100) : new Rectangle(x, y, width, height);

  rec.fillRect();

  rectangles.push(rec);
  if (i > 0) {rectangles.shift();};
  i++;
}

function createCircle(x, y, r) {
  let cir = (x === undefined || y === undefined) ? new Circle(Math.random() * window.innerWidth, Math.random() * window.innerHeight,
  Math.random() * 50) : new Circle(x, y, r);
  cir.fillCircle();

  circles.push(cir);
  if (j > 0) circles.shift();
  j++;
}
function createInitialCircle() {
  let initialCir = new Circle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, Math.random() * 30);

  initialCir.fillCircle();

  circles.push(initialCir);
}

function leftRightClick(event) {
  event = event || window.event;
  event.which == 1 ? createInitialCircle() : createRectangle();
}

function animate(){
  if (!stop && circles.length < circlesMax) requestAnimationFrame(animate);

  circles.forEach(function(shape) {
    direction(shape);
    createCircle(shape.x, shape.y, shape.r);
  });

  // rectangles.forEach(function(shape) {
  //   c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  //   direction(shape);
  //   createRectangle(shape.x, shape.y, shape.width, shape.height);
  // });

}

function direction(s) {
  let x = Math.random();
  if (x < 0.25) {
    s.x += -20;
  } else if(x >= 0.25 && x < 0.5) {
    s.y += 20;
  } else if(x >= 0.5 && x < 0.75) {
    s.x += 20;
  } else {
    s.y += -20;
  }
}

function pause() {
  stop = true;
}

function colour() {
  return Math.floor(Math.random()*16777215).toString(16);
}


setInterval(function(){
  if (!stop && circles.length < circlesMax) createInitialCircle();
}, 50);

// canvas.addEventListener("mousedown", leftRightClick);
animate();
// createRectangle();
createInitialCircle();
