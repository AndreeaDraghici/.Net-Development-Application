import logo from "../logo.svg";
import "./App.css";

import Home from "../components/Home/Home";
import AdminTopBar from "../components/Admin/AdminTopBar";

import Sidebar from "../components/Sidebar";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductList from "../components/ProductList";
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  return (
    

  
    <Container fluid>
      <Row>


        <Col lg={2} id="sidebar-wrapper" className="d-none d-sm-block">
          <Sidebar />
        </Col>

        

        <Col lg={10} xs={12} id="page-content-wrapper">
          <Switch>

            <Route path='/home/' component = {Home} exact/>
            <Route path='/admin/home/' component = {AdminTopBar} exact/>

            <Route
              path="/products/:id"
              render={(props) => {
                <ProductList {...props} />;
              }}
            />
          </Switch>
        </Col>

      </Row>
    </Container>
    
  


  );
}

export default App;
