/**
 * Triggers haptic feedback on mobile devices.
 * Supports standard HTML5 Vibration API (Android Chrome, Firefox)
 * and uses a checkbox switch hack for iOS Safari (iOS 17.4+).
 * 
 * @param pattern Number or array of numbers representing vibration duration(s) in ms
 */
export function triggerHaptic(pattern: number | number[] = 50) {
  if (typeof window === 'undefined') return;

  // 1. Try standard HTML5 vibration API (Android, etc.)
  if (window.navigator && window.navigator.vibrate) {
    try {
      window.navigator.vibrate(pattern);
      return;
    } catch (e) {
      // Ignore vibration errors
    }
  }

  // 2. Try iOS Safari Checkbox Switch hack (iOS 17.4+)
  try {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('switch', ''); // Crucial attribute to trigger iOS native taptic feedback
    
    // Style invisible
    input.style.position = 'fixed';
    input.style.top = '0';
    input.style.left = '0';
    input.style.width = '1px';
    input.style.height = '1px';
    input.style.opacity = '0';
    input.style.pointerEvents = 'none';
    input.style.zIndex = '-9999';
    
    document.body.appendChild(input);
    input.click();
    
    // Clean up
    setTimeout(() => {
      if (document.body.contains(input)) {
        document.body.removeChild(input);
      }
    }, 100);
  } catch (error) {
    // Fail silently on older iOS or desktop browsers
  }
}
