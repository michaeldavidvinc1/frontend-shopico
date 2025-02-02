"use client";

import React, { FC, useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'
import { formatRupiah } from '@/utils/format-rupiah'

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
    return (
        <FormField control={control} name={name} render={({ field }) => (
            <FormItem>
                <FormLabel>{label} {required && <span className='text-red-500'>*</span>}</FormLabel>
                <FormControl>
                    {type === 'textarea' ? (
                        <Textarea {...field} disabled={disabled} />
                    ) : type === 'select' ? (
                        <Select disabled={disabled} onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                {options?.map((option) => (
                                    <SelectItem key={option.value} value={String(option.value)}>
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
                            value={field.value ? field.value.toLocaleString("id-ID") : "0"}
                            onChange={(e) =>
                                field.onChange(type === "price" ? Number(e.target.value.replace(/\D/g, "")) || 0 : e.target.value)
                            }
                        />
                    ) : type === 'text' ? (
                        <Input {...field} disabled={disabled} type="text" />
                    ) : (
                        <Input
                            {...field}
                            type="number"
                            disabled={disabled}
                            value={isFocused && field.value === 0 ? "" : field.value.toString()}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                setIsFocused(false);
                                if (field.value === 0) {
                                    field.onChange(0);
                                }
                            }}
                            onChange={(e) => {
                                let rawValue = e.target.value;
                                if (rawValue === "") {
                                    field.onChange(0);
                                } else {
                                    field.onChange(Number(rawValue));
                                }
                            }}
                        />
                    )}
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
    )
}

export default FormFieldInput
