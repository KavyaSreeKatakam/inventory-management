import React, {useState, useEffect} from "react";
import './SignupPage.css';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Nav, Container, Button } from 'react-bootstrap';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const navigateToPage = useNavigate();
  const [users, setUsers] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [fnameError, setFNameError] = useState('');
  const [lnameError, setLNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repassError, setRePassError] = useState('');

  useEffect(() => {
    handleGet();
   }, []);

  const handleGet = async () => {
    await fetch(`http://localhost:3000/getUsersData`, {
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
      })
      .then((result) => result.json())
      .then(result => {
          setUsers(result);
          
      })
      .catch(err => console.error(err));
  };

  const handleUserName = (e) => {
    const uName = e.target.value;
    const foundUser = users.find(user => user.userName === uName);
    if(!uName){
      setUserNameError('Value is required');
    }
    else if (foundUser) {
      setUserNameError('Username already exists');
    } else {
      setUserNameError('');
    }
  
    setUserName(uName);
  };



  function handleFirstName(e) {
    e.preventDefault();
    const fname = e.target.value;
    if(!fname){
      setFNameError('Value is required');
    } else {
      setFNameError('');
    }
   setFirstName(fname);
  }

  function handleLastName(e) {
    e.preventDefault();
    const lname = e.target.value;
    if(!lname){
      setLNameError('Value is required');
    } else {
      setLNameError('');
    }
   setLastName(lname);
  }

  function handleEmail(e) {
    e.preventDefault();
    const emailId = e.target.value;
    if(!emailId){
      setEmailError('Value is required');
    } else {
      setEmailError('');
    }
   setEmail(emailId);
  }

  function handlePassword(e) {
    e.preventDefault();
    const pwd = e.target.value;
    if(!pwd){
      setPasswordError('Value is required');
    } else {
      setPasswordError('');
    }
   setPassword(pwd);
  }

  function handleReenterPasword(e) {
    e.preventDefault();
    const rpwd = e.target.value;
    if(!rpwd){
      setRePassError('Value is required');
    } else {
      setRePassError('');
    }
   setReenterPassword(rpwd);
  }

  const handleSubmit = (event) => {
    if((firstName === "")){
      setFNameError('Value is required');
    }
    if(lastName === "") {
      setLNameError('Value is required');
    }
    if(email === "") {
      setEmailError('Value is required');
    }
    if(password === ""){
      setPasswordError('Value is required');
    }
    if(userName === "") {
      setUserNameError('Value is required');
    }
    if(reenterPassword === "") {
      setRePassError('Value is required');
    }
    if((password && reenterPassword) && password !== reenterPassword) {
      setRePassError("Password and Re-enter password doesn't match")
    } 
    if(firstName && lastName && email && userName && password && reenterPassword && 
      fnameError === "" && lnameError === "" && emailError === "" &&
      userNameError === "" && passwordError === "" && repassError === "" && password === reenterPassword) {
    const data = {firstName, lastName, userName, email, password};
    try {
    fetch('http://localhost:3000/addUser', {
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(data),
      }).then(navigateToPage("/"));
    } catch (error) {
      console.error(error);
    }
  }
    event.preventDefault();
  };


  return (
    <Container fluid style={{ padding: 0, margin: 0 }}>

        <Nav className="media-library2">
        <span className='heading'>Signup Page</span>
        <span style={{ margin: '12px' }}></span>
        </Nav>

      <Container >
        <div >
       
      <Form style={{borderRadius: '10px', border: '1px solid black', padding: '10px', marginLeft: '250px', marginRight: '250px', marginTop: '5px', height: '680px'}} className="signinForm" onSubmit={handleSubmit}>
        <br/>

      <Form.Group controlId="formName">
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '10px', flex: 1 }}>
            <Form.Label style={{ width: '100px', textAlign: 'left' }}>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={handleFirstName} />
            {fnameError && <Form.Text className="text-danger">{fnameError}</Form.Text>}
          </div>
          <div style={{ flex: 1 }}>
            <Form.Label style={{ width: '100px', textAlign: 'left' }}>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={handleLastName} />
            {lnameError && <Form.Text className="text-danger">{lnameError}</Form.Text>}
          </div>
        </div>
      </Form.Group>

      <br/>
      <Form.Group controlId="formUserName">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={userName} onChange={handleUserName} />
        {userNameError && <Form.Text className="text-danger">{userNameError}</Form.Text>}
      </Form.Group>


      <br/>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail} />
        {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
      </Form.Group>
          <br/>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} />
        {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
      </Form.Group>
          <br/>
      <Form.Group controlId="formReenterPassword">
        <Form.Label>Re-enter Password</Form.Label>
        <Form.Control type="password" placeholder="Re-enter Password" value={reenterPassword} onChange={handleReenterPasword} />
        {repassError && <Form.Text className="text-danger">{repassError}</Form.Text>}
      </Form.Group>
          <br/>
      <Button variant="secondary" type="submit">
        Sign up
      </Button>
    </Form>
    </div>
      </Container>
    </Container>
  );
};
export default SignupPage; 
