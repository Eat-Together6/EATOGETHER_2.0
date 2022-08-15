import { Routes, Route } from "react-router-dom";
import { MyPage, OrderHistory, CreateMenu, FollowMenu, Home } from "pages";

export default function Authorized() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/followMenu" element={<FollowMenu />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/createMenu" element={<CreateMenu />} />
    </Routes>
  );
}
