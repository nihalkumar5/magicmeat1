"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'zoom-in' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  animation = 'fade-up',
  delay = 0,
  duration = 750,
  threshold = 0.05,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Disable animation if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px', // start animation 40px before entering viewport
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-up':
        return isIntersecting
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8';
      case 'fade-in':
        return isIntersecting ? 'opacity-100' : 'opacity-0';
      case 'zoom-in':
        return isIntersecting
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-[0.97]';
      case 'slide-left':
        return isIntersecting
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-8';
      case 'slide-right':
        return isIntersecting
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-8';
      default:
        return isIntersecting ? 'opacity-100' : 'opacity-0';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`will-change-[transform,opacity] transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${getAnimationClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
