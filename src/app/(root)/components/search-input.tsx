import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Heart, Search } from 'lucide-react'
import React from 'react'

const SearchInput = () => {
    return (
        <div className='flex border px-4 rounded-full '>
            <Select>
                <SelectTrigger className="w-[150px] border-none shadow-none">
                    <SelectValue placeholder="All category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Baju</SelectItem>
                    <SelectItem value="dark">Celana</SelectItem>
                    <SelectItem value="system">Elektronik</SelectItem>
                </SelectContent>
            </Select>
            <div className='relative'>
                <Input
                    type="text"
                    placeholder="Search"
                    className="border-none w-[400px] shadow-none text-sm focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
                />
                <div className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent mt-[2px]'>
                    <Search className='w-4 h-4' />
                </div>
            </div>
            
        </div>
    )
}

export default SearchInput
