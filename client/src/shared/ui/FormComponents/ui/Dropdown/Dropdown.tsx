/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

import { Menu, MenuItem } from "./Dropdown.styles";
import { useOutsideClick } from "shared/lib";

const AnimatedMenu = animated(Menu);

interface IProps {
  trigger: React.ReactElement;
  menu: React.ReactElement[];
  dropdownStyles?: React.CSSProperties;
}

function Dropdown({ trigger, menu, dropdownStyles = {} }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const transition = useTransition(isOpen, {
    from: { opacity: 0, y: 5 },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
      y: 5,
    },
  });

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
      <div>
        {transition(
          (styles, item) =>
            item && (
              <AnimatedMenu style={{ ...dropdownStyles, ...styles }}>
                {menu.map((menuItem, index) => (
                  <MenuItem key={index} className="menu-item">
                    {React.cloneElement(menuItem, {
                      style: { width: "100%" },
                      onClick: () => {
                        if (menuItem.props?.onClick) {
                          menuItem.props?.onClick();
                        }
                        setIsOpen(false);
                      },
                      tabIndex: isOpen ? 0 : -1,
                    })}
                  </MenuItem>
                ))}
              </AnimatedMenu>
            )
        )}
      </div>
    </div>
  );
}

export { Dropdown };
