import { NextResponse } from 'next/server'
import { ANIME } from '@consumet/extensions';


const gogoanime = new ANIME.Gogoanime();


export async function GET(req) {
    const queryParam = req.nextUrl.searchParams



    if(queryParam.get("search")){
        const res = await gogoanime.search(queryParam.get("search")).then(data => {
            return data
        })
        return NextResponse.json(res)
    }

    if(queryParam.get("info")){
        const res = await gogoanime.fetchAnimeInfo(`${queryParam.get("info")}`).then(data => {
            return data
        })
        return NextResponse.json(res)
    }
    if(queryParam.get("watch")){

        const res = await gogoanime.fetchEpisodeSources(`${queryParam.get("watch")}`).then(data => {
            return data
        })
        return NextResponse.json(res)
    }

    return NextResponse.json("your query options are [search, info, watch]")


    
}