import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";

import { style } from "./style";
import { makeStyles } from "@mui/styles";

import { items } from "../../data";

import Header from "../Header";
import Product from "../Product";
import Cart from "../Cart";

const useStyles = makeStyles(style);

const Shop = () => {
  
  const [show, setShow] = useState(false);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = useStyles();

  useEffect(() => {
    setTimeout(() => {
      setProducts(items);
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const arr = localStorage.getItem("cart")
    setCart(arr ? JSON.parse(arr) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addItemToCart = (item) => {
    const index = cart.findIndex(i => i.id === item.id);
    index < 0 ? cart.push({ ...item, quantity: 1 }) : cart[index].quantity++;    
    setCart([...cart])
  }

  const decreaseQuantity = (item) => {
    const index = cart.findIndex(i => i.id === item.id);
    if (item.quantity > 1) cart[index].quantity--;     
    setCart([...cart]);
  };

  const removeItemFromCart = (item) => {
    let updatedCart = cart.filter((i) => i.id !== item.id);
    setCart(updatedCart);
  };

  return loading ? (
    <div className={styles.spinner}>
      <Spinner animation="border" role="status" />
    </div>
  ) : (
    <Container style={{ width: "70%" }}>
      <div style={{marginTop:'1rem'}}></div>
      <Header
        cart={cart}
        setSearch={setSearch}
        handleShow={handleShow}
      />
      <div className={styles.container}>
        <Product
          products={products}
          search={search}
          addItemToCart={addItemToCart}
        />
        <Cart
          cart={cart}
          show={show}
          handleClose={handleClose}
          decrease={decreaseQuantity}
          removeItemFromCart={removeItemFromCart}
          addItemToCart={addItemToCart}
        />
      </div>
    </Container>
  );
};
export default Shop;
