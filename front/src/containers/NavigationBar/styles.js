import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 998;
`;

export const Nav = styled.nav`
  background-color: #ff8743;
  width: 100vw;
  height: 70px;
  padding: 15px 30px;
  text-align: center;
  color: white;
  font-weight: bold;
`;

export const Span = styled.span`
  > * {
    & {
      line-height: 40px;
      font-family: "BMHANNAAir";
    }
  }
  &:first-child {
    float: left;
  }
  &:nth-child(n + 2) {
    float: right;
  }
  &:last-child {
    margin-right: 20px;
  }
`;

export const Logo = styled.img`
  position: absolute;
  margin-top: 0;
  width: 170px;
  transform: translate(-20px, -20px);
`;

export const Button = styled.button`
  background-color: transparent;
  font-size: 15px;
  font-family: "BMHANNAPro";
  cursor: pointer;
`;

export const Profile = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50px;
  line-height: 40px;
`;
