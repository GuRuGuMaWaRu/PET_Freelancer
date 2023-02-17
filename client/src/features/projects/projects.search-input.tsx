/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { FaSearch, FaTimes } from "react-icons/fa";
import Tooltip from "@reach/tooltip";

import { useNotification } from "../../context";
import { NotificationType } from "../../utils";
import { Spinner } from "../../components";

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
      <input
        placeholder="Search projects..."
        id="search"
        type="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {searchInput.length > 0 && (
        <Tooltip label="Cancel search">
          <label htmlFor="cancel">
            <button
              css={{
                color: "tomato",
                border: "0",
                position: "relative",
                marginLeft: "-30px",
                background: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30px",
                height: "30px",
              }}
              onClick={handleCancelSearch}
            >
              <FaTimes aria-label="cancel" />
            </button>
          </label>
        </Tooltip>
      )}
      <Tooltip label="Search projects">
        <label htmlFor="search">
          <button
            type="submit"
            css={{
              // color: "#fff",
              // border: "0",
              position: "relative",
              // background: "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30px",
              height: "30px",
            }}
          >
            {isFetching ? <Spinner /> : <FaSearch aria-label="search" />}
          </button>
        </label>
      </Tooltip>
    </form>
  );
};

export { ProjectSearchInput };
