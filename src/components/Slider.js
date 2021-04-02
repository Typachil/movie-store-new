import React from 'react';
import {Carousel} from 'react-bootstrap';


export default function Slider(){
    let arrayLink = ["https://thumbs.dfs.ivi.ru/storage38/contents/4/f/9dcb22413c38ed7990bc4955a28ac6.jpg/1216x370/",
    "https://thumbs.dfs.ivi.ru/storage15/contents/6/d/06538105bd85bf5d23e3dca574886a.jpg/1216x370/",
    "https://thumbs.dfs.ivi.ru/storage15/contents/2/2/f47c964a8417d216007f367086197f.jpg/1216x370/",
    "https://thumbs.dfs.ivi.ru/storage33/contents/f/8/ea9b90829b1851f32b31d8272207fb.jpg/1216x370/"];

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