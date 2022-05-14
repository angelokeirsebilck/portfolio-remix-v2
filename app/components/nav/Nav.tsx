import React from "react";
import { NavLink } from "@remix-run/react";
import Container from "../base/Container";
import type { NavItem } from "../../utils/types";

interface NavProps {
  mainNav: Array<NavItem>;
}

function Nav(props: NavProps) {
  return (
    <div className="bg-black-default text-white">
      <Container>
        <ul className="flex items-center h-16 text-black">
          <li className="mr-4">
            <NavLink
              prefetch="intent"
              className={({ isActive }) =>
                isActive ? "text-secondary-default" : undefined
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          {props.mainNav.map((item, index: number) => {
            return (
              <li className="mr-4" key={index}>
                <NavLink
                  prefetch="intent"
                  className={({ isActive }) =>
                    isActive ? "text-secondary-default" : undefined
                  }
                  to={item.slug}
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
