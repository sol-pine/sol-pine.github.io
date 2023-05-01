import styled from "@emotion/styled";
import { Link } from "gatsby";
import React from "react";

type Props = {
  title: string;
  summary: string;
  date: string;
  link: string;
};

export default function PostItem({ title, summary, date, link }: Props) {
  return (
    <Base to={link}>
      <p>{title}</p>
      <p>
        {date} - {summary}
      </p>
    </Base>
  );
}

const Base = styled(Link)`
  width: 100%;
  margin-top: 30px;
  > p:first-child {
    font-size: 24px;
    font-weight: 600;
    @media (max-width: 500px) {
      font-size: 20px;
    }
  }
  > p:last-child {
    font-size: 14px;
    font-weight: 400;
    @media (max-width: 500px) {
      font-size: 12px;
    }
  }
`;
