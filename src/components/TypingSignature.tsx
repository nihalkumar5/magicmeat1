"use client";

import React, { useEffect, useState } from 'react';

interface TypingSignatureProps {
  className?: string;
}

export default function TypingSignature({ className = "" }: TypingSignatureProps) {
  const text = "Proudly made in Hazaribagh with love";
  const words = text.split(" ");
  const [visibleCount, setVisibleCount] = useState(0);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    let current = 0;
    // Typing delay before animation starts
    const startTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (current < text.length) {
          current++;
          setVisibleCount(current);
        } else {
          clearInterval(intervalId);
          // Show the heart with pop effect
          setTimeout(() => {
            setShowHeart(true);
          }, 100);
        }
      }, 55); // fast & elegant cursive writing speed

      return () => clearInterval(intervalId);
    }, 400); // Wait 400ms after load before starting typing animation

    return () => clearTimeout(startTimeout);
  }, []);

  // Track the global index of characters across words to sync with visibleCount
  let globalCharIndex = 0;

  return (
    <div className={`${className} font-script`}>
      <style dangerouslySetInnerHTML={{ __html: `
        .char-fade {
          display: inline-block;
          opacity: 0;
          transform: translateY(2px) scale(0.95);
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: pre;
        }
        .char-fade.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .heart-pop {
          display: inline-block;
          opacity: 0;
          transform: scale(0);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                      opacity 0.2s ease-out;
        }
        .heart-pop.visible {
          opacity: 1;
          transform: scale(1);
          animation: heartbeat 1.4s ease-in-out infinite 0.4s;
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.2); }
          70% { transform: scale(1); }
          100% { transform: scale(1); }
        }
      `}} />
      
      {words.map((word, wordIndex) => {
        return (
          <React.Fragment key={wordIndex}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char) => {
                const charGlobalIndex = globalCharIndex++;
                return (
                  <span
                    key={charGlobalIndex}
                    className={`char-fade ${charGlobalIndex < visibleCount ? 'visible' : ''}`}
                  >
                    {char}
                  </span>
                );
              })}
              {/* Render the heart emoji inside the last word's whitespace-nowrap block */}
              {wordIndex === words.length - 1 && (
                <span className={`heart-pop ml-1.5 ${showHeart ? 'visible' : ''}`}>
                  ❤️
                </span>
              )}
            </span>
            {/* Account for spaces in the global index and render space between words */}
            {wordIndex < words.length - 1 && (
              <>
                <span className="hidden">{globalCharIndex++}</span>
                <span> </span>
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
