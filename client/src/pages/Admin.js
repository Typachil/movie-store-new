import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { CreateCategory } from '../components/Modals/CreateCategory';
import { CreateFilm } from '../components/Modals/CreateFilm';

export default function Admin(){
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [filmVisible, setFilmVisible] = useState(false);
    return (
        <Container className='d-flex flex-column pages-content'>
            <Button variant="outline-primary" className="mt-3 p-2" onClick={()=> setFilmVisible(true)}>Добавить фильм</Button>
            <Button variant="outline-primary" className="mt-3 p-2" onClick={()=> setCategoryVisible(true)}>Добавить категорию</Button>
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <CreateFilm show={filmVisible} onHide={() => setFilmVisible(false)}/>
        </Container>
    )
}