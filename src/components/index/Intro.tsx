import styled from "@emotion/styled";
import React from "react";

export default function Intro() {
  return (
    <Base>
      기록하는 습관 ✍️ <br />
      💫 확장되는 경험
    </Base>
  );
}

const Base = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 600;
  @media (max-width: 500px) {
    font-size: 24px;
  }
`;
