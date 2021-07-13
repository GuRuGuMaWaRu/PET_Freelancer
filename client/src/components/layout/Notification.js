import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { removeNotification } from "../../reducers/notificationsSlice";
import {
  StyledAlert,
  StyledCloseIcon,
  StyledTypeIcon
} from "../styles/alert.styles";

const duration = 300;

const constructMessage = (msgType, data) => {
  switch (msgType) {
    case "create client":
      return (
        <p>
          Created client: <span>{data[0]}</span>
        </p>
      );
    case "update project":
      return (
        <p>
          Updated project <span>{data[0]}</span> from <span>{data[1]}</span>
        </p>
      );
    case "create project":
      return (
        <p>
          Created project <span>{data[0]}</span> from <span>{data[1]}</span>
        </p>
      );
    case "delete project":
      return "Deleted a project";
    default:
      return "Something happened";
  }
};

const Notifcation = () => {
  const message = useSelector(state => state.notifications.message);
  const showMessage = useSelector(state => state.notifications.show);
  const dispatch = useDispatch();

  const timeoutId = useRef();

  useEffect(() => {
    if (showMessage) {
      timeoutId.current = setTimeout(
        () => dispatch(removeNotification()),
        2000
      );
    }

    // eslint-disable-next-line
  }, [showMessage]);

  const handleCloseNotification = () => {
    clearTimeout(timeoutId.current);
    dispatch(removeNotification());
  };

  return (
    <CSSTransition in={showMessage} timeout={duration} appear mountOnEnter>
      {state => (
        <StyledAlert state={state} duration={duration}>
          {message.type === "info" ? (
            <StyledTypeIcon icon="info-circle"></StyledTypeIcon>
          ) : (
            <StyledTypeIcon icon="exclamation-circle"></StyledTypeIcon>
          )}
          {constructMessage(message.subType, message.data)}
          <StyledCloseIcon
            onClick={handleCloseNotification}
            icon="times-circle"
          ></StyledCloseIcon>
        </StyledAlert>
      )}
    </CSSTransition>
  );
};

export default Notifcation;
