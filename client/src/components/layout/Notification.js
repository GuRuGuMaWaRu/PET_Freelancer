import React, { useEffect } from "react";
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

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => dispatch(removeNotification()), 2000);
    }

    // eslint-disable-next-line
  }, [showMessage]);

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
            onClick={() => dispatch(removeNotification())}
            state={state}
            duration={duration}
            icon="times-circle"
          ></StyledCloseIcon>
        </StyledAlert>
      )}
    </Transition>
  );
};

export default Notifcation;
