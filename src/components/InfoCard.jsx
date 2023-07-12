"use client"
import Link from 'next/link';
import React from 'react';
import {useQuery } from 'react-query'





const InfoCard = ({id,searchParams}) => {
    const {searchTermOption,searchId,img} = searchParams



    const { isLoading, error, data } = useQuery('anime', () =>
    fetch(`/api/${searchTermOption}?info=${searchId}`).then(res =>
      res.json()
    )
  )
  
  if (isLoading | data == undefined) return <span className="loading loading-dots loading-lg"></span>
  
  if (error) return 'An error has occurred: ' + error.message
  if(data){


    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
            <img src={data.image} className="max-w-sm rounded-lg shadow-2xl" />
            <div>
            <h1 className="text-5xl font-bold">{data.title}</h1>
                <div className="card-actions justify-start mt-5">
                    {data.genres.map((title)=>(
                        <div key={title} className="badge badge-outline">{title}</div>))}
                </div>
            <p className="py-6">{data.description}</p>
            <div className='w-full flex flex-wrap gap-2'>
                {data.episodes.map(({id, title})=>(

                <Link 
                href={`../watch/${data.title}?watchId=${id}&searchTermOption=${searchTermOption}&searchId=${searchId}`} key={id} className="btn btn-primary">{title?title:id}</Link>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
}  }

export default InfoCard;
