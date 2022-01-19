export const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "1rem",
  },
  cart: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "1.35rem",
    margin:'1rem',
    width: "20rem",
  },
  store: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    height: "120px",
    width: "120px",
  },
  empty: {
    height: "75vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  count: {
    position: "absolute",
    bottom: "1.5rem",
    left: "5.3rem",
    background: " #000",
    color: "#ffc107",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "8px",
  },
  cardBtn: {
    border: " none",
    background: " #ffc107",
    color: "#000",
    "&:hover": {
        cursor: "pointer",
      },
  },
  
};
