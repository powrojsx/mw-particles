class Particle {
    constructor(canvas, ctx, size) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.size = size;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;

        this.velocity = {
            x: Math.random() * 2,
            y: Math.random() * 2
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
        // this.size = size;
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
        this.initNetwork();
        this.updateParticles();

    }

    initNetwork() {
        this.particles = [];
        for (let i = 0; i < 70; i++) {
            this.particles.push(new Particle(this.canvas, this.ctx, Math.random() * 6));
        }
    }

    updateParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for(let i = 0; i < this.particles.length; i++) {
            
            this.particles[i].updateParticle();
            this.particles[i].drawParticle();

            for(let g = this.particles.length - 1; g > i; g--) {
                let distance = Math.hypot(this.particles[i].x - this.particles[g].x, this.particles[i].y - this.particles[g].y);
                if (distance > 110) {
                    continue;
                }

                this.ctx.beginPath();
                this.ctx.strokeStyle = "#ffffff";
                this.ctx.lineWidth = 1;
                this.ctx.globalAlpha = 0.6;
                this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                this.ctx.lineTo(this.particles[g].x, this.particles[g].y);
                this.ctx.stroke();
            }
        }

        requestAnimationFrame(this.updateParticles.bind(this));
    }
}

new Particles(document.getElementById('canvas'));