import React, { useEffect, useState } from "react";
import { Card, Button, Offcanvas, Badge, Navbar, Container } from "react-bootstrap";
import { addIcon, removeIcon, XIcon, cartIcon } from "../icons";
import { style } from "./style";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(style);

const Shop = () => {

    const styles = useStyles();

    const [cart, setCart] = useState([]);
    const [count,setCount] = useState(0);
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getData()
        async function getData() {
            const data = await fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
            console.log(data);
            setProducts(data)
        }

    }, [])


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cartTotal = cart.reduce((total, { price }) => total + price, 0);

    const addToCart = (item) => {
        const index = cart.find(i => i.id === item.id)
        if(!index){
            setCart([...cart, item])
            setCount(count + 1)
        }
        setCart([...cart, item])
    } 
     
    const removeItem = (id) => {
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
        <>
            <Navbar >
                <Container>
                    <div onClick={handleShow}>{cartIcon}</div>

                </Container>

            </Navbar>
            <div className={styles.container} >

                {products.map((item) => (

                    <Card style={{ width: '15rem' }}>

                        <Card.Img variant="top" src={item.image} alt="" style={{ height: '150px', width: '150px' }} />
                        <Card.Body key={item.id}>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>${item.price}</Card.Text>
                            <Button variant="success" onClick={() => addToCart(item)} className={styles.addItem}>Add To Cart</Button>
                        </Card.Body>

                    </Card>

                ))}

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {cart
                            .map((item) => (

                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.image} alt="" style={{ height: '150px', width: '150px' }} />
                                    <Card.Body key={item.id}>


                                        ({amountOfItems(item.id)} x ${item.price.toFixed(2)}) {`${item.title}`}
                                        <div>

                                            <span onClick={() => addToCart(item)} className={styles.addItem}>{addIcon}</span> &nbsp;
                                            <Badge bg="secondary">{amountOfItems(item.id)}</Badge> &nbsp;
                                            <span onClick={() => removeItem(item.id)}>{removeIcon}</span> &nbsp;
                                            <span onClick={() => removeFromCart(item)}>{XIcon}</span>
                                        </div>


                                    </Card.Body>
                                </Card>

                            ))}
                        <div style={{ textAlign: 'center' }} className="me-2 mt-2">
                            Total: ${cartTotal} &nbsp;
                            <Button variant="outline-dark" size="sm" onClick={() => setCart([])}>
                                Clear
                            </Button>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    )
}

export default Shop;