import styled from "@emotion/styled";
import React from "react";
import Footer from "./Footer";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Base>
      <GlobalStyle />
      <Header />
      {children}
      <Footer />
    </Base>
  );
}

const Base = styled.div`
  width: 730px;
  margin: 0 auto;
  padding: 0 20px;
  @media (max-width: 730px) {
    width: 100%;
  }
`;
