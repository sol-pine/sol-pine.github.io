import styled from "@emotion/styled";
import { Link } from "gatsby";
import React, { useMemo } from "react";
import { Fields } from "../../templates/PostTemplate";

type Props = {
  currentSlug: string;
  slugs: { node: { fields: Fields } }[];
};

export default function PostFooter({ currentSlug, slugs }: Props) {
  const slugList = useMemo(
    () => slugs.map(({ node }) => node.fields.slug),
    [slugs],
  );

  const currentIndex = slugList.indexOf(currentSlug);

  return (
    <Base>
      <hr />
      <div className="sectionWrapper">
        {currentIndex === 0 ? (
          <p>이전 글이 없습니다</p>
        ) : (
          <Link to={`${slugList[currentIndex - 1]}`}>← 이전 글</Link>
        )}
        <Link to="/">글 목록으로 돌아가기</Link>
        {slugList.length !== currentIndex + 1 ? (
          <Link to={`${slugList[currentIndex + 1]}`}>다음 글 →</Link>
        ) : (
          <p>다음 글이 없습니다</p>
        )}
      </div>
    </Base>
  );
}

const Base = styled.div`
  margin-top: 60px;
  .sectionWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 50px;
    font-size: 14px;
    font-weight: 400;
  }
`;
