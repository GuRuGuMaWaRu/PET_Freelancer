/** @jsxImportSource @emotion/react */

import React, { useState } from "react";

import { Menu } from "./Dropdown.styles";
import { useOutsideClick } from "shared/lib";

interface IProps {
  trigger: React.ReactElement;
  menu: React.ReactElement[];
  dropdownStyles: React.CSSProperties;
}

function Dropdown({ trigger, menu, dropdownStyles }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick(closeDropdown);

  return (
    <div css={{ position: "relative" }}>
      {React.cloneElement(trigger, {
        ref,
        onClick: handleOpen,
      })}
      {isOpen ? (
        <Menu
          css={{
            ...dropdownStyles,
          }}
        >
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {React.cloneElement(menuItem, {
                style: { width: "100%" },
                onClick: () => {
                  menuItem.props.onClick();
                  setIsOpen(false);
                },
              })}
            </li>
          ))}
        </Menu>
      ) : null}
    </div>
  );
}

export { Dropdown };
