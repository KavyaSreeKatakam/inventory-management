import React, { useEffect } from "react";
import { useState } from 'react';
import './APIInfo.css'
import {Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const APIInfo = () => {
  const [res, setRes] = useState("");

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ab299c70d5msh3e6d0d2e08b5f09p107a01jsn4092f96a44bf',
      'X-RapidAPI-Host': 'spott.p.rapidapi.com'
    }
  };
  

  useEffect(() => {
    fetch('https://spott.p.rapidapi.com/places/autocomplete?limit=10&skip=0&country=US%2CCA&q=Sea&type=CITY', options)
    .then(response => response.json())
    .then(result => {
                  setRes(result)
              })
    .then(response => console.log(response))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
    <Nav className="media-library">
    <span className='heading'>Fetching Data from Third Party API</span>
    <Link to="/UserProfile">
          <Button id="userProfilePage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:420}} >
          User Profile
        </Button>
    </Link>

    <Link to="/Introduction">
          <Button id="introductionPage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right: 300}} >
            Introduction
          </Button>
        </Link>

    <Link to="/addition">
        <Button id="additionPage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:207}} >
          Addition
        </Button>
    </Link>

    <Link to="/Inventory">
        <Button id="inventoryManagement" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:10}} >
          Inventory Management
        </Button>
    </Link>
  </Nav>
    <div className="infoTable">
     
    <Table bordered>
      <thead>
        <tr>
          <th>City</th>
          <th>Country</th>
          <th>Population</th>
          <th>Time Zone Id</th>
          <th>Coordinates</th>
        </tr>
      </thead>
      <tbody>
        {res && res.map(result => (
          <tr key={result.id}>
            <td>{result.name}</td>
            <td>{result.country.name}</td>
            <td>{result.population}</td>
            <td>{result.timezoneId}</td>
            <td>{result.coordinates.latitude + '° latitude ,' + result.coordinates.longitude + '° longitude'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
  </div>
  );
};

export default APIInfo;
