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
      console.table(items);
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addItemToCart = (item) => {
    const updatedCart = [...cart];
    const updatedItemIndex = updatedCart.findIndex((i) => i.id === item.id);
    if (updatedItemIndex < 0) {
      updatedCart.push({ ...item, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex],
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }
    setCart(updatedCart);
  };

  const removeItemFromCart = (item) => {
    const updatedCart = [...cart];
    if (item.quantity > 1) {
      const updatedItemIndex = updatedCart.findIndex((i) => i.id === item.id);
      const updatedItem = { ...updatedCart[updatedItemIndex] };
      updatedItem.quantity--;
      if (updatedItem.quantity <= 0) {
        updatedCart.splice(updatedItemIndex, 1);
      } else {
        updatedCart[updatedItemIndex] = updatedItem;
      }
    }
    setCart(updatedCart);
  };

  const removeFromCart = (item) => {
    let updatedCart = cart.filter((i) => i.id !== item.id);
    setCart(updatedCart);
  };

  const cartTotal = cart
    .reduce((total, { price, quantity }) => total + price * quantity, 0)
    .toFixed(2);

  return loading ? (
    <div className={styles.spinner}>
      <Spinner animation="border" role="status" />
    </div>
  ) : (
    <Container style={{ width: "70%" }}>
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
          removeItemFromCart={removeItemFromCart}
          removeFromCart={removeFromCart}
          addItemToCart={addItemToCart}
          cartTotal={cartTotal}
        />
      </div>
    </Container>
  );
};
export default Shop;
