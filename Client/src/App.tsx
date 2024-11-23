import { Layout } from "./components/layout";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/login-page";
import { OtpVerification } from "./components/otp-verification";
import { MentorsList } from "./components/mentors-list";
import Home from "./components/Home";
import { SessionBookingDialog } from "./components/session-booking-dialog";
import OtpComponent from "./components/OtpComponent";
import { ChatSectionComponent } from "./components/chat-section";
import { ChatDetailComponent } from "./components/chat-detail";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setOnlineUsers, setSocket } from "./redux/slices/socketSlice";

function App() {
  const { isLoggedIn, userDetails } = useSelector((state) => state.userReducer);
  const { socket } = useSelector((state) => state.socketReducer);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (isLoggedIn) {
      const socketio = io("http://localhost:7878", {
        query: {
          userId: userDetails?.user?._id,
        },
      });

      dispatch(setSocket(socketio));
      socketio.on("connect", () => {
        console.log("Connected to server");
      });

      socketio.on("getAllOnlineUser", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => socketio.close();
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [isLoggedIn]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mentors" element={<MentorsList />} />
          <Route path="/chat" element={<ChatSectionComponent />} />
          <Route path="/chat/:id" element={<ChatDetailComponent />} />
        </Route>
        <Route path="/otp" element={<OtpComponent />} />
        <Route
          path="/mentors/book-session"
          element={<SessionBookingDialog />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
      </Routes>
    </>
  );
}

export default App;
