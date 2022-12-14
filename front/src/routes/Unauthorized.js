import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, FollowMenu, CreateMenu } from "pages";

export default function Unauthorized() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/followMenu" element={<FollowMenu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/createMenu" element={<CreateMenu />} />
    </Routes>
  );
}
