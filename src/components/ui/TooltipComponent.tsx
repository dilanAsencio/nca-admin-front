'use client';

import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const TooltipComponent: React.FC<TooltipProps> = ({ children, text, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={clsx(
            'absolute z-50 px-3 py-1 rounded-md bg-gray-900 text-white text-sm whitespace-nowrap shadow-lg transition-opacity duration-200',
            `${positionClasses[position]}`,
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default TooltipComponent;
