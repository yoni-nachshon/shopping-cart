import React from "react";
import { Card, Button } from "react-bootstrap";
import { style } from "./style";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(style);

const Product = (props) => {
  const styles = useStyles()
  const { products, search, addItem } = props;
  const productList = products.filter(item => item.title.includes(search))
  return (
    <>
      {productList.length ?
        productList.map((item) => (
          <Card style={{ width: "12.5rem" }} key={item.id}>
            <Card.Body>
              <Card.Img
                variant="top"
                src={item.image}
                alt=""
                className={styles.image}
              />
              <Card.Text className="mt-2">{item.title}</Card.Text>
              <Card.Text>${item.price}</Card.Text>
            </Card.Body>
            <Button
              className={styles.cardBtn}
              variant="warning"
              size="sm"
              onClick={() => addItem(item)}
            >
              Add To Cart
            </Button>
          </Card>
        )
        ) : (
          <div className={styles.notFound}>Product not found</div>)}
    </>
  );
};
export default Product;
