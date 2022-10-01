import { useState, useEffect } from "react";
import Header from "../components/Header";
import apis from "../apis/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import AlarmCard from "../components/AlarmCard";
import { Container } from "@mui/material";

export default function AlarmPage() {
  const navigate = useNavigate();
  const [alarmList, setAlarmList] = useState([]);

  useEffect(() => {
    apis
      .checkAlarm()
      .then((response) => {
        setAlarmList(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header>
        <ArrowBackIcon
          style={{ fontSize: "25px" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <Container>알림</Container>
        <button>모두 읽음</button>
      </Header>
      {alarmList.map((alarm, idx) => {
        return <AlarmCard alarm={alarm} key={idx}></AlarmCard>;
      })}
    </>
  );
}
