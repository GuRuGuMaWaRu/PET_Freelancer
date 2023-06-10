/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { FaSearch, FaTimes } from "react-icons/fa";
import Tooltip from "@reach/tooltip";

import { SInput } from "shared/ui";
import { colors } from "shared/const";
import { useNotification } from "app";

const SCancelButton = styled("button")({
  color: colors.text2,
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
  color: colors.white,
  paddingLeft: "10px",
  border: `2px solid ${colors.white}`,
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
}

const SearchInput: React.FC<IProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const notification = useNotification();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInput.length >= 3 || searchInput.length === 0) {
      onSearch(searchInput);
    } else {
      notification.warning("Enter at least 3 characters into Search field");
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
      onSubmit={handleSearch}
    >
      <SInput
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
            <FaSearch aria-label="search" />
          </SSearchButton>
        </label>
      </Tooltip>
    </form>
  );
};

export { SearchInput };
