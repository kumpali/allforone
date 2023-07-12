import { NextResponse } from 'next/server'
import { ANIME } from '@consumet/extensions';
import { MOVIES } from '@consumet/extensions';




const moviesHd = new MOVIES.MovieHdWatch();
const gogoanime = new ANIME.Gogoanime();


export async function GET(req) {
    const queryParam = req.nextUrl.searchParams


        const res1 = await moviesHd.fetchRecentMovies().then(data => {
            return data
        })
        const res2 = await moviesHd.fetchRecentTvShows().then(data => {
            return data
        })
        const res3 = await moviesHd.fetchTrendingMovies().then(data => {
            return data
        })
        const res4 = await moviesHd.fetchTrendingTvShows().then(data => {
            return data
        })
        const res5 = await gogoanime.fetchTopAiring().then(data => {
            return data
        }).then(data=>data.results)
        const res6 = await gogoanime.fetchRecentEpisodes().then(data => {
            return data
        }).then(data=>data.results)
        return NextResponse.json({
            recentMovies:res1,
            recentTv:res2,
            trendingMovies:res3,
            trandingTv:res4,
            topAiringAnime:res5,
            recentEps:res6

        })




    
}