"use client"
import InfoCard from '@/components/InfoCard';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()



const Page = ({ params, searchParams }) => {

    return (
        <QueryClientProvider client={queryClient}>
            <InfoCard id={params.id} searchParams={searchParams}/>
        </QueryClientProvider>
    );
}

export default Page;
