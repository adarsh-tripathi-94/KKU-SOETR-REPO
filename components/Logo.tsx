import React from 'react';
// OPTION A: If your image is in the 'src' folder, import it:
import logoSrc from './logo.png'; 

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <img
      // OPTION A: Use the imported variable
      src={logoSrc} 
      
      // OPTION B: If image is in 'public' folder, use the string path
      
      
      alt="University Logo"
      
      // EXPLANATION OF CLASSES:
      // rounded-full: Turns the square image into a perfect circle (border-radius: 50%)
      // object-cover: Ensures the image fills the circle without stretching or squishing
      className={`${className || "w-[120px] h-[120px]"} rounded-full object-cover`}
    />
  );
};