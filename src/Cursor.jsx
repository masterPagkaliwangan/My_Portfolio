import { useEffect, useRef, useState } from 'react';

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      const interactive = event.target.closest('a, button, .project-card, .skill-pill, .timeline-list li, .hero-image-container');

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      setHovering(Boolean(interactive));
    };

    document.addEventListener('mousemove', updateCursor);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hover' : ''}`} />
      <div ref={dotRef} className={`cursor-dot ${hovering ? 'hover' : ''}`} />
    </>
  );
}

export default Cursor;
