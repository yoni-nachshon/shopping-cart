import React, { useEffect, useState } from "react";
import { Card, Button, Offcanvas, Badge, Navbar, Container, ListGroup, Spinner, FormControl } from "react-bootstrap";
import { addIcon, removeIcon, cartIcon, xIcon } from "../icons";
import { style } from "./style";
import { makeStyles } from '@mui/styles';
import { items } from "../../data";

const useStyles = makeStyles(style);

const Shop = () => {

    const styles = useStyles();

    const [show, setShow] = useState(false);

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('');

    const [cart, setCart] = useState([]);
    const [showInCart, setShowInCart] = useState([]);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setProducts(items)
            setLoading(false)
        }, 2000)
    }, [])

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')))
        setShowInCart(JSON.parse(localStorage.getItem('showInCart')))
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        localStorage.setItem('showInCart', JSON.stringify(showInCart))
    }, [cart, showInCart])

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

    return loading ? (

        <div className={styles.spinner}>
            <Spinner animation="border" role="status" />
        </div>

    ) : (
        <>
            <Container className={styles.store}>
                <Navbar.Brand className={styles.btn} onClick={handleShow}>{cartIcon}</Navbar.Brand>
                <Navbar.Brand >Store</Navbar.Brand>
                    <FormControl
                        style={{width:'18rem'}}
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        onChange={(e) => { setSearch(e.target.value) }}
                    />
            </Container>

            <div className={styles.container} >
                {products
                    .filter((item) => {
                            return item.title.toLowerCase().includes(search.toLowerCase())                                        
                    })
                    .map((item) => (
                        <>
                            <Card style={{ width: '18rem' }} >
                                <ListGroup variant="flush">
                                    <ListGroup.Item key={item.id}>
                                        <Card.Img variant="top" src={item.image} alt="" className={styles.image} />

                                        <Card.Title className="mt-2">{item.title}</Card.Title>
                                        <Card.Text>${item.price}</Card.Text>
                                        <Button  variant="success" onClick={() => addToCart(item)}>Add To Cart</Button>

                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </>
                    ))
                }
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {showInCart.length ? (

                            showInCart.map((item) => (
                                <Card style={{ width: '20rem' }} className={styles.cart} key={item.id}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item closeButton>
                                            <span style={{ float: 'right', top: '1px' }} className={styles.btn} onClick={() => removeFromCart(item)}>{xIcon}</span>
                                            <Card.Img variant="top" src={item.image} alt="" style={{ height: '90px', width: '90px' }} />
                                            <span style={{ marginLeft: '1rem' }}>${(item.price.toFixed(2) * amountOfItems(item))}</span>
                                            <div><span >{item.title}</span></div>
                                            <div>
                                                <span onClick={() => addToCart(item)} className={styles.btn}>{addIcon}</span> &nbsp;
                                                <Badge bg="secondary">{amountOfItems(item)}</Badge> &nbsp;
                                                <span onClick={() => removeItem(item.id)} className={styles.btn}>{removeIcon}</span> &nbsp;
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            ))
                        ) : (
                        <div className={styles.empty} >Your cart is empty</div>
                        )}
                        {showInCart.length > 0 && (                          
                            <div style={{ textAlign: 'center' }} className="me-2 mt-2">
                                subtotal ({cart.length} items): ${cartTotal} 
                            </div>                                               
                        )}
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    )
}

export default Shop;