import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full px-3 py-1',
  {
    variants: {
      variant: {
        primary: 'bg-primary-100',
        success: 'bg-success-50',
        danger: 'bg-danger-50',
        warning: 'bg-warning-50',
        secondary: 'bg-gray-100',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

const textVariants = cva('font-semibold text-xs', {
  variants: {
    variant: {
      primary: 'text-primary-700',
      success: 'text-success-600',
      danger: 'text-danger-600',
      warning: 'text-warning-600',
      secondary: 'text-gray-700',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface BadgeProps extends ViewProps, VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export const Badge = ({ children, variant, className, ...props }: BadgeProps) => {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      <Text className={cn(textVariants({ variant }))}>
        {children}
      </Text>
    </View>
  );
};
