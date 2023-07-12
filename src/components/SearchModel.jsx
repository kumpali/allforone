"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment,  useEffect,  useState } from 'react'
import { XCircleIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid'

import {useQuery } from 'react-query'
import Link from 'next/link'


 const SearchModel = () => {

  let [isOpen, setIsOpen] = useState(false)

  let [searhTerm, setSearchTerm] = useState('')

  const [searchTermOption, setSearchTermOption] = useState('movie')

  const [searchLimit,setSearchLimit] = useState(true);




  function closeModal() {
      setIsOpen(false)
    }
    
    function openModal() {
        setIsOpen(true)
    }



  return (
    <>


      <div className="">
        
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Search
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-top mt-24 justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-full transform overflow-hidden rounded-2xl  glass p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="form-control mb-10 text-white flex flex-col">
                    <div className='flex justify-between pb-10'>
                        <div className='flex gap-3'>
                          <button className="btn btn-primary" onClick={()=>setSearchTermOption('anime')}>Anime</button>
                          <button className="btn btn-primary" onClick={()=>setSearchTermOption('movie')}>Movie</button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={closeModal}
                        >
                          <XCircleIcon className="h-6 w-6" />
                        </button>
                        </div>

                      <div className='w-full flex mb-10'>    
                        <input  type="text" onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search" className="input input-bordered w-24 md:w-auto grow rounded-r-none outline-none hover:outline-none focus:outline-none" />
                        <button onClick={()=>setSearchLimit(false)} className='btn btn-primary rounded-l-none'>
                          <MagnifyingGlassCircleIcon className='h-6 w-6'/>
                        </button>
                      </div>
                      {searchLimit?<span className="loading loading-dots loading-lg flex justify-center self-center"></span>:
                      <SearchOption searhTerm={searhTerm} searchTermOption={searchTermOption}/>
                      }
                      
                    </div>
                  </Dialog.Title>
                    
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}


export default SearchModel;


const SearchOption = ({searhTerm,searchTermOption}) =>{

const { isLoading, error, data } = useQuery('search', () =>
  fetch(`http://localhost:3000/api/${searchTermOption}?search=${searhTerm}`).then(res =>
    res.json()
  ).then(res => res.results)
)

if (isLoading ) return <span className="loading loading-dots loading-lg flex justify-center self-center"></span>

if (error) return 'An error has occurred: ' + error.message


if(data){
        return(

          <>
          
            <div className='flex flex-wrap gap-4'>
                      {data.map(({id, image, title, releaseDate, subOrDub})=>{

                        
                        

                      return(

                        <div key={id} className="min-w-[400px] w-auto grow rounded-lg bg-white dark:bg-slate-900 pb-2">
                              <div className="relative min-w-[380px] w-ful h-[250px] rounded-lg mx-auto overflow-hidden">
                                <img className="absolute w-full object-cover rounded-lg" src={image} alt=""/>
                                
                              </div>
                              <div className="w-[380px] flex items-center mx-auto py-3">
                                <div className="flex-grow">
                                    <Link href={`/info/${title}?searchId=${id}&searchTermOption=${searchTermOption}`}>
                                      <h3 className="text-2xl font-semibold dark:text-gray-400">
                                        {title}
                                      </h3>
                                    </Link>
                                  <p className="ext-sm text-gray-600">{releaseDate}</p>
                                </div>
                              </div>
                             
                            </div>
                        )

})}
  
                    </div>
                  <div className="mt-4">

                  </div>
                  </>
)
}}
