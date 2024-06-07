import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ProductScreen() {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    const { data } = await axios.get(`/api/products/`);
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);

    axios
      .post(`/api/product-create/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        fetchProduct(); // Fetch the updated list of products
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("submit");
    handleClose();
  };

  return (
    <div>
      <div className="d-flex justify-content-end py-3">
        <Button variant="primary" onClick={handleShow}>
          Add Product
        </Button>
      </div>
      <div>
        <Row>
          {product.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>₹{Math.floor(product.price)}</Card.Title>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={imageHandler} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductScreen;
