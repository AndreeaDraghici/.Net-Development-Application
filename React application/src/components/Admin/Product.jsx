import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import ApiHelper from "../../helpers/api";
import AddProductModal from "../Modals/AddProductModal";
import EditProductModal from "../Modals/EditProductModal";


const Product = (props) => {

    const [products, setProducts] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    const initialProductState = {
        productId: null,
        name: null,
        description: null,
        price: null,
        basePrice: null,
        categoryId: null,
        imageName: null
    };

    const [curentProduct, setCurentProduct] = useState(initialProductState);

    const [curentProductId, setCurentProductId] = useState();


    useEffect(() => {
        ApiHelper.Products.getAll().then((mappedApiProducts) => {
            setProducts(mappedApiProducts);
        });
    }, [props, products]);

    function initEdit(p) {
        console.log(p);
        setCurentProduct(p);
        setCurentProductId(p.productId);
        setEditModalShow(true);
    }

    function deleteProduct(id) {
        if (window.confirm('Are you sure?')) {
            ApiHelper.Products.delete(id)
                .catch(err => console.log(err));
        }
    }


    return (
        <div >
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>BasePrice</th>
                        <th>CategoryId</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {products.map(p =>

                        <tr key={p.productId}>
                            <td>{p.productId}</td>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td>{p.price}</td>
                            <td>{p.basePrice}</td>
                            <td>{p.categoryId}</td>

                            <ButtonToolbar>

                                <Button className="primary" variant="info"
                                    onClick={() =>
                                        initEdit(p)
                                    }>

                                    Edit
                                    </Button>

                                <Button className="mr-2" variant="danger"
                                    onClick={() =>
                                        deleteProduct(p.productId)
                                    }>
                                    Delete
                                    </Button>

                            </ButtonToolbar>


                        </tr>)}
                </tbody>




            </Table>

            <EditProductModal show={editModalShow}
                prod={curentProduct}
                prodId ={curentProductId}
                onHide={() => setEditModalShow(false)} />

            <ButtonToolbar>
                <Button variant='primary'
                    onClick={() => setAddModalShow(true)}>
                    Add Product
                </Button>


                <AddProductModal show={addModalShow}
                    onHide={() => setAddModalShow(false)} />
            </ButtonToolbar>

        </div>
    );

};


export default Product;
