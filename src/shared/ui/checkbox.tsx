import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../lib/cn';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        'h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-500',
        'focus:ring-2 focus:ring-blue-500 focus:ring-offset-0',
        'dark:border-gray-600 dark:bg-gray-800',
        className
      )}
      {...props}
    />
  )
);
Checkbox.displayName = 'Checkbox';
