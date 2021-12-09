import React, { useState } from "react";
import { Card, Button, ListGroup, Container, Offcanvas, Badge } from "react-bootstrap";
import { addIcon, removeIcon, removeItem } from "./icons";


const items = [
    {
        id: 1,
        name: "book",
        price: 40,
        
    },
    {
        id: 2,
        name: "phone",
        price: 100,
        
    },
    {
        id: 3,
        name: "pen",
        price: 15,

    },
];

const Shop = () => {

    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);

    const addToCart = (item) => setCart([...cart, item]);

    const decraseAmountOfItem = (id) => {
        let copy = [...cart]
        let index = copy.indexOf(id)      
        copy.splice(index, 1)      
        setCart(copy)
    }

    const removeFromCart = (item) => {
        let copy = [...cart]
        copy = copy.filter((i) => i.id !== item.id);
        setCart(copy);
    };


    const amountOfItems = (id) => cart.filter((item) => item.id === id).length;

    return (
        <div style={{ textAlign: 'center', marginTop: '7rem' }}>
            <div>Store</div>
            {items.map((item) => (
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card style={{ width: '18rem' }}>
                        <ListGroup variant="flush">
                            <ListGroup.Item key={item.id}>
                                {`${item.name}: $${item.price}`} &nbsp;
                                <span onClick={() => addToCart(item)}>{addIcon}</span> &nbsp;
                                <Badge bg="secondary">{amountOfItems(item.id)}</Badge> &nbsp;
                                <span onClick={() => decraseAmountOfItem(item.id)}>{removeItem}</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Container>
            ))}
            <Button variant="outline-dark" size="sm" onClick={handleShow} className="me-2 mt-2">
                Go to cart
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {items.map((item) => (
                        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={{ width: '18rem' }}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item key={item.id}>
                                        ({amountOfItems(item.id)} x ${item.price}) {`${item.name}`} &nbsp;
                                        <span onClick={() => removeFromCart(item)}>{removeIcon}</span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Container>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'center' }} className="me-2 mt-2">
                        Total: ${cartTotal} &nbsp;
                        <Button variant="outline-dark" size="sm" onClick={() => setCart([])}>
                            Clear
                        </Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Shop;