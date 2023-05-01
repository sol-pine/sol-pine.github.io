import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo, useState } from "react";
import { CATEGORY } from "../../constants";
import PostItem from "../../common/PostItem";

export interface IFrontmatter {
  category: string;
  emoji: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  html: string;
}

export type Data = {
  allMarkdownRemark: {
    edges: {
      node: {
        fields: { slug: string };
        frontmatter: IFrontmatter;
      };
    }[];
  };
};

export default function List() {
  const [selectedItem, setSelectedItem] = useState("all");
  const selectCategory = e => setSelectedItem(e.target.value);
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
      selectedItem === "all"
        ? data?.allMarkdownRemark.edges
        : data?.allMarkdownRemark.edges.filter(
            el => el.node.frontmatter.category === selectedItem,
          ),
    [data, selectedItem],
  );

  return (
    <Base>
      <Category>
        {CATEGORY.map(item => (
          <button
            key={item}
            value={item}
            onClick={e => selectCategory(e)}
            className={selectedItem === item ? "selected" : ""}
          >
            {item}
          </button>
        ))}
      </Category>
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
        <p> {selectedItem} 에 해당하는 글이 없습니다.</p>
      )}
    </Base>
  );
}

const Base = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 500px;
  margin-top: 80px;
  > p {
    margin-top: 30px;
  }
`;

const Category = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  button {
    font-size: 18px;
    font-weight: 400;
    &.selected {
      font-weight: 600;
      text-decoration: underline;
      text-underline-position: under;
    }
  }
`;
