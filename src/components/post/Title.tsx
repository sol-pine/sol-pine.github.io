import styled from "@emotion/styled";
import { Link } from "gatsby";
import React, { useMemo } from "react";

type Props = {
  emoji: string;
  date: string;
  title: string;
  summary: string;
  tags: string[];
};

export default function Title({ emoji, date, title, summary, tags }: Props) {
  const sortedTags = useMemo(() => tags.sort(), []);

  return (
    <Base>
      <div className="emoji">{emoji}</div>
      <div className="sm">{date}</div>
      <div className="title">{title}</div>
      <div className="sm">{summary}</div>
      <section>
        {sortedTags.map(tag => (
          <Link className="tag" key={tag} to={`/tag/?tag=${tag}`}>
            #{tag}
          </Link>
        ))}
      </section>
    </Base>
  );
}

const Base = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  .emoji {
    font-size: 60px;
    @media (max-width: 500px) {
      font-size: 50px;
    }
  }
  .sm {
    font-size: 14px;
    font-weight: 400;
    margin-top: 10px;
  }
  .title {
    font-size: 30px;
    font-weight: 600;
    margin-top: 10px;
    @media (max-width: 500px) {
      font-size: 24px;
    }
  }
  section {
    display: flex;
    gap: 10px;
  }
  .tag {
    font-size: 14px;
    margin-top: 10px;
    text-decoration: underline;
  }
`;
