import React from "react";
import { FormControl, Navbar, Row, Col } from "react-bootstrap";
import { cartIcon } from "../../icons";
import { style } from "./style";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(style);

const Header = (props) => {

    const styles = useStyles()

    const {cart, handleShow, setSearch } = props

  return (
    <Row>
      <Navbar bg="warning">
        <Col >
          <Navbar.Brand>Store</Navbar.Brand>
          <span onClick={handleShow} className={styles.btn}>
            {" "}{cartIcon}{" "}
          </span>
          {cart.length > 0 && (
            <span className={styles.count}>
              {cart.length > 0 ? cart.length : ""}
            </span>
          )}
        </Col>
        <Col >
          <FormControl
            type="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Navbar>
    </Row>
  );
};
export default Header;
