import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { removeNotification } from "../../reducers/notificationsSlice";
import {
  StyledAlert,
  StyledCloseIcon,
  StyledTypeIcon
} from "../styles/noitification.styles";

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
    case "auth error":
      return data;
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
        4000
      );
    }
    return () => clearTimeout(timeoutId.current);
    // eslint-disable-next-line
  }, [showMessage]);

  const handleCloseNotification = () => {
    clearTimeout(timeoutId.current);
    dispatch(removeNotification());
  };

  return (
    <CSSTransition in={showMessage} timeout={duration} appear mountOnEnter>
      {state => (
        <StyledAlert state={state} duration={duration} msgtype={message.type}>
          <div>
            {(message.type === "create" || message.type === "delete") && (
              <StyledTypeIcon
                icon="check"
                msgtype={message.type}
              ></StyledTypeIcon>
            )}
            {(message.type === "error" || message.type === "fail") && (
              <StyledTypeIcon
                icon="exclamation-circle"
                msgtype={message.type}
              ></StyledTypeIcon>
            )}
          </div>
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
