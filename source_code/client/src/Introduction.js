import React from "react";
import { useState } from 'react';
import './Introduction.css'
import { BsFillBootstrapFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Container, Row, Col, Button } from 'react-bootstrap';

const Introduction = () => {
  const updateName = (e) => {
    setNameUp(e.target.value)
  };
  
  const updateDesc = (e) => {
    setDescUp(e.target.value)
  };
  
  let media = 'Introduction'
  let name = 'Kavya Sree Katakam'
  let description = 'Hello, I\'m Kavya Sree Katakam, currently pursuing masters in Computer Science\. I have around 1.5 years of work experience, during which I worked as an Associate Software Engineer, where in I\'ve developed web applications by gaining insight into various languages like Type Script, Java Script, Java and performed end-to-end testing using applications like GAT, Cypress. Technical Skills: C, Java, Python, SQL, HTML, CSS.'
  const [nameUp, setNameUp] = useState(name);
  const [descUp, setDescUp] = useState(description);

  return (
    <Container fluid style={{ padding: 0, margin: 0 }}>
      <Container fluid style={{ padding: 0, margin: 0 }}>

        <Nav className="media-library">
        
          {media}

          <Link to="/UserProfile">
            <Button id="userProfilePage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:522}} >
            User Profile
            </Button>
          </Link>

          <Link to="/addition">
          <Button id="additionPage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:430}} >
            Addition
          </Button>
        </Link>

        <Link to="/3rdPartyAPI">
          <Button id="APIInfo" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:210}} >
            3rd-Party-API-Information
          </Button>
        </Link>

        <Link to="/Inventory">
          <Button id="inventoryManagement" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:10}} >
            Inventory Management
          </Button>
        </Link>
        </Nav>
        <Row>
          <Col>
            <div>
              <input className="name" value={nameUp} onChange = {updateName}
              ></input>
            </div>
            <div >
              <textarea className="description" value={descUp} onChange = {updateDesc}
              ></textarea>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default Introduction; 