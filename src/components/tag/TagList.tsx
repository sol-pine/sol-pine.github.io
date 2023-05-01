import styled from "@emotion/styled";
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";
import PostItem from "../../common/PostItem";
import { Data } from "../index/List";

type Props = {
  tag: string;
};

export default function TagList({ tag }: Props) {
  const data = useStaticQuery<Data>(graphql`
    query postsQuery {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
              date(formatString: "YYYY년 MM월 DD일")
              emoji
              title
              summary
              tags
            }
          }
        }
      }
    }
  `);

  const postList = useMemo(
    () =>
      data?.allMarkdownRemark.edges.filter(el =>
        el.node.frontmatter.tags.includes(tag),
      ),
    [data],
  );

  return (
    <Base>
      <Link className="link" to={"/"}>
        ← 모든 글
      </Link>
      <div className="title">
        #{tag} ({postList.length})
      </div>
      {postList.length ? (
        <>
          {postList.map(
            ({
              node: {
                fields: { slug },
                frontmatter: { title, summary, date },
              },
            }) => (
              <PostItem
                key={title}
                title={title}
                summary={summary}
                date={date}
                link={slug}
              />
            ),
          )}
        </>
      ) : (
        <p> {tag} 에 해당하는 글이 없습니다.</p>
      )}
    </Base>
  );
}

const Base = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 800px;
  margin-top: 80px;
  .link {
    font-size: 14px;
  }
  .title {
    font-size: 30px;
    font-weight: 600;
    margin-top: 20px;
    @media (max-width: 500px) {
      font-size: 24px;
    }
  }
  > p {
    margin-top: 30px;
  }
`;
