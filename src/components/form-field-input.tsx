"use client";

import React, { FC, useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

interface FormFieldInputProps {
    control: any;
    name: string;
    label: string;
    required?: boolean;
    type: 'text' | 'number' | 'textarea' | 'select' | 'price';
    options?: { label: string; value: string | number }[];
    disabled?: boolean;
}

const FormFieldInput: FC<FormFieldInputProps> = ({ control, name, label, required, type = 'text', options, disabled }) => {
    const [isFocused, setIsFocused] = useState(false);

    // Helper function to handle number input changes
    const handleNumberChange = (value: string) => {
        const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        return numericValue === "" ? 0 : Number(numericValue);
    };

    return (
        <FormField control={control} name={name} render={({ field }) => (
            <FormItem>
                <FormLabel>{label} {required && <span className='text-red-500'>*</span>}</FormLabel>
                <FormControl>
                    {type === 'textarea' ? (
                        <Textarea {...field} disabled={disabled} />
                    ) : type === 'select' ? (
                        <Select
                            disabled={disabled}
                            onValueChange={(value) => field.onChange(value)}
                            value={String(field.value || '')} // Handle potential null/undefined values
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select an option">
                                    {options?.find(opt => String(opt.value) === String(field.value))?.label || "Select"} {/* Display placeholder if no option is selected */}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {options?.map((option) => (
                                    <SelectItem key={String(option.value)} value={String(option.value)}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : type === 'price' ? (
                        <Input
                            {...field}
                            type="text"
                            disabled={disabled}
                            value={field.value ? Number(field.value).toLocaleString("id-ID") : "0"}
                            onChange={(e) => field.onChange(handleNumberChange(e.target.value))}
                        />
                    ) : type === 'text' ? (
                        <Input {...field} disabled={disabled} type="text" />
                    ) : (
                        <Input
                            {...field}
                            type="text" // Use text type for number input to avoid browser validation issues
                            disabled={disabled}
                            value={field.value !== 0 ? String(field.value || "") : ""} // Display empty string if value is 0 and not focused
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onChange={(e) => field.onChange(handleNumberChange(e.target.value))}
                        />
                    )}
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
    );
};

export default FormFieldInput;