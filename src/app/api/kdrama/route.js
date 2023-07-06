import { NextResponse } from 'next/server'
import { MOVIES } from '@consumet/extensions';


const viewAsian = new MOVIES.ViewAsian();


export async function GET(req) {
    const queryParam = req.nextUrl.searchParams



    if(queryParam.get("search")){
        const res = await viewAsian.search(queryParam.get("search")).then(data => {
            return data
        })
        return NextResponse.json(res)
    }

    if(queryParam.get("info")){
        const res = await viewAsian.fetchMediaInfo(`${queryParam.get("info")}`).then(data => {
            return data
        })
        return NextResponse.json(res)
    }
    if(queryParam.get("watch")){

        const res = await viewAsian.fetchEpisodeSources(`${queryParam.get("watch")}`).then(data => {
            return data
        })
        return NextResponse.json(res)
    }

    return NextResponse.json("your query options are [search, info, watch]")


    
}