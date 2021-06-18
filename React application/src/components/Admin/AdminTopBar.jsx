
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


import Category from "./Category"
import Product from "./Product"
import Navigation from "./Navigation"
import AdminHome from "./AdminHome"

const AdminTopBar = () => {


    return (
        <BrowserRouter>
            <div className="container">

                <Navigation />

                <Switch>
                    <Route path='/admin/home' component={AdminHome} />
                    <Route path='/admin/category' component={Category} exact/>
                    <Route path='/admin/product' component={Product} exact/>
                </Switch>

            </div>
        </BrowserRouter>
    );

};


export default AdminTopBar;