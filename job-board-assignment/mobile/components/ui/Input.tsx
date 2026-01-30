import React, { forwardRef } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, helperText, containerClassName, className, ...props }, ref) => {
    return (
      <View className={cn('mb-4', containerClassName)}>
        {label && (
          <Text className="text-gray-700 font-semibold mb-2 text-base">
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={cn(
            'border-2 rounded-xl px-4 py-3 text-base bg-white',
            error ? 'border-danger-500' : 'border-gray-300 focus:border-primary-600',
            className
          )}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {error && (
          <Text className="text-danger-500 text-sm mt-1 ml-1">
            {error}
          </Text>
        )}
        {helperText && !error && (
          <Text className="text-gray-500 text-sm mt-1 ml-1">
            {helperText}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
