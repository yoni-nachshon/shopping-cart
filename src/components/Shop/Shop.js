import React, { useEffect, useState } from "react";
import { Card, Button, Offcanvas, Navbar, Container, Row, Col } from "react-bootstrap";
import { ListGroup, Spinner, FormControl, ButtonGroup } from "react-bootstrap";
import { addIcon, removeIcon, cartIcon, xIcon } from "../icons";
import { style } from "./style";
import { makeStyles } from '@mui/styles';
import { items } from "../../data";

const useStyles = makeStyles(style);

const Shop = () => {

    const [show, setShow] = useState(false);

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')

    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)

    const styles = useStyles()

    useEffect(() => {
        setTimeout(() => {
            setProducts(items)
            console.table(items)
            setLoading(false)
        }, 2000)
    }, [])

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')))
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addItemToCart = (item) => {
        const updatedCart = [...cart];
        const updatedItemIndex = updatedCart.findIndex(i => i.id === item.id)
        if (updatedItemIndex < 0) {
            updatedCart.push({ ...item, quantity: 1 });
        } else {
            const updatedItem = {
                ...updatedCart[updatedItemIndex]
            }
            updatedItem.quantity++;
            updatedCart[updatedItemIndex] = updatedItem;
        }
        setCart(updatedCart)
    }

    const removeItemFromCart = (item) => {
        const updatedCart = [...cart];
        if (item.quantity > 1) {
            const updatedItemIndex = updatedCart.findIndex(i => i.id === item.id)
            const updatedItem = { ...updatedCart[updatedItemIndex] }
            updatedItem.quantity--;
            if (updatedItem.quantity <= 0) {
                updatedCart.splice(updatedItemIndex, 1);
            } else {
                updatedCart[updatedItemIndex] = updatedItem;
            }
        }
        setCart(updatedCart)
    }

    const removeFromCart = (item) => {
        let updatedCart = cart.filter((i) => i.id !== item.id)
        setCart(updatedCart)
        console.log(updatedCart);
    }

    const cartTotal = cart.reduce((total, { price, quantity }) => total + price * quantity, 0).toFixed(2);

    return loading ? (
        <div className={styles.spinner}>
            <Spinner animation="border" role="status" />
        </div>
    ) : (
        <Container style={{ width: '70%' }}>
            <Row>
                <Navbar bg="warning" >
                    <Col sm={8}>
                        <Navbar.Brand>Store</Navbar.Brand>
                        <span onClick={handleShow} className={styles.btn}> {cartIcon} </span>
                        {cart.length > 0 &&
                            <span className={styles.count} >
                                {cart.length > 0 ? cart.length : ''}
                            </span>
                        }

                    </Col>
                    <Col>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            onChange={(e) => { setSearch(e.target.value) }}
                        />
                    </Col>
                </Navbar>
            </Row>
            <div className={styles.container}>
                {products
                    .filter((item) => {
                        return item.title.toLowerCase().includes(search.toLowerCase())
                    })
                    .map((item) => (
                        <Card style={{ width: '12.5rem' }} key={item.id}>
                            <Card.Body >
                                <Card.Img variant="top" src={item.image} alt="" className={styles.image} />
                                <Card.Text className="mt-2">{item.title}</Card.Text>
                                <Card.Text>${item.price}</Card.Text>
                                <div className="d-grid gap-2">
                                    <Button variant="warning" onClick={() => addItemToCart(item)}>Add To Cart</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                }
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {cart.length ? (
                            cart.map((item) => (
                                <Card className={styles.cart} key={item.id}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item >
                                            <span style={{ float: 'right', top: '1px' }} className={styles.btn} onClick={() => removeFromCart(item)}>{xIcon}</span>
                                            <Card.Img variant="top" src={item.image} alt="" style={{ height: '90px', width: '90px' }} />
                                            <span style={{ marginLeft: '1rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
                                            <Card.Text className="mt-2">{item.title}</Card.Text>
                                            <ButtonGroup>
                                                <Button size="sm" variant="warning" onClick={() => addItemToCart(item)}>{addIcon}</Button>
                                                <Button size="sm" variant="warning" >{item.quantity}</Button>
                                                <Button size="sm" variant="warning" onClick={() => removeItemFromCart(item)}>{removeIcon}</Button>
                                            </ButtonGroup>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            ))
                        ) : (
                            <div className={styles.empty} >Your cart is empty</div>
                        )}
                        {cart.length > 0 && (
                            <div style={{ textAlign: 'center' }} className="me-2 mt-2">
                                subtotal ({cart.length} items):
                                ${cartTotal}
                            </div>
                        )}
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </Container>
    )
}

export default Shop;