import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { removeNotification } from "../../reducers/notificationsSlice";
import {
  StyledAlert,
  StyledCloseIcon,
  StyledTypeIcon
} from "../styles/notification.styles";
import {
  NOTIFICATION_DURATION,
  NOTIFICATION_ANIMATION_DURATION
} from "../../config";

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

const Notification = () => {
  const message = useSelector(state => state.notifications.message);
  const showMessage = useSelector(state => state.notifications.show);
  const dispatch = useDispatch();

  const timeoutId = useRef();

  useEffect(() => {
    if (showMessage) {
      timeoutId.current = setTimeout(
        () => dispatch(removeNotification()),
        NOTIFICATION_DURATION
      );
    }
    return () => clearTimeout(timeoutId.current);
    // eslint-disable-next-line
  }, [showMessage]);

  const handleCloseNotification = () => {
    clearTimeout(timeoutId.current);
    dispatch(removeNotification());
  };

  const messageIcon =
    message?.type === "create" || message?.type === "delete"
      ? "check"
      : "exclamation-circle";

  return (
    <CSSTransition
      in={showMessage}
      timeout={NOTIFICATION_ANIMATION_DURATION}
      appear
      mountOnEnter
    >
      {state => (
        <StyledAlert
          state={state}
          duration={NOTIFICATION_ANIMATION_DURATION}
          msgtype={message.type}
        >
          <div>
            <StyledTypeIcon
              icon={messageIcon}
              msgtype={message.type}
            ></StyledTypeIcon>
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

export default Notification;
