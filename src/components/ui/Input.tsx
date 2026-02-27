import React, { forwardRef } from 'react';

// ۱. این بخش رو دستی بنویس (تمرکز روی تایپ‌اسکریپت)
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// ۲. این بخش forwardRef رو دستی بنویس (بسیار مهم برای فرم‌ها)
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        
        <input
          ref={ref}
          className={`px-4 py-2 border rounded-lg outline-none transition-all 
            ${error ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'} 
            ${className}`}
          {...props}
        />

        {/* ۳. بخش نمایش خطا رو دستی بنویس */}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;