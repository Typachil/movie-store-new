import React from 'react';
import dataMovie from '../dataMovie.json';
import VideoPlayer from '../components/VideoPlayer';

export default function MoviePage(props){
    const id = props.match.params.id || "";
    let movieData = dataMovie.filter(item => item.id == id);
    let title = movieData[0].title;
    return (
        <div className="pages-content wrapper">
            <h1>{title}</h1>
            <VideoPlayer />
        </div>
    )
}