import Box from "@mui/material/Box";
import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.js";
import * as style from "./styles";
import { useRecoilValue } from "recoil";
import { authState } from "state";
import CompletedMenuForm from "components/EtcItem/CompletedMenuForm/CompletedMenuForm.js";
import { useRecoilState } from "recoil";
import locationState from "state/locationState";
import orderState from "state/orderState";
import useInput from "hooks/useInput.js";
import { useLocation } from "react-router-dom";
import { getOrder, getOrders } from "api/order.js";
import { addJoinOrder } from "api/joinorder.js";
import { addMenu } from "api/menu.js";

// 메뉴 추가 버튼
const NewMenu = ({ menu, onRemoveMenu }) => {
  // 추가 버튼 클릭 시, 입력된 메뉴와 가격 나타내는 컴포넌트
  return (
    <div>
      <div style={styles.newMenuDiv}>
        <span style={styles.menuSpan}>{menu.menu}</span>
        <span style={styles.menuSpan}>{menu.price}원</span>
        <button style={styles.menuDel} onClick={() => onRemoveMenu(menu.id)}>
          x
        </button>
      </div>
    </div>
  );
};

function FollowMenu() {
  const [orderData, setOrderData] = useState({
    id: "",
    store: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });
  // 주문 데이터를 받아옴
  const getOrderAndShow = async (markerId) => {
    await getOrder(markerId)
      .then((res) => {
        console.log("SSS", res.data);
        setOrderData({
          id: res.data.id,
          store: res.data.store,
          address: res.data.location_obj.location_nickname,
          date: res.data.time.substring(0, 10),
          time: res.data.time.substring(11, 19),
          description: res.data.description,
        });
      })
      .catch((e) => console.log(e));
  };
  const uploadFollower = async () => {
    console.log("보내야될 데이터", newmenus, price, description);
    if (newmenus.length === 0) {
      alert("메뉴를 작성하셔야 합니다");
    }
    let data = {
      order: orderData.id,
      description: description.description,
    };
    console.log("joinOrder", data, "menus", newmenus);
    await addJoinOrder(data)
      .then((res) => {
        newmenus.forEach(async (menu_item) => {
          addMenu({
            join_order: res.data.id,
            menu_name: menu_item.menu,
            menu_price: menu_item.price,
            menu_quantity: 1,
          })
            .then((response) => {
              console.log("성공!");
            })
            .catch((err) => console.log("joinOrder Error", err));
        });
        alert("팔로우했습니다!");
      })
      .catch((err) => console.log("joinOrder Error", err));
  };
  // 주문 데이터를 받아서 사용
  useEffect(() => {
    getOrderAndShow(markerId);
  }, []);

  useEffect(() => {
    console.log("set", orderData);
  }, [orderData]);
  const address = useRecoilState(locationState);
  const markerId = useRecoilState(orderState)[0].id;
  const userInfo = useRecoilValue(authState);
  const [createBtnState, setCreateBtnState] = useState(false);
  const [description, onChange, reset] = useInput({
    description: "",
  });
  //사용자가 입력한 메뉴들 배열
  const [newmenus, setNewmenus] = useState([]);
  // 메뉴 input 값 가져오기 위한 ref
  const menu = useRef();
  // 가격 input 값 가져오기 위한 ref
  const price = useRef();
  let sumPrice = 0;

  // 작성버튼 클릭 상태
  const onClickedCreateBtn = () => {
    // setCreateBtnState(!createBtnState);
    uploadFollower();
  };

  const onAddMenu = (e) => {
    // 추가 클릭시 , 메누 배열 다음 id 값, 메뉴와 가격 input에 들어있는 value를 배열에 새롭게 추가 --> input값들은 빈 value로 돌리기
    if (menu.current.value !== "" && price.current.value !== "") {
      setNewmenus([
        ...newmenus,
        {
          id: newmenus.length === 0 ? 1 : newmenus.slice(-1)[0].id + 1,
          menu: menu.current.value,
          price: price.current.value,
        },
      ]);
      menu.current.value = "";
      price.current.value = "";
    } else {
      alert("메뉴와 가격을 입력해주세요");
    }
  };

  // 메뉴추가 후 삭제
  const onRemoveMenu = (id) => {
    setNewmenus(newmenus.filter((menu) => menu.id !== id));
  };

  // // 서버에서 받아온 time 날짜와 시간 분리
  // const date = res.data.time.subString(0, 9);
  // const time = res.data.time.subString(11, 18);

  // 메뉴의 총 가격 계산
  newmenus.map((newmenu) => {
    sumPrice += parseInt(newmenu.price);
  });

  return (
    <>
      <div>
        <Box>
          <div style={styles.headerStyle}>
            <h1>참여하기</h1>
          </div>
        </Box>
        <div style={styles.divLeft}>
          <Box style={styles.Contents_one}>
            <div style={styles.Contents_two}>
              <div style={styles.menuDiv}>
                <label style={styles.label}>음식점명</label>
                <input style={styles.input} value={orderData.store} readOnly />
              </div>
              <div style={styles.menuDiv}>
                <label style={styles.label}>픽업 주소</label>
                <input
                  style={styles.input}
                  value={orderData.address}
                  defaultValue={address[0].address}
                />
              </div>
              <div style={styles.menuDiv}>
                <label style={styles.label}>주문 날짜</label>
                <input style={styles.input} value={orderData.date} readOnly />
              </div>
              <div style={styles.menuDiv}>
                <label style={styles.label}>주문 시간</label>
                <input style={styles.input} value={orderData.time} readOnly />
              </div>
              <div style={styles.menuDiv}>
                <label style={styles.label}>전달사항</label>
                <input
                  style={styles.input}
                  value={orderData.description}
                  readOnly
                />
              </div>
            </div>
          </Box>
        </div>
        {createBtnState ? (
          // 작성버튼 클릭-> 주문서 작성 완료된 폼
          <>
            <CompletedMenuForm
              newmenus={newmenus}
              sumPrice={sumPrice}
              description={description.description}
            />
          </>
        ) : (
          // 작성버튼 클릭x-> 기본 따라가기 폼
          <div style={styles.divRight} id="divRight">
            <Box style={styles.Contents_one}>
              <div style={styles.headerStyle2}>
                <h2>나의 메뉴 추가하기</h2>
              </div>
              <div style={styles.Contents_three}>
                <div>
                  {userInfo.isLoggedIn ? (
                    <div style={styles.menuDiv}>
                      <label style={styles.menuLabel} htmlFor="menu">
                        주문 희망 메뉴
                      </label>
                      <input
                        style={styles.menuInput}
                        ref={menu}
                        id="menu"
                        type="text"
                        placeholder="메뉴를 입력하세요"
                      />
                      <label style={styles.menuLabel} htmlFor="price">
                        가격
                      </label>
                      <input
                        style={styles.menuInput}
                        ref={price}
                        id="price"
                        type="number"
                        step="100"
                        // oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                        placeholder="가격을 입력하세요"
                      />
                      <style.menuButton onClick={onAddMenu}>
                        추가
                      </style.menuButton>
                    </div>
                  ) : (
                    <div style={styles.menuDiv}>
                      <label style={styles.menuLabel} htmlFor="menu">
                        주문 희망 메뉴
                      </label>
                      <input
                        style={styles.menuInput}
                        ref={menu}
                        id="menu"
                        type="text"
                        placeholder="메뉴를 입력하세요"
                        disabled
                      />
                      <label style={styles.menuLabel} htmlFor="price">
                        가격
                      </label>
                      <input
                        style={styles.menuInput}
                        ref={price}
                        id="price"
                        type="number"
                        step="100"
                        placeholder="가격을 입력하세요"
                        disabled
                      />
                      <style.menuButton onClick={onAddMenu} disabled>
                        추가
                      </style.menuButton>
                    </div>
                  )}
                  {newmenus.map(
                    (
                      //배열에 들어있는 값들 map을 통해 하나씩 꺼내서 NewMenu 컴포넌트로 html 생성 , newmenu는 newmenus 배열 내 객체 하나를 뜻함.
                      newmenu
                    ) => (
                      // menu와 onRemove 보라색은 컴포넌트로 넘겨주는 인자 표시,{onRemove} 함수 넘겨줌.
                      <NewMenu menu={newmenu} onRemoveMenu={onRemoveMenu} />
                    )
                  )}
                </div>
                <div style={styles.sumStyle}>
                  <div style={styles.sumLabel}>총 금액</div>
                  <div style={styles.sumPrice}>{sumPrice}원</div>
                </div>
                <div style={styles.menuDiv}>
                  <label style={styles.label}>전달사항</label>
                  <input
                    style={styles.input}
                    name="description"
                    placeholder="전달사항을 입력해주세요"
                    value={description.value}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div>
                {userInfo.isLoggedIn ? (
                  // 로그인ㅇ -> 버튼 클릭 가능
                  <div style={styles.btnWrapper}>
                    <style.Button onClick={onClickedCreateBtn}>
                      작성
                    </style.Button>
                    <style.Button>채팅</style.Button>
                  </div>
                ) : (
                  // 로그인x -> 버튼 클릭 불가능
                  <div style={styles.btnWrapper}>
                    <style.Button disabled>작성</style.Button>
                    <style.Button disabled>채팅</style.Button>
                  </div>
                )}
              </div>
            </Box>
          </div>
        )}
      </div>
    </>
  );
}

export default FollowMenu;
