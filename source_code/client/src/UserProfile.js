import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './UserProfile.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const [res, setRes] = useState([]);
  const navigateToPage = useNavigate();
  const user = window.sessionStorage.getItem("sessionUser");

  useEffect(() => {
      handleGet();
  }, []);

  React.useEffect(() => {
    if (!window.sessionStorage.getItem("sessionUser")) {
      navigateToPage("/");
    }
  }, [navigateToPage]);


  const handleGet = async () => {
    await fetch(`http://localhost:3000/getProfileUserRecords/${user}`, {
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
      })
      .then((result) => result.json())
      .then(result => {
        setRes(result);
      })
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    window.sessionStorage.clear();
    navigateToPage("/");
  };

  return (
    <div>
      <Nav className="media-library">
        <span className='heading'>User Profile</span>
        <Link to="/Introduction">
          <Button id="introductionPage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:585}} >
            Introduction
          </Button>
        </Link>

        <Link to="/addition">
          <Button id="additionPage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:490}} >
            Addition
          </Button>
        </Link>

        <Link to="/3rdPartyAPI">
          <Button id="APIInfo" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:268}} >
            3rd-Party-API-Information
          </Button>
        </Link>

        <Link to="/Inventory">
          <Button id="inventoryManagement" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:70}} >
            Inventory Management
          </Button>
        </Link>
        <div style={{ position: 'absolute', top: 3, right: 10 }}>
          <DropdownButton id="dropdown-menu" variant="secondary" title={<FontAwesomeIcon icon={faUser} style={{ color: 'white'}} />}>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </DropdownButton>
        </div>

      </Nav>

      <div className="userDetails">
        <br/>
        <br/>
        {res.map((item) => (
          <div key={item._id}>
            <div><h6>First Name:</h6> </div><p>{item.firstName}</p>
            <br/>
            <div><h6>Last Name:</h6></div> <p>{item.lastName}</p>
            <br/>
            <div><h6>Name:</h6></div> <p>{item.firstName + " " + item.lastName}</p>
            <br/>
            <div><h6>Email:</h6></div> <p>{item.email}</p>
            <br/>
            <div><h6>Username:</h6></div> <p>{item.userName}</p>
            <br/>
          </div>
        ))}
      </div>

    </div>
  );
};

export default UserProfile;

