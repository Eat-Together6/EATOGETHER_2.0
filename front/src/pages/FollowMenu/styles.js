import styled from "styled-components";

export const Button = styled.button`
    background-color: white;
    font-size: 0.9rem;
    padding: 12px 24px;
    border-radius: 0.55rem;
    margin: 25;
    margin-bottom: 25px;
    box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #f3f3f3;
    border: none;
    font-weight: bold;
    margin-right: 40px;
    cursor: pointer;
    &:hover {
      box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #f3f3f3;
    },
`;

export const menuButton = styled.button`
    background-color: white;
    border-radius: 0.55rem;
    box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #f3f3f3;
    position: absolute;
    margin: 5px 0;
    cursor: pointer;
    width: 40px;
    height: 30px;
    line-height: 30px;
    &:hover {
      box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #f3f3f3;
    },
`;

export default {
  headerStyle: {
    fontFamily: "BMHANNAPro",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "150px",
  },

  headerStyle2: {
    fontFamily: "BMHANNAPro",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    marginTop: "15px",
    marginBottom: "25px",
  },

  Contents_one: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  Contents_two: {
    width: "100%",
    display: "flex",
    marginRight: "60px",
    marginTop: "40px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  Contents_three: {
    width: "750px",
    display: "flex",
    marginLeft: "0px",
    flexDirection: "column",
    marginBottom: "30px",
    marginLeft: "50px",
  },

  btnWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  divLeft: {
    float: "left",
    width: "50%",
  },

  divRight: {
    backgroundColor: "#f3f3f3",
    borderRadius: "30px",
    float: "right",
    width: "700px",
    marginRight: "30px",
    height: "80%",
  },

  menuDiv: {
    margin: "10px 0",
    marginLeft: "40px",
  },

  label: {
    fontFamily: "BMHANNAPro",
    fontSize: "1.2rem",
    marginTop: "15px",
    fontWeight: "550",
  },

  menuLabel: {
    fontSize: "1.2rem",
    marginRight: "20px",
  },

  sumLabel: {
    marginLeft: "430px",
    marginTop: "5px",
    marginBottom: "10px",
    fontSize: "1.3rem",
    color: "#38726C",
  },

  sumStyle: {
    display: "flex",
  },

  sumPrice: {
    marginLeft: "30px",
    marginTop: "5px",
    marginBottom: "0px",
    fontSize: "1.3rem",
    color: "#38726C",
  },

  input: {
    width: "350px",
    fontSize: "0.875rem",
    marginLeft: "160px",
    backgroundColor: "#ececec",
    fontFamily: "BMHANNAPro",
    height: "38px",
    padding: "0px 20px",
    borderRadius: "0.55rem",
    boxShadow: "inset 3px 3px 7px #d3d3d3, inset -3px -3px 7px #ffffff",
  },

  menuInput: {
    width: "180px",
    fontSize: "0.875rem",
    fontWeight: "100",
    marginRight: "20px",
    lineHeight: "1",
    backgroundColor: "#ececec",
    fontFamily: "BMHANNAPro",
    height: "38px",
    padding: "0px 20px",
    borderRadius: "0.55rem",
    boxShadow: "inset 3px 3px 7px #d3d3d3, inset -3px -3px 7px #ffffff",
  },

  newMenuDiv: {
    margin: " 10px 0",
    marginRight: "120px",
    textAlign: "right",
    fontSize: "1.2rem",
    fontWeight: "100",
    height: "30px",
  },

  menuSpan: {
    marginRight: "20px",
    lineHeight: "30px",
  },

  menuDel: {
    padding: "0",
    cursor: "pointer",
    width: "15px",
    height: "15px",
    borderRadius: "50px",
    backgroundColor: "#fa4444",
    boxShadow: "3px 3px 6px #b8b9be, -3px -3px 6px #f3f3f3",
  },
};
