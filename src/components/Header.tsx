import styled from "@emotion/styled";
import { Link } from "gatsby";
import React, { Dispatch, SetStateAction, useCallback } from "react";

export default function Header() {
  return (
    <Base>
      <Link to="/" className="logo">
        🌞🌲log.
      </Link>
      <section></section>
    </Base>
  );
}

const Base = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  & .logo {
    font-size: 30px;
    font-weight: 600;
    @media (max-width: 500px) {
      font-size: 24px;
    }
  }
  section {
    display: flex;
    gap: 15px;
  }
  button {
    font-size: 15px;
    font-weight: 400;
  }
  & .link {
    font-size: 15px;
    font-weight: 400;
  }
`;
