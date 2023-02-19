/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { FaSearch, FaTimes } from "react-icons/fa";
import Tooltip from "@reach/tooltip";

import { useNotification } from "../../context";
import { NotificationType } from "../../utils";
import { Input, Spinner } from "../../components";

const SCancelButton = styled("button")({
  color: "var(--color-warning)",
  border: "0",
  position: "relative",
  marginLeft: "-30px",
  background: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "30px",
  height: "30px",
});

const SSearchButton = styled("button")({
  color: "var(--color-white)",
  paddingLeft: "10px",
  border: "2px solid var(--color-white)",
  borderLeft: 0,
  borderRadius: "5px",
  marginLeft: "-5px",
  background: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "38px",
  height: "33px",
});

interface IProps {
  onSearch: (input: string) => void;
  isFetching: boolean;
}

const ProjectSearchInput: React.FC<IProps> = ({ onSearch, isFetching }) => {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const { setNotification } = useNotification();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInput.length >= 3 || searchInput.length === 0) {
      onSearch(searchInput);
    } else {
      setNotification({
        type: NotificationType.warning,
        message: "Enter at least 3 characters into Search field",
      });
    }
  };

  const handleCancelSearch = () => {
    setSearchInput("");
    onSearch("");
  };

  return (
    <form
      css={{
        display: "flex",
        alignItems: "center",
      }}
      onSubmit={(e) => handleSearch(e)}
    >
      <Input
        placeholder="Search projects..."
        id="search"
        type="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput.length > 0 && (
        <Tooltip label="Cancel search">
          <label htmlFor="cancel">
            <SCancelButton type="button" onClick={handleCancelSearch}>
              <FaTimes aria-label="cancel" />
            </SCancelButton>
          </label>
        </Tooltip>
      )}
      <Tooltip label="Search projects">
        <label htmlFor="search">
          <SSearchButton type="submit">
            {isFetching ? <Spinner /> : <FaSearch aria-label="search" />}
          </SSearchButton>
        </label>
      </Tooltip>
    </form>
  );
};

export { ProjectSearchInput };
