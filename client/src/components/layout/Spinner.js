import React from "react";

import spinner from "./ajax-loader.gif";
import { StyledImg } from "../styles/spinner.styles";

const Spinner = () => <StyledImg src={spinner} alt="Loading..." />;

export default Spinner;
