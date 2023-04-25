import { css, Global } from "@emotion/react";
import React from "react";

export default function GlobalStyle() {
  return <Global styles={globalStyle} />;
}

export const globalStyle = () => css`
  @font-face {
    font-family: "Pretendard", sans-serif;
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: url("../fonts/Pretendard-Regular.subset.woff") format("woff"),
      url("../fonts/Pretendard-Regular.subset.woff2") format("woff2"),
    unicode-range: U+0020-007E;
  }
  @font-face {
    font-family: "Pretendard", sans-serif;
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: url("../fonts/Pretendard-SemiBold.subset.woff") format("woff"),
      url("../fonts/Pretendard-SemiBold.subset.woff2") format("woff2"),
    unicode-range: U+0020-007E;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
    font-weight: 400;
    color:#000000;
  }

  body {
    background: #FFFFFF;
  }

  code {
    color: #000000;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }
`;
