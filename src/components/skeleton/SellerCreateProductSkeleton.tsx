import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent, CardHeader } from '../ui/card';

const SellerCreateProductSkeleton = () => {
    return (
        <div className="mt-4 space-y-6">
            <div className="grid grid-cols-5 gap-6">
                {/* Left Section */}
                <div className="col-span-3 flex flex-col gap-6">
                    {/* Image Upload Skeleton */}
                    <Skeleton className="h-40 w-full rounded-lg" />
                    
                    {/* Product Information Card */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent>
                            <div className='grid grid-cols-2 gap-4'>
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Right Section */}
                <div className='col-span-2 flex flex-col gap-6'>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col gap-4'>
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            {/* Submit Button */}
            <div className='flex justify-end gap-4'>
                <Skeleton className="h-10 w-24 rounded-lg" />
                <Skeleton className="h-10 w-24 rounded-lg" />
            </div>
        </div>
    );
};

export default SellerCreateProductSkeleton;