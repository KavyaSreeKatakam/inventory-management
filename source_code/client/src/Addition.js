import React from "react";
import { useState } from 'react';
import './Addition.css'
import Button from 'react-bootstrap/Button';
import {Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';

const Addition = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [res, setRes] = useState("");

  function handleSubmit(e) {
  
    e.preventDefault();
    
    const url = `http://localhost:3000/add/${(Number(num1))}/and/${(Number(num2))}`
        fetch(url, {mode: 'cors', headers: {'Content-Type': 'application/json'}})
            .then((result) => result.json())
            .then(result => {
                setRes(result.Addition)
            });
  }

  return (
  <div>
     <Nav className="media-library3">
     <Link to="/UserProfile">
          <Button id="userProfilePage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:550}} >
          User Profile
        </Button>
    </Link>

    <Link to="/Introduction">
          <Button id="introductionPage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right: 430}} >
            Introduction
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
        &nbsp; &nbsp;
       <span className='heading'>Addition</span>
    </Nav>


     <Container className="addition-library">
       

      <Col >
      <form onSubmit = {handleSubmit}>
       <Row>
       <label>Enter First Number:
        <input 
          type="number" className="add-num1" 
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        </label>
        </Row> 
        <br/>
        <Row> 
        <label>Enter Second Number:
        <input 
          type="number" className="add-num2" 
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
        </label>
        </Row> 
        <br/>
        
        <Button 
          onClick={handleSubmit}
          value="Submit">Submit
        </Button>

        <br/>
        <Row> 
        <label 
          className="result-server">Your Addition Result (from Server) is: {Number(res)}
        </label>
        </Row> 
        <Row> 
        <label 
          className="result-react">Your Addition Result (from ReactJS) is: {(Number(num1) + Number(num2))}
        </label>
        </Row> 

      </form>
      </Col>
    </Container> 
    </div>
  );
};

export default Addition;