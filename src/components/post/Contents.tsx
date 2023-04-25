import styled from "@emotion/styled";
import React from "react";

type Props = {
  html: string;
};

export default function Contents({ html }: Props) {
  return (
    <Base>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
    </Base>
  );
}

const Base = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  margin-top: 50px;
  font-size: 16px;
  font-weight: 400;

  p {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 24px;
    word-wrap: break-word;
    word-break: all;
    line-height: 1.8;
  }

  strong {
    font-weight: 700;
  }

  h1 {
    font-size: 25px;
    font-weight: 600;
    margin: 30px 0;
    @media (max-width: 500px) {
      font-size: 20px;
    }
  }

  h4 {
    font-size: 20px;
    font-weight: 600;
    margin: 28px 0;
    @media (max-width: 500px) {
      font-size: 18px;
    }
  }

  p a {
    text-decoration: underline;
    text-underline-position: under;
  }

  p > code,
  li > code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    padding: 2px 8px;
    border-radius: 8px;
    font-size: 14px;
    background: #dfe2e5;
    word-wrap: break-word;
    word-break: all;
  }

  blockquote {
    border-left: 5px solid #dfe2e5;
    margin: 20px 0;
    padding-left: 10px;
  }

  blockquote > p {
    color: #6a737d;
    font-weight: 600;
  }

  ol,
  ul {
    padding-left: 25px;
  }

  li > p,
  ol {
    line-height: 1.8;
    margin: 8px 0;
  }

  li {
    margin: 8px 0;
    line-height: 1.8;
  }

  li > a {
    line-height: 1.8;
    margin: 8px 0;
    text-decoration: underline;
    text-underline-position: under;
  }

  pre {
    width: 100%;
    margin: 20px auto;
    .grvsc-line {
      background: #000c18;
    }
    & .grvsc-source > span {
      font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
      width: 100%;
      word-wrap: break-word;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      font-size: 16px;
      @media (max-width: 500px) {
        font-size: 14px;
      }
    }
  }

  img {
    width: 100%;
    margin: 10px 0;
  }
`;
