import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-xl font-semibold transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 active:bg-primary-700',
        secondary: 'bg-gray-200 active:bg-gray-300',
        outline: 'border-2 border-primary-600 active:bg-primary-50',
        ghost: 'active:bg-gray-100',
        danger: 'bg-danger-500 active:bg-danger-600',
        success: 'bg-success-500 active:bg-success-600',
      },
      size: {
        sm: 'px-4 py-2',
        md: 'px-6 py-3',
        lg: 'px-8 py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const textVariants = cva('font-semibold text-center', {
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'text-gray-900',
      outline: 'text-primary-600',
      ghost: 'text-gray-900',
      danger: 'text-white',
      success: 'text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          (disabled || isLoading) && 'opacity-50',
          className
        )}
        disabled={disabled || isLoading}
        activeOpacity={0.7}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator 
            color={variant === 'primary' || variant === 'danger' || variant === 'success' ? 'white' : '#2563eb'} 
            size="small" 
          />
        ) : (
          <Text className={cn(textVariants({ variant, size }))}>
            {children}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
