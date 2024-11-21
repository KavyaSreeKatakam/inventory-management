import React, {useState, useEffect} from "react";
import './HomePage.css'
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Nav, Container, Button } from 'react-bootstrap';

const HomePage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    var users = [];
    var status = 0;
    const navigateToPage = useNavigate();
    const [userError, setUserError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [invalidError, setInvalidError] = useState('');

    const handleGet = async () => {
      await fetch(`http://localhost:3000/getLoginUsersData/${userName}/${password}`, {
          mode: 'cors',
          headers: {'Content-Type': 'application/json'}
        })
        .then((result) => {
          return result.json();
        })
        .then(result => {
          status = result.resStatus;
          users = result.data;
        })
        .catch(err => console.error(err));
    };

    function handleUserName(e) {
      e.preventDefault();
      const uName = e.target.value;
      if(!uName){
        setUserError('Value is required');
        setInvalidError('')
      } else {
        setUserError('');
        setInvalidError('')
        
      }
      setUserName(uName);
    }

    function handlePassword(e) {
      e.preventDefault();
      const passwordValue = e.target.value;
      if(!passwordValue){
        setPasswordError('Value is required');
        setInvalidError('')
      } else {
        setPasswordError('');
        setInvalidError('')
      }
     setPassword(passwordValue);
    }

    async function handleSubmit(e) {
      e.preventDefault();
      if(userName === "" && password === ""){
        setUserError('Value is required');
        setPasswordError('Value is required');
        setInvalidError('')
      }
      else if(userName && password && userError === "" && passwordError === "" && invalidError === "") {
        await handleGet();
        if(status === "success") {
          navigateToPage("/UserProfile");
          window.sessionStorage.setItem("sessionUser", userName);
          setInvalidError('')
        } else if(status === "failure") {
          setInvalidError('Invalid username or password')
        }
      }
      
    }


  return (
    <Container fluid style={{ padding: 0, margin: 0 }}>

        <Nav className="media-library2">
        <span className='heading'>Login Page</span>
        <span style={{ margin: '12px' }}></span>
        <Link to="/signup">
          <Button id="signupPage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:10}} >
          Sign up
        </Button>
          </Link>
        </Nav>

      <Container >
        <div >
      
      <Form style={{borderRadius: '10px', border: '1px solid black', padding: '10px', marginLeft: '250px', marginRight: '250px', marginTop: '100px', height: '380px'}} className="loginForm" onSubmit={handleSubmit}>
      <div>
       {invalidError && <Form.Text className="text-danger">{invalidError}</Form.Text>}
       </div>
        <br/>
      <Form.Group controlId="formEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={userName} onChange={handleUserName} />
        {userError && <Form.Text className="text-danger">{userError}</Form.Text>}
      </Form.Group>
          <br/>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword}/>
        {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
      </Form.Group>
          <br/>
      <Button variant="secondary" type="submit">
        Log In
      </Button>
          <br/>
          <br/>
      <Form.Group controlId="formLabel">
        <Form.Label>Do not have an account ?</Form.Label>
        <span style={{ margin: '2px' }}></span>
        <Link to="/signup">
         Sign up
        </Link>
      </Form.Group>
    </Form>
    </div>
      </Container>
    </Container>
  );
};
export default HomePage; 


