import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../lib/cn';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
        'text-gray-900 placeholder:text-gray-400',
        'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
        'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
