import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <View
      className={cn(
        'bg-white rounded-2xl shadow-md p-5 border border-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
};
