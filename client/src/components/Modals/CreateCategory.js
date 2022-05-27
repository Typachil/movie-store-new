import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { createCategory } from '../../http/filmAPI';

export const CreateCategory = ({show, onHide}) => {
    const [value, setValue] = useState();

    const addCategory = () =>{
        createCategory({name: value}).then(data => {
            setValue("");
            onHide();
        })
    }
    return (
      <>
        <Modal className='mt-5' show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Добавьте категорию</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Название категории</Form.Label>
                <Form.Control
                  type="text"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={addCategory}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
