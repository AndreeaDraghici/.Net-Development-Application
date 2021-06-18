import React from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';
import ApiHelper from "../../helpers/api";
import { useState, useEffect } from "react";
import { API_ROUTE } from "../../config/api";
import { IMAGES_PATH } from "../../config/images";

const AddProductModal = (props) => {

    const initialProductState = {
        productId: null,
        name: null,
        description: null,
        price: null,
        basePrice: null,
        categoryId: null,
        imageName: null
    };

    const [currentProduct, setcurrentProduct] = useState(initialProductState);

    const [image, setImage] = useState({ preview: "", raw: "" });


    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });

            setcurrentProduct({...currentProduct, imageName: e.target.files[0].name});
        }
    };

    const handleUpload = e => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.append("imageFile", image.raw, currentProduct.imageName);

        console.log(currentProduct.productId);

        fetch(API_ROUTE + `/product/${currentProduct.productId}/image`, {
            method: "POST",
            body: formData
        }
        
        );
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setcurrentProduct({ ...currentProduct, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const itemInput = {
            name: currentProduct.name,
            description: currentProduct.description,
            price: currentProduct.price,
            basePrice: currentProduct.basePrice,
            categoryId: currentProduct.categoryId,
            imageName: currentProduct.imageName
        }


        ApiHelper.Products.insert(itemInput).then((res) => {
            console.log(res);
            setcurrentProduct(res);
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
                        Add Product
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                            <Form >

                                <Form.Group controlId="name">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control type="text" name="name" required
                                        placeholder="name" onChange={handleInputChange} value={currentProduct.name} />
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Product Description</Form.Label>
                                    <Form.Control type="text" name="description" required
                                        placeholder="description" onChange={handleInputChange} value={currentProduct.description} />
                                </Form.Group>

                                <Form.Group controlId="price">
                                    <Form.Label>Product Price</Form.Label>
                                    <Form.Control type="text" name="price" required
                                        placeholder="price" onChange={handleInputChange} value={currentProduct.price} />
                                </Form.Group>

                                <Form.Group controlId="basePrice">
                                    <Form.Label>Product Base Price</Form.Label>
                                    <Form.Control type="text" name="basePrice" required
                                        placeholder="basePrice" onChange={handleInputChange} value={currentProduct.basePrice} />
                                </Form.Group>


                                <Form.Group controlId="categoryId">
                                    <Form.Label>Category Name</Form.Label>
                                    <Form.Control type="text" name="categoryId" required
                                        placeholder="category Id" onChange={handleInputChange} value={currentProduct.categoryId} />
                                </Form.Group>

                                <Form.Group controlId="imageName">
                                    <Form.Label>Product Base Price</Form.Label>
                                    <Form.Control type="text" name="imageName" required
                                        placeholder="image name" onChange={handleInputChange} value={currentProduct.imageName} />
                                </Form.Group>


                                <Form.Group>
                                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Add Product
                                    </Button>
                                </Form.Group>

                            </Form>
                        </Col>

                        <Col sm={6}>
                            <div>
                                <label htmlFor="upload-button">
                                    {image.preview ? (
                                        <img src={image.preview} alt="dummy" width="300" height="300" />
                                    ) : (
                                        <>
                                            <span className="fa-stack fa-2x mt-3 mb-2">
                                                <i className="fas fa-circle fa-stack-2x" />
                                                <i className="fas fa-store fa-stack-1x fa-inverse" />
                                            </span>
                                            <h5 className="text-center">Upload your photo</h5>
                                        </>
                                    )}
                                </label>
                                <input
                                    type="file"
                                    id="upload-button"
                                    style={{ display: "none" }}
                                    onChange={handleChange}
                                />
                                <br />
                                <button onClick={handleUpload}>Upload</button>
                            </div>
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


export default AddProductModal;
