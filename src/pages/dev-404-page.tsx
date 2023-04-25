import styled from "@emotion/styled";
import { Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";

export default function notfound() {
  return (
    <Layout>
      <Base>
        <h1>404 NOT FOUND</h1>
        <p>찾을 수 없는 페이지 입니다.</p>
        <Button to="/">메인 페이지로 가기</Button>
      </Base>
    </Layout>
  );
}

const Base = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  min-height: 500px;
  margin-top: 80px;
  > h1 {
    margin-top: 30px;
    font-size: 24px;
    font-weight: 600;
  }
`;

const Button = styled(Link)`
  font-size: 16px;
  font-weight: 600;
`;
