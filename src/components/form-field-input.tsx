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
                            type="text" // Tetap pakai text biar bisa format manual
                            disabled={disabled}
                            value={field.value ? field.value.toLocaleString("id-ID") : "0"}
                            onChange={(e) =>
                                field.onChange(type === "price" ? Number(e.target.value.replace(/\D/g, "")) || 0 : e.target.value)
                            }
                        />
                    ) : (
                        <Input
                            {...field}
                            type={type}
                            disabled={disabled}
                            onChange={(e) => field.onChange(type === 'number' ? Number(e.target.value) || 0 : e.target.value)}
                        />
                    )}
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
    )
}

export default FormFieldInput
