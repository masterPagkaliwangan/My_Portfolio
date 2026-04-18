import { useEffect, useRef } from 'react';

function BubbleBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });
  const bubbles = useRef([]);
  const pulses = useRef([]);
  const heroAttractor = useRef({ x: null, y: null, radius: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const random = (min, max) => Math.random() * (max - min) + min;

    const createBubbles = () => {
      bubbles.current = Array.from({ length: 28 }, (_, index) => ({
        x: random(0, window.innerWidth),
        y: random(0, window.innerHeight),
        radius: random(10, 40),
        alpha: random(0.12, 0.28),
        speedX: random(-0.45, 0.55),
        speedY: random(-0.35, 0.5),
        drift: random(-0.15, 0.15),
        hue: 190 + index * 8,
      }));
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 11, 29, 0.14)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      pulses.current = pulses.current.filter((pulse) => {
        const gradient = ctx.createRadialGradient(
          pulse.x,
          pulse.y,
          pulse.radius * 0.4,
          pulse.x,
          pulse.y,
          pulse.radius
        );
        gradient.addColorStop(0, `hsla(${pulse.hue}, 100%, 84%, ${pulse.alpha})`);
        gradient.addColorStop(0.4, `hsla(${pulse.hue}, 95%, 78%, ${pulse.alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${pulse.hue}, 90%, 60%, 0)`);

        ctx.save();
        ctx.shadowColor = `hsla(${pulse.hue}, 100%, 84%, ${pulse.alpha * 0.7})`;
        ctx.shadowBlur = pulse.radius * 1.1;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

        pulse.radius += 5;
        pulse.alpha -= 0.02;
        return pulse.alpha > 0.02;
      });

      bubbles.current.forEach((bubble) => {
        const dx = mouse.current.x !== null ? bubble.x - mouse.current.x : 0;
        const dy = mouse.current.y !== null ? bubble.y - mouse.current.y : 0;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 160 - dist) / 160;
        const offset = force * 24;

        bubble.x += bubble.speedX + bubble.drift * force;
        bubble.y += bubble.speedY - offset * 0.04;

        if (bubble.x < -bubble.radius) bubble.x = canvas.width + bubble.radius;
        if (bubble.x > canvas.width + bubble.radius) bubble.x = -bubble.radius;
        if (bubble.y < -bubble.radius) bubble.y = canvas.height + bubble.radius;
        if (bubble.y > canvas.height + bubble.radius) bubble.y = -bubble.radius;

        const hue = bubble.hue + Math.sin(Date.now() / 1900 + bubble.radius) * 10;
        const bright = Math.min(1, bubble.alpha + 0.1);

        const gradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          bubble.radius * 0.2,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        gradient.addColorStop(0, `hsla(${hue}, 94%, 70%, ${bright})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 83%, 62%, ${bubble.alpha * 0.85})`);
        gradient.addColorStop(1, `hsla(${hue}, 72%, 54%, 0)`);

        ctx.save();
        ctx.shadowColor = `hsla(${hue}, 94%, 75%, ${bubble.alpha * 0.7})`;
        ctx.shadowBlur = bubble.radius * 0.8;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      });
    };

    const tick = () => {
      draw();
      animationRef.current = requestAnimationFrame(tick);
    };

    const handleMouseMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    const handleClick = (event) => {
      pulses.current.push({
        x: event.clientX,
        y: event.clientY,
        radius: 0,
        alpha: 0.42,
        hue: 200 + Math.random() * 50,
      });
    };

    resizeCanvas();
    createBubbles();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('click', handleClick);
    tick();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="bubble-background" />;
}

export default BubbleBackground;
