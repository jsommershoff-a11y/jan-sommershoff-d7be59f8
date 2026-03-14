import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  // If element hasn't been observed yet, show it immediately after a timeout
  // This prevents content from being permanently hidden
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} className={className}>
      <motion.div
        animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.5,
          delay: hasAnimated ? delay : 0,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
