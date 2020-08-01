import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Transition } from "react-transition-group";

import { removeNotification } from "../../reducers/notificationsSlice";
import {
  StyledAlert,
  StyledCloseIcon,
  StyledTypeIcon
} from "../styles/alert.styles";

const duration = 200;

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

  if (!showMessage) {
    return null;
  }

  return (
    <Transition in={showMessage} timeout={duration}>
      {state => (
        <StyledAlert state={state} duration={duration}>
          {message.type === "info" ? (
            <StyledTypeIcon icon="info-circle"></StyledTypeIcon>
          ) : (
            <StyledTypeIcon icon="exclamation-circle"></StyledTypeIcon>
          )}
          <p>{message.msg}</p>
          <StyledCloseIcon
            onClick={handleCloseNotification}
            icon="times-circle"
          ></StyledCloseIcon>
        </StyledAlert>
      )}
    </Transition>
  );
};

export default Notifcation;
