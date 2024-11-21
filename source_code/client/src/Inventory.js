import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import {Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import "./Inventory.css";
import { Nav } from 'react-bootstrap';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Inventory() {
  const [inventoryFormState, setInventoryFormState] = useState(false);
  const [inventoryData, setInventoryData] = useState("");
  const [buttonId, setButtonId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [title, setTitle] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClose2 = () => setModalIsOpen(false);
  const handleClose = () => setInventoryFormState(false);
  const handleShow = () => setInventoryFormState(true);
  const [itemdata, setItemData] = useState({
    _id: '',
    name: '',
    quantity: '',
    image: ''
  });
  

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState({});
  
  const handleFileInputChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
   handleGet();
  }, []);

  const handleGet = async () => {
    fetch(`http://localhost:3000/Inventory/getInventoryData`, 
      {mode: 'cors', 
      method: 'GET', 
      headers: {Accept: "application/json", "Content-Type": "application/json"}
      })
      .then((res) => res.json())
      .then(result => {
        const fetchPromises = result.map(item => {
          if(item.image != null) {
            const fileName = item.image.split(".");
            const file =  fileName[1]+ '.' + fileName[2];
            return fetch(`http://localhost:3000${file}`)
              .then(res => res.blob())
              .then(blob => {
                const url = URL.createObjectURL(blob);
                item.image = url;
              });
          }
        });
        return Promise.all(fetchPromises)
          .then(() => {
            const modifiedData = result.map(item => ({
              _id: item._id,
              name: item.name,
              quantity: item.quantity,
              image: item.image
            }))
           
            setInventoryData(modifiedData);
          });
      })
      .catch(err => console.error(err));
  };


  const handleSubmit = (event) => {
    const data = {name, quantity, image};
    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("image", image);

    try {
    fetch('http://localhost:3000/uploadFile', {
        mode: 'cors',
        method: 'POST',
        body: formData,
      }).then(() => {handleGet()});
    } catch (error) {
      console.error(error);
    }
    event.preventDefault();
    handleClose();
  };


  const handleEdit = (_id) => {
    const selectedItem = inventoryData.find(inventory => inventory._id === _id);
    setItemData({
      _id: selectedItem._id,
      name: selectedItem.name,
      quantity: selectedItem.quantity
    });
    setName(selectedItem.name);
    setQuantity(selectedItem.quantity)
  };
  useEffect(() => {
  }, [itemdata]);

  const handleUpdate = (event) => {
    const id = itemdata._id;
    const data = {id, name, quantity};
     fetch('http://localhost:3000/Inventory/updateInventoryData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(data),
      }).then(() => {handleGet()});
  
    event.preventDefault();
    handleClose();
    
  };


  const handleDeleteId = (_id) => {
    setDeleteId(_id);
  };
  useEffect(() => {
  }, [deleteId]);

  const handleDelete = () => {
     fetch(`http://localhost:3000/Inventory/deleteInventoryData/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }).then(() => {handleGet()});
    handleClose2();
    
  };


  const handleButtonClick = (id, bId) => {
    setButtonId(bId);
    if(bId == "editInventory"){
      handleShow();
      handleEdit(id);
    } else if(bId == 'deleteInventory') {
      setModalIsOpen(true);
      handleDeleteId(id);
    } else {
      handleShow();
    }
  };
  useEffect(() => {
    if(buttonId == "addInventory"){
      setTitle("Add Inventory");
    } else {
      setTitle("Edit Inventory");
    }
  }, [buttonId]);

  return (
    <div>
      <Nav className="media-library">
      <Link to="/UserProfile">
          <Button id="userProfilePage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:440}} >
          User Profile
        </Button>
    </Link>

    <Link to="/Introduction">
          <Button id="introductionPage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right: 320}} >
            Introduction
          </Button>
        </Link>

      <Link to="/addition">
          <Button id="additionPage" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:230}} >
          Addition
        </Button>
          </Link>

          <Link to="/3rdPartyAPI">
          <Button id="APIInfo" style={{borderRadius: '10px', border: '1px solid black', backgroundColor: 'white', color:'black', position: 'absolute',  top: 2, right:10}} >
          3rd-Party-API-Information
        </Button>
          </Link>
          &nbsp; &nbsp;
         <span className='heading'>Inventory Management</span>
      </Nav>

      <Button id="addInventory" className='addButton'  style={{ position: 'absolute',  top: 60, right: 20 }} onClick={() => handleButtonClick(null, "addInventory")}>
          Add Inventory
        </Button>

      <div >
    
        <Modal show={inventoryFormState} onHide={handleClose}> 
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>

          <Form className='formPopup'>
            <Modal.Body>

              {buttonId == "addInventory" ? (
                <>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="Name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                  </Form.Group>
                  <br/>
                  <Form.Group controlId="formQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Enter quantity" onChange={(e) => setQuantity(e.target.value)}/>
                  </Form.Group>
                  <br/>
                  <Form.Group controlId="formImage">
                    <Form.Label>Upload image</Form.Label>
                    <Form.Control type="file" placeholder="Upload image" onChange={handleFileInputChange} />
                  </Form.Group>
                </>
                  ) : (
                    <>
                    <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="Name" placeholder="Enter name" defaultValue = {itemdata.name} onChange={(e) => setName(e.target.value)} />
                  </Form.Group>
                  <br/>
                  <Form.Group controlId="formQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Enter quantity" defaultValue ={itemdata.quantity} onChange={(e) => setQuantity(e.target.value)}
                   />
                  </Form.Group>
                </>
              )}

            </Modal.Body>

            <Modal.Footer>
              <Button style={{border: '1px solid black', backgroundColor: 'lightgrey', color: 'black' }}  onClick={handleClose}>
                Close
              </Button>

              {buttonId == "addInventory" ? (
                  <>
                    <Button style={{ border: '1px solid black', backgroundColor: 'white', color: 'black' }} type="submit" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </>
                ) : (
                  <Button style={{ border: '1px solid black' ,backgroundColor: 'white', color: 'black' }} onClick={handleUpdate}>
                    Update
                  </Button>
              )}

            </Modal.Footer>
          </Form>
        </Modal>
      </div>

      <div >
        <Modal show={modalIsOpen} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this item?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
              <Button style={{border: '1px solid black', backgroundColor: 'lightgrey', color: 'black' }}  onClick={handleClose2}>
                Cancel
              </Button>
              <Button variant='danger' style={{ border: '1px solid black', color: 'black' }} onClick={() => handleDelete()}>
                Delete
              </Button>

          </Modal.Footer>
        </Modal>
      </div>



{(inventoryData && inventoryData.length > 0) ? 
    (<div >
      <Table className='invTable' bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData && inventoryData.map(result => (
            <tr key={result._id}>
              <td>{result.name}</td>
              <td>{result.quantity}</td>
              <td >
              {result.image ? (
                  <img className='tableImage' src={result.image} alt="inventory" />
                ) : (
                  <p>No Image</p>
                )}
              </td>
              <td>
            <Button style={{ backgroundColor: 'white', border: 'none' }} id="editInventory" onClick={() => handleButtonClick(result._id, "editInventory")}>
            <FontAwesomeIcon icon={faEdit} style={{ color: 'black'}} />
          </Button>
          <span style={{ margin: '7px' }}></span>
          <Button style={{ backgroundColor: 'white', border: 'none' }} id="deleteInventory" onClick={() => handleButtonClick(result._id, "deleteInventory")}>
            <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'black'}} />
          </Button>
            </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>) :
    (<div >
      <Table className='invTable' bordered>
      <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
      </Table>
       <p className='noData'>
          No inventory items !
        </p>

    </div>)}

  </div>

  );
}

export default Inventory;

