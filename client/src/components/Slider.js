import React from 'react';
import {Carousel} from 'react-bootstrap';


export default function Slider(){
    let arrayLink = ["https://thumbs.dfs.ivi.ru/storage15/contents/1/0/7370873ee1fe4c88f00bd09f92b7f6.jpg/1216x370/",
    "https://thumbs.dfs.ivi.ru/storage32/contents/d/9/6b00181f9747fc9b6745137aea9933.jpg/1216x370/",
    "https://thumbs.dfs.ivi.ru/storage2/contents/9/0/43f8fc600fc38490be7c67861e39be.jpg/1216x370/",
    "https://thumbs.dfs.ivi.ru/storage6/contents/c/e/2e8285635d5b92dbbfa2ac154ae096.jpg/1216x370/"];

    let sliderItems = arrayLink.map((link,key)=> {
        return (
            <Carousel.Item key={key}>
                <img src={link} className="d-block w-100" alt={`image ${key}`}/>
            </Carousel.Item> 
        )
    })
    return (
        <Carousel style={{top:"100px"}} className="wrapper">
            {sliderItems}
        </Carousel>
    )
} 