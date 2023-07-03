import { NextResponse } from 'next/server'
import { MOVIES } from '@consumet/extensions';


const moviesHd = new MOVIES.MovieHdWatch();


export async function GET(req) {
    const queryParam = req.nextUrl.searchParams



    if(queryParam.get("search")){
        const res = await moviesHd.search(queryParam.get("search")).then(data => {
            return data
        })
        return NextResponse.json(res)
    }

    if(queryParam.get("info")){
        const res = await moviesHd.fetchMediaInfo(`${queryParam.get("info")}`).then(data => {
            return data
        })
        return NextResponse.json(res)
    }
    if(queryParam.get("watch")){

        const res = await moviesHd.fetchEpisodeSources(queryParam.get("id"),`${queryParam.get("watch")}`).then(data => {
            return data
        })
        return NextResponse.json(res)
    }

    


    
}