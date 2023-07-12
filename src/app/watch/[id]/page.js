"use client"
import InfoCard from '@/components/InfoCard';
import WatchCard from '@/components/WatchCard';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()



const Page = ({params,searchParams}) => {
    return (
        <QueryClientProvider client={queryClient}>
            <WatchCard id={params.id} searchParams={searchParams}/>
        </QueryClientProvider>
    );
}

export default Page;