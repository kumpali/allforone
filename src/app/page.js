"use client"
import SearchModel from '@/components/SearchModel'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()


export default function Home() {
  


  return (
    <QueryClientProvider client={queryClient}>
    <main className="bg-base-300">
      
<div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div className="flex-none gap-2">
    <SearchModel/>

    <div className="dropdown dropdown-end">

      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
          
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
<div>
{<HomePage/>}
</div>
    </main>
    </QueryClientProvider>
  )
}


const HomePage = () =>{
  const { isLoading, error, data } = useQuery('home', () =>
  fetch(`/api/home`).then(res =>
    res.json()
  )
)

if (isLoading | data == undefined) return <span className="loading loading-dots loading-lg absolute left-[50%] top-[50%]"></span>

if (error) return 'An error has occurred: ' + error.message
if(data){

return(
  <>
  <h1 className='my-12 text-2xl ml-12'>
      Tranding Movies
    </h1>
  <div className=' w-full grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:flex flex-wrap gap-4 bg-base-300 px-5'>
      {
        data.trendingMovies.map(({id,image,title,releaseDate})=>(

          <div key={id} className="w-auto min-w-[200px] 2xl:max-w-[400px] grow rounded-lg bg-white dark:bg-slate-900 pb-2">
          <div className="relative  w-full h-[250px] rounded-t mx-auto overflow-hidden">
            <img className="absolute w-full object-cover rounded-t" src={image} alt=""/>
            
          </div>
          <div className="w-[200px] flex items-center mx-auto py-3">
            <div className="">
                <Link href={`/info/${title}?searchId=${id}&searchTermOption=movie`}>
                  <h3 className="w-full break-words font-semibold text-gray-700 dark:text-gray-400">
                    {title}
                  </h3>
                </Link>
              <p className="text-sm text-gray-600">{releaseDate}</p>
            </div>
          </div>
        
        </div>
        ))
      }
      </div>


      <h1 className='my-12 text-2xl ml-12'>
      Tranding Tv
    </h1>
  <div className=' w-full grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:flex flex-wrap gap-4 bg-base-300 px-5'>
      {
        data.trandingTv.map(({id,image,title,releaseDate})=>(

          <div key={id} className="w-auto min-w-[200px] 2xl:max-w-[400px] grow rounded-lg bg-white dark:bg-slate-900 pb-2">
          <div className="relative  w-full h-[250px] rounded-t mx-auto overflow-hidden">
            <img className="absolute w-full object-cover rounded-t" src={image} alt=""/>
            
          </div>
          <div className="w-[380px] flex items-center mx-auto py-3">
            <div className="flex-grow">
                <Link href={`/info/${title}?searchId=${id}&searchTermOption=movie`}>
                  <h3 className="w-full break-words font-semibold text-gray-700 dark:text-gray-400">
                    {title}
                  </h3>
                </Link>
              <p className="text-sm text-gray-600">{releaseDate}</p>
            </div>
          </div>
        
        </div>
        ))
      }
      </div>




    <h1 className='my-12 text-2xl ml-12'>
      Recent Movies
    </h1>
  <div className=' w-full grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:flex flex-wrap gap-4 bg-base-300 px-5'>
      {
        data.recentMovies.map(({id,image,title,releaseDate})=>(

          <div key={id} className="w-auto min-w-[200px] 2xl:max-w-[400px] grow rounded-lg bg-white dark:bg-slate-900 pb-2">
          <div className="relative  w-full h-[250px] rounded-t mx-auto overflow-hidden">
            <img className="absolute w-full object-cover rounded-t" src={image} alt=""/>
            
          </div>
          <div className="w-[380px] flex items-center mx-auto py-3">
            <div className="flex-grow">
                <Link href={`/info/${title}?searchId=${id}&searchTermOption=movie`}>
                  <h3 className="w-full break-words font-semibold text-gray-700 dark:text-gray-400">
                    {title}
                  </h3>
                </Link>
              <p className="text-sm text-gray-600">{releaseDate}</p>
            </div>
          </div>
        
        </div>
        ))
      }
      </div>

      <h1 className='my-12 text-2xl ml-12'>
      Recent TV Shows
    </h1>
  <div className=' w-full grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:flex flex-wrap gap-4 bg-base-300 px-5'>
      {
        data.recentTv.map(({id,image,title,releaseDate})=>(

          <div key={id} className="w-auto min-w-[200px] 2xl:max-w-[400px] grow rounded-lg bg-white dark:bg-slate-900 pb-2">
          <div className="relative  w-full h-[250px] rounded-t mx-auto overflow-hidden">
            <img className="absolute w-full object-cover rounded-t" src={image} alt=""/>
            
          </div>
          <div className="w-[380px] flex items-center mx-auto py-3">
            <div className="flex-grow">
                <Link href={`/info/${title}?searchId=${id}&searchTermOption=movie`}>
                  <h3 className="w-full break-words font-semibold text-gray-700 dark:text-gray-400">
                    {title}
                  </h3>
                </Link>
              <p className="text-sm text-gray-600">{releaseDate}</p>
            </div>
          </div>
        
        </div>
        ))
      }
      </div>

      <h1 className='my-12 text-2xl ml-12'>
      Recent Animes
    </h1>
  <div className=' w-full grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:flex flex-wrap gap-4 bg-base-300 px-5'>
      {
        data.recentEps.map(({id,image,title,releaseDate})=>(

          <div key={id} className="w-auto min-w-[200px] 2xl:max-w-[400px] grow rounded-lg bg-white dark:bg-slate-900 pb-2">
          <div className="relative  w-full h-[250px] rounded-t mx-auto overflow-hidden">
            <img className="absolute w-full object-cover rounded-t" src={image} alt=""/>
            
          </div>
          <div className="w-[380px] flex items-center mx-auto py-3">
            <div className="flex-grow">
                <Link href={`/info/${title}?searchId=${id}&searchTermOption=anime`}>
                  <h3 className="w-full break-words font-semibold text-gray-700 dark:text-gray-400">
                    {title}
                  </h3>
                </Link>
              <p className="text-sm text-gray-600">{releaseDate}</p>
            </div>
          </div>
        
        </div>
        ))
      }
      </div>


      <h1 className='my-12 text-2xl ml-12'>
      Top Airing Anime
    </h1>
  <div className=' w-full grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:flex flex-wrap gap-4 bg-base-300 px-5'>
      {
        data.topAiringAnime.map(({id,image,title,releaseDate})=>(

          <div key={id} className="w-auto min-w-[200px] 2xl:max-w-[400px] grow rounded-lg bg-white dark:bg-slate-900 pb-2">
          <div className="relative  w-full h-[250px] rounded-t mx-auto overflow-hidden">
            <img className="absolute w-full object-cover rounded-t" src={image} alt=""/>
            
          </div>
          <div className="w-[380px] flex items-center mx-auto py-3">
            <div className="flex-grow">
                <Link href={`/info/${title}?searchId=${id}&searchTermOption=anime`}>
                  <h3 className="w-full break-words font-semibold text-gray-700 dark:text-gray-400">
                    {title}
                  </h3>
                </Link>
              <p className="text-sm text-gray-600">{releaseDate}</p>
            </div>
          </div>
        
        </div>
        ))
      }
      </div>

      
  </>
)
}

}