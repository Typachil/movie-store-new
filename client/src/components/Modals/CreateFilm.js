import { observer } from 'mobx-react-lite';
import {React, useContext, useEffect, useState} from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { fetchCategory, createFilm } from '../../http/filmAPI';
import { Context } from '../../index';

export const CreateFilm = observer(({show, onHide}) => {
    const {film} = useContext(Context);
    const [form, setForm] = useState({
        name: "", description: "", img: null, video: null, category: {value: null, id: null}, type: {value: null, id: null}
    });

    useEffect(()=>{
        fetchCategory().then(data => film.setСategories(data));
    },[]);

    function setFormValue(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    };

    function selectFile(event){
        setForm({...form, [event.target.name]: event.target.files[0]})
    };

    function selectDropDown(event){
        setForm({...form, [event.target.name]: {value : event.target.text, id: event.target.dataset.id}});
    };

    function addDevice(){
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('img', form.img);
        if(form.video) formData.append('video', form.video);
        formData.append('categoryId', form.category.id);
        formData.append('typeId', form.type.id);
        createFilm(formData).then(data => onHide());
    };

    return (
      <> 
        <Modal className='mt-5' show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Добавление фильма</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Название фильма</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Форрест Гамп"
                  autoFocus
                  name="name"
                  value={form.name}
                  onChange={setFormValue}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Описание фильма</Form.Label>
                <Form.Control as="textarea" name="description" rows={3} value={form.description} onChange={setFormValue}/>
              </Form.Group>
              <Dropdown className="mt-3">
                  <Dropdown.Toggle>{form.category.value || "Выберите категорию"}</Dropdown.Toggle>
                  <Dropdown.Menu>
                      {film._categories.map(category => 
                        <Dropdown.Item data-id={category.id} name="category" onClick={selectDropDown} key={category.id}>{category.name}</Dropdown.Item>
                        )}
                  </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="mt-3">
                  <Dropdown.Toggle>{form.type.value || "Выберите тип"}</Dropdown.Toggle>
                  <Dropdown.Menu>
                      {film._types.map(type => 
                        <Dropdown.Item data-id={type.id} name="type" onClick={selectDropDown} key={type.id}>{type.name}</Dropdown.Item>
                        )}
                  </Dropdown.Menu>
              </Dropdown>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Обложка фильма</Form.Label>
                <Form.Control
                  type="file"
                  name="img"
                  onChange={selectFile}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Видеофайл</Form.Label>
                <Form.Control
                  type="file"
                  name="video"
                  onChange={selectFile}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={addDevice}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
})
