import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import ApiHelper from "../../helpers/api";
import AddCategoryModal from "../Modals/AddCategoryModal";
import EditCategoryModal from "../Modals/EditCategoryModal";


const Category = (props) => {

    const [categories, setCategories] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    const initialCategoryState = {
        categoryId: null,
        name: null,
        description: null
      };

    const [curentCategory, setCurentCategory] = useState(initialCategoryState);

    useEffect(() => {
        ApiHelper.Categories.getAll().then((mappedApiCategories) => {
            setCategories(mappedApiCategories);
        });
    }, [props, categories]);

    function initEdit(c){
        setCurentCategory(c);
        setEditModalShow(true);
    }

    function deleteCategory(id) {
        if(window.confirm('Are you sure?')){
            ApiHelper.Categories.delete(id)
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
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {categories.map(c =>

                        <tr key={c.categoryId}>
                            <td>{c.categoryId}</td>
                            <td>{c.name}</td>
                            <td>{c.description}</td>
                            
                            <ButtonToolbar>

                                <Button className="primary" variant="info"
                                    onClick={() =>
                                        initEdit(c)
                                    }>

                                    Edit
                                    </Button>

                                <Button className="mr-2" variant="danger"
                                    onClick={() =>
                                        deleteCategory(c.categoryId)
                                    }>
                                    Delete
                                    </Button>

                                <EditCategoryModal show={editModalShow}
                                    cat={curentCategory}
                                    onHide={() => setEditModalShow(false)} />
                            </ButtonToolbar>
  
                        </tr>)}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button variant='primary'
                    onClick={() => setAddModalShow(true)}>
                    Add Category
                </Button>


                <AddCategoryModal show={addModalShow}
                    onHide={() => setAddModalShow(false)} />
            </ButtonToolbar>

        </div>
    );

};


export default Category;