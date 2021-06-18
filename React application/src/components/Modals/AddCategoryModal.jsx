import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import ApiHelper from "../../helpers/api";
import { useState } from "react";


const AddCategoryModal = (props) => {



  const initialCategoryState = {
    categoryId: null,
    name: '',
    description: ''
  };

  const [currentCategory, setcurrentCategory] = useState(initialCategoryState);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setcurrentCategory({ ...currentCategory, [name]: value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const itemInput = {
      name: currentCategory.name,
      description: currentCategory.description
    }
    
    
    ApiHelper.Categories.insert(itemInput).then( (res) => {
      setcurrentCategory(initialCategoryState);
    }).catch(err => console.log(err));
  };

  return (

    <div className="container">

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header clooseButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Category
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col sm={6}>
              <Form >
                <Form.Group controlId="categoryId">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control type="text" name="name" required
                    placeholder="name" onChange={handleInputChange} value={currentCategory.name} />
                  <Form.Label>Category Description</Form.Label>
                  <Form.Control type="text" name="description" required
                    placeholder="description" onChange={handleInputChange} value={currentCategory.description} />
                </Form.Group>


                <Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Add Category
                    </Button>
                </Form.Group>

              </Form>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>

      </Modal>

    </div>
  );

};


export default AddCategoryModal;