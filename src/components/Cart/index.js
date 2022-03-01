import React from "react";
import { Card, Offcanvas, ListGroup } from "react-bootstrap";
import { addIcon, removeIcon, xIcon } from "../../icons";
import { style } from "./style";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(style);

const Cart = (props) => {

    const styles = useStyles();

    const { cart, show, handleClose, removeItem, increase, decrease } = props;

    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, { price, quantity }) => total + price * quantity, 0).toFixed(2);

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cart.length ? (
                    cart.map((item) => (
                        <Card className={styles.cart} key={item.id}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <span
                                        style={{ float: "right", top: "1px" }}
                                        className={styles.btn}
                                        onClick={() => removeItem(item)}
                                    >
                                        {xIcon}
                                    </span>
                                    <Card.Img
                                        variant="top"
                                        src={item.image}
                                        alt=""
                                        style={{ height: "90px", width: "90px" }}
                                    />
                                    <span style={{ marginLeft: "1rem" }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                    <Card.Text className="mt-2">{item.title}</Card.Text>
                                    <button
                                        size="sm"
                                        variant="warning"
                                        onClick={() => increase(item)}
                                        className={styles.cardBtn}
                                    >
                                        {addIcon}
                                    </button>
                                    <button
                                        size="sm"
                                        variant="warning"
                                        className={styles.cardBtn}
                                    >
                                        {item.quantity}
                                    </button>
                                    <button
                                        size="sm"
                                        variant="warning"
                                        onClick={() => decrease(item)}
                                        className={styles.cardBtn}
                                    >
                                        {removeIcon}
                                    </button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    ))
                ) : (
                    <div className={styles.empty}>Your cart is empty</div>
                )}
                {cart.length > 0 && (
                    <div style={{ textAlign: "center" }} className="me-2 mt-2">
                        Subtotal ({itemCount} items):{" "}
                        <span style={{ fontWeight: 600 }}>${cartTotal}</span>
                    </div>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};
export default Cart;
