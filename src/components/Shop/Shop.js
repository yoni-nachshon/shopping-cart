import React, { useEffect, useState } from "react";
import { Card, Button, Offcanvas, Badge, Navbar, Container, ListGroup, CloseButton, Spinner } from "react-bootstrap";
import { addIcon, removeIcon, cartIcon } from "../icons";
import { style } from "./style";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(style);

const Shop = () => {

    const styles = useStyles();

    const [show, setShow] = useState(false);

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);
    const [showInCart, setShowInCart] = useState([]);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getData()
        async function getData() {
            const data = await fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
            setProducts(data)
            setLoading(false)
        }
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cartTotal = cart.reduce((total, { price }) => total + price, 0).toFixed(2);

    const amountOfItems = (item) => cart.filter(i => i.id === item.id).length;

    const addToCart = (item) => {
        setCart([...cart, item]);
        if (showInCart.findIndex(i => i.id === item.id) === -1) {
            setShowInCart([...showInCart, item])
        }
    }

    const removeItem = (id) => {
        let copy = [...cart]
        let amount = copy.filter(i => i.id === id).length
        if (amount > 1) {
            let index = copy.findIndex(i => i.id === id)
            if (index !== -1) {
                copy.splice(index, 1)
            }
        }
        setCart(copy)

    }

    const removeFromCart = (item) => {
        let copyCart = cart.filter((i) => i.id !== item.id)
        let showCartCopy = showInCart.filter((i) => i.id !== item.id)
        setCart(copyCart)
        setShowInCart(showCartCopy)
    }

    const clearCart = () => {
        setCart([])
        setShowInCart([])
    }

    return loading ? (

        <div className={styles.spinner}>
            <Spinner animation="border" role="status" />
        </div>

    ) : (
        <>
            <Navbar  >
                <Container >
                    <Navbar.Brand onClick={handleShow}>{cartIcon}</Navbar.Brand>
                </Container>
            </Navbar>
            <div className={styles.container} >
                {products.map((item) => (
                    <Card style={{ width: '15rem' }} key={item.id}>
                        <Card.Img variant="top" src={item.image} alt="" className={styles.image} />
                        <Card.Body >
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>${item.price}</Card.Text>
                            <Button variant="success" onClick={() => addToCart(item)} className={styles.addItem}>Add To Cart</Button>
                        </Card.Body>
                    </Card>
                ))}
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {showInCart.length ? (

                            showInCart.map((item) => (
                                <Card style={{ width: '18rem' }} className={styles.container}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item key={item.id} closeButton>
                                            <Card.Img variant="top" src={item.image} alt="" style={{ height: '50px', width: '50px' }} />
                                            <span style={{ marginLeft: '2rem' }}>${(item.price.toFixed(2) * amountOfItems(item))}</span>
                                            <span style={{ marginLeft: '5rem' }} onClick={() => removeFromCart(item)}><CloseButton /></span>
                                            <div>{`${item.title}`} </div>
                                            <div>
                                                <span onClick={() => addToCart(item)} className={styles.btn}>{addIcon}</span> &nbsp;
                                                <Badge bg="secondary">{amountOfItems(item)}</Badge> &nbsp;
                                                <span onClick={() => removeItem(item.id)} className={styles.btn}>{removeIcon}</span> &nbsp;
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            ))
                        ) : (<div className={styles.empty} >Your cart is empty</div>)}
                        {showInCart.length > 0 && (
                            <div style={{ textAlign: 'center' }} className="me-2 mt-2">
                                subtotal ({cart.length} items): ${cartTotal} &nbsp;
                                <Button variant="outline-dark" size="sm" onClick={() => clearCart()}>
                                    Clear
                                </Button>
                            </div>
                        )}
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    )
}

export default Shop;