import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Modal from "../components/Modal";
import apis from "../apis/Apis";
import { deleteCookie } from "../shared/Cookie";
import { Box } from "@mui/material";
import Footer from "../components/Footer";

export default function MyPage() {
  const navigate = useNavigate();
  const [editProfile, setEditProfile] = useState(false);
  const [myNick, setMyNick] = useState();
  const imgfile = useRef();
  const [isNickname, setIsNickName] = useState(false);
  const [tmpNick, setTmpNick] = useState(myNick);
  const [myImage, setMyImage] = useState(
    "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
  );
  const [tmpImage, setTmpImage] = useState(myImage);

  const Open = () => {
    setEditProfile(true);
  };
  const ChangeNick = (e) => {
    setTmpNick(e.target.value);
  };
  const close = () => {
    setEditProfile(false);
  };

  const checkNickname = { nickname: tmpNick };
  const onDoublingNickHandler = (e) => {
    e.preventDefault();
    if (tmpNick.length === 0) {
      return alert("닉네임을 입력해주세요");
    } else {
      apis
        .nicknameCheck(checkNickname)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setIsNickName(true);

            alert("사용 가능한 닉네임입니다");
          } else {
            alert("이미 사용중인 닉네임입니다");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    apis
      .getProfile()
      .then((response) => {
        console.log(response);
        setTmpNick(response.data.data.nickname);
        setTmpImage(response.data.data.profileUrl);
        setMyNick(response.data.data.nickname);
        setMyImage(response.data.data.profileUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const AddImage = (e) => {
    const imgSelectList = e.target.files;
    const url = URL.createObjectURL(imgSelectList[0]);
    setTmpImage(url);
  };

  const ClickHandler = (e) => {
    if (e.target.name === "edit") {
      const postData = new FormData();
      const nicknames = {
        nickname: tmpNick,
      };
      if (imgfile.current.files[0] === undefined) {
        postData.append("imageFile", "");
      } else {
        postData.append("imageFile", imgfile.current.files[0]);
      }
      postData.append(
        "requestDto",
        new Blob([JSON.stringify(nicknames)], {
          type: "application/json",
        })
      );
      console.log(postData);
      console.log(tmpNick);
      console.log(imgfile.current.files[0]);
      apis
        .editProfile(postData)
        .then((response) => {
          console.log(response);
          // navigate(`/detail/${response.data.data.id}`);
          setMyNick(tmpNick);
          setMyImage(tmpImage);
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          setEditProfile(false);
        });
    } else {
      return;
    }
  };

  const LogOutAction = () => {
    apis
      .logOutUser()
      .then((response) => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("id");
        deleteCookie("nickname");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        <Header>
          <ArrowBackIcon
            style={{ fontSize: "25px" }}
            onClick={() => {
              navigate("/");
            }}
          />
          <h4>내 프로필</h4>
        </Header>

        {/* 유저 프로필 */}
        <Box sx={{ margin: "auto" }}>
          <Image src={myImage} />
          <NickName> {myNick} 님</NickName>
          <Edit onClick={Open}>프로필 수정</Edit>
          {/* <Rank>랭크 정보(거래 횟수 기준)</Rank> */}
        </Box>

        <MyPost onClick={() => navigate("/submypage:mywrite")}>
          내가 작성한 게시글
        </MyPost>
        <Zzim onClick={() => navigate("/submypage:mybookmark")}>
          내가 찜한 게시글
        </Zzim>
        <LogOut onClick={LogOutAction}>로그아웃</LogOut>
      </Container>
      <Modal visible={editProfile} style={{ zIndex: 10 }}>
        <label onChange={AddImage}>
          <Image
            style={{ marginTop: "5vh" }}
            // src={tmpImage === myImage ? myImage : URL.createObjectURL(tmpImage)}
            src={tmpImage}
          />
          <input
            type="file"
            accept="image/*"
            encType="multipart/form-data"
            hidden
            ref={imgfile}
          />
        </label>
        <div style={{ display: "flex" }}>
          <InputSt
            type="text"
            onChange={ChangeNick}
            name="nick"
            placeholder={tmpNick}
          />
          {isNickname ? (
            <Button
              style={{
                fontSize: "15px",
                backgroundColor: "#FFBA46",
                marginRight: "10px",
                marginLeft: "5px",
                borderRadius: "5px",
                height: "30px",
                marginTop: "4.5vh",
              }}
              disabled
              variant="outlined"
              onClick={(e) => {
                onDoublingNickHandler(e);
              }}
            >
              중복 확인
            </Button>
          ) : (
            <Button
              style={{
                fontSize: "15px",
                backgroundColor: "#FFBA46",
                marginRight: "10px",
                marginLeft: "5px",
                borderRadius: "5px",
                height: "30px",
                marginTop: "4.5vh",
              }}
              variant="outlined"
              onClick={(e) => {
                onDoublingNickHandler(e);
              }}
            >
              중복 확인
            </Button>
          )}
        </div>
        <div style={{ textAlign: "center", alignItems: "center" }}>
          <Button
            style={{
              fontSize: "20px",
              backgroundColor: "#FFBA46",
              marginRight: "20PX",
              borderRadius: "5px",
            }}
            variant="contained"
            component="label"
            onClick={ClickHandler}
            name="edit"
          >
            수정하기
          </Button>

          <Button
            style={{
              fontSize: "20px",
              backgroundColor: "#FFBA46",

              marginRight: "20PX",
              borderRadius: "5px",
            }}
            onClick={close}
          >
            닫기
          </Button>
        </div>
      </Modal>
      <Footer />
    </>
  );
}

const Container = styled.div`
  /* display: grid; */
  margin: auto;
  height: 100vh;
  width: 100vw;
  grid-template-areas:
    ". ."
    "img nick"
    "edit edit"
    "rank rank"
    "mypost mypost"
    "zzim zzim"
    "out out"
    ". .";
`;
const Image = styled.img`
  display: grid;
  grid-area: img;
  margin: auto;
  width: 10rem;
  height: 10rem;
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid black;
  border-radius: 100%;
  flex: none;
`;

const NickName = styled.div`
  display: grid;
  grid-area: nick;
  margin: auto;
  width: 5rem;
  height: 5rem;
  font-size: 20px;
  text-align: left;
`;

const Edit = styled.button`
  display: grid;
  grid-area: edit;
  margin: 0 auto -40px auto;
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  width: 75vw;
  height: 8vh;
  border: none;
  border-radius: 2%;
  background-color: gainboro;
`;

const Rank = styled.div`
  display: grid;
  grid-area: rank;
  text-indent: 8px;
  margin: auto;
  border-radius: 2%;
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
`;

const MyPost = styled.div`
  display: grid;
  grid-area: mypost;
  margin: auto;
  cursor: pointer;
`;

const Zzim = styled.div`
  display: grid;
  grid-area: zzim;
  margin: auto;
  cursor: pointer;
`;

const LogOut = styled.div`
  display: grid;
  grid-area: out;

  margin: auto;
  cursor: pointer;
`;

const Button = styled.button`
  font-size: 15px;
  display: inline-block;
  border: none;
  margin-top: 2vh;
  background-color: transparent;
  color: white;
  &:hover {
    background-color: gray;
    border-radius: 10px;
  }
`;

const InputSt = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gainsboro;
  margin-top: 4vh;
  margin-left: 20vw;
  width: 50%;
  height: 30px;
  text-indent: 8px;
  &:focus {
    outline: 1px solid gray;
  }
`;
