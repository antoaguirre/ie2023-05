let branches = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let root = new Branch(width / 2, height, 100, -PI / 2, 4);
  branches.push(root);
}

function draw() {
  background(220);
  for (let i = branches.length - 1; i >= 0; i--) {
    let branch = branches[i];
    branch.show();
    branch.update();
    if (branch.shouldBranch()) {
      let left = branch.branch(PI / 4);
      let right = branch.branch(-PI / 4);
      branches.push(left);
      branches.push(right);
    }
    if (branch.finished()) {
      branches.splice(i, 1);
    }
  }
}

class Branch {
  constructor(x, y, len, angle, generation) {
    this.pos = createVector(x, y);
    this.len = len;
    this.angle = angle;
    this.generation = generation;
    this.speed = map(this.generation, 0, 4, 2, 0.2);
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(0);
    strokeWeight(this.generation);
    line(0, 0, 0, -this.len);
    pop();
  }

  update() {
    this.pos.x += cos(this.angle) * this.speed;
    this.pos.y += sin(this.angle) * this.speed;
  }

  branch(angleOffset) {
    let newLen = this.len * 0.67;
    let newAngle = this.angle + angleOffset;
    return new Branch(this.pos.x, this.pos.y, newLen, newAngle, this.generation - 1);
  }

  shouldBranch() {
    return this.generation > 0 && random(1) < 0.02;
  }

  finished() {
    return this.len < 2 || this.generation == 0;
  }
}

