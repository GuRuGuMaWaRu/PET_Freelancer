import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPen,
  faTrashAlt,
  faInfoCircle,
  faExclamationCircle,
  faTimesCircle,
  faTimes,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "./hooks/redux";

import Navbar from "./components/layout/Navbar";
import Spinner from "./components/layout/Spinner";
import Notification from "./components/layout/Notification";

import { getUser } from "./store/reducers/authSlice";

import {
  StyledTitleBar,
  StyledH1,
  StyledContainer
} from "./components/styles/app.styles";

library.add(
  faPen,
  faTrashAlt,
  faInfoCircle,
  faExclamationCircle,
  faTimesCircle,
  faTimes,
  faCheck
);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(state => state.auth.status);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Notification />
      <StyledTitleBar>
        <StyledH1>Freelancer</StyledH1>
        <Navbar />
      </StyledTitleBar>
      <StyledContainer>
        {authStatus === "loading" ? <Spinner /> : <Outlet />}
      </StyledContainer>
    </>
  );
};

export default App;
