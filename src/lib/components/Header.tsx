"use client";

import Link from "next/link";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { usePathname } from "next/navigation";

const Header = () => {
  const [activeItem, setActiveItem] = useState("/");
  const pathname = usePathname();

  useEffect(() => {
    // ### ### ###
    // Si le navigateur supporte les view transitions, on peut utiliser la méthode document.startViewTransition
    // pour indiquer au navigateur qu'on va faire des changements au DOM
    // ### ### ###
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        // ### ### ###
        // dans ce callback, on peut indiquer au navigateur les changements qu'on fait au DOM
        // et le navigateur saurait ce qu'il doit transitionner
        // ### ### ###

        // ### ### ###
        // flushSync dis a react de faire les changements dans le DOM dans l'immédiat
        // ### ### ###
        flushSync(() => {
          setActiveItem(pathname);
        });
      });
    } else {
      setActiveItem(pathname);
    }
  }, [pathname]);

  return (
    <S.Header>
      <S.HeaderTitle>Header</S.HeaderTitle>
      <S.HeaderNav>
        <S.HeaderNavItem
          href="/"
          className={`header-link ${activeItem === "/" ? "active" : ""}`}
        >
          Home
        </S.HeaderNavItem>
        <S.HeaderNavItem
          href="/about"
          className={`header-link ${activeItem === "/about" ? "active" : ""}`}
        >
          About
        </S.HeaderNavItem>
        <S.HeaderNavItem
          href="/contact"
          className={`header-link ${activeItem === "/contact" ? "active" : ""}`}
        >
          Contact
        </S.HeaderNavItem>
      </S.HeaderNav>
    </S.Header>
  );
};

export default Header;

const S: any = {};
S.Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

S.HeaderTitle = styled.h1``;

S.HeaderNav = styled.nav`
  display: flex;
  gap: 1rem;
`;

S.HeaderNavItem = styled(Link)`
  color: black;
  text-decoration: none;
  position: relative;

  &.active {
    &::before {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 100%;
      height: 0.25rem;
      background-color: red;

      // ### ### ###
      // View transitions ici, on met simplement un nom à un élément qu'on veut transitionner
      // En gros, lors d'un changement de page, la transition se fait comme ça :
      // 1. Le navigateur prend une capture de l'état actuel de la page
      // 2. Le navigateur fait la transition vers la nouvelle page
      // 3. Le navigateur prend une capture de l'état final de la page
      // 4. Le navigateur fait la transition entre les deux captures
      // 5. Si le navigateur trouve deux éléments avec le même nom de transition, et qu'ils ont été update
      // en utilisant la méthode document.startViewTransition, alors il va les transitionner de l'un à l'autre
      // Voir au dessus dans le useEffect, on utilise la méthode document.startViewTransition
      // ### ### ###
      view-transition-name: header-nav-item;
    }
  }
`;
