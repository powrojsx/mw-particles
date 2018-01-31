class Particle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;

        this.velocity = {
            x: 0.5,
            y: 0.5
        }
    }

    updateParticle() {
        if(this.x > this.canvas.width || this.x < 0) {
            this.velocity.x = -this.velocity.x;
        }

        if(this.y > this.canvas.height || this.y < 0) {
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    drawParticle() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#000000";
        this.size = Math.random() * 8;
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
        this.ctx.fill();
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
}

class Particles {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        // this.ctx.fillStyle = "#353638";
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.initNetwork();
        this.updateParticles();

    }

    initNetwork() {
        this.particles = [];
        for (let i = 0; i < 50; i++) {
            this.particles.push(new Particle(this.canvas, this.ctx));
        }

        requestAnimationFrame(this.updateParticles());
    }

    updateParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for(let i = 0; i < this.particles.length; i++) {
            this.particles[i].updateParticle();
            this.particles[i].drawParticle();
        }

        
    }
}

new Particles(document.getElementById('canvas'));