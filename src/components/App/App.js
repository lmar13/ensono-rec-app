import React from 'react';
import { Card, Col, Container, Nav, Row } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route
} from 'react-router-dom';
import { InputData } from './../InputData';
import './App.css';

function App() {
  return (
    <Router>
      <Redirect from="/" to="letters" />
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <Card style={{ color: 'black' }}>
                  <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#twoLetters">
                      <Nav.Item>
                        <NavLink
                          to="/letters"
                          className="nav-link"
                          activeClassName="active"
                        >
                          Two Letters
                        </NavLink>
                      </Nav.Item>
                      <Nav.Item>
                        <NavLink
                          to="/word"
                          className="nav-link"
                          activeClassName="active"
                        >
                          Word Length
                        </NavLink>
                      </Nav.Item>
                    </Nav>
                  </Card.Header>
                  <Card.Body>
                    <Route path="/letters" component={InputData} />
                    <Route path="/word" component={InputData} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    </Router>
  );
}

export default App;
