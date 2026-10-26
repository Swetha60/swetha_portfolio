const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let particles = [];

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    particles = Array.from({ length: Math.min(50, Math.floor(width / 18)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > width) p.speedX *= -1;
      if (p.y < 0 || p.y > height) p.speedY *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}
