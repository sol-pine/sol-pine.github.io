import styled from "@emotion/styled";
import { graphql } from "gatsby";
import React, { useMemo } from "react";
import { IFrontmatter } from "../components/index/List";
import Layout from "../components/Layout";
import Contents from "../components/post/Contents";
import PostFooter from "../components/post/PostFooter";
import Title from "../components/post/Title";

export type Fields = { slug: string };

type Data = {
  data: {
    currentPost: {
      edges: {
        node: {
          fields: Fields;
          html: string;
          frontmatter: IFrontmatter;
        };
      }[];
    };
    postList: { edges: { node: { fields: Fields } }[] };
  };
};

export default function PostTemplate({
  data: {
    currentPost: { edges },
    postList: { edges: listEdges },
  },
}: Data) {
  const { emoji, date, title, summary, tags, html, currentSlug } = useMemo(
    () => ({
      emoji: edges[0]?.node.frontmatter.emoji,
      date: edges[0]?.node.frontmatter.date,
      title: edges[0]?.node.frontmatter.title,
      summary: edges[0]?.node.frontmatter.summary,
      tags: edges[0]?.node.frontmatter.tags,
      html: edges[0]?.node.html,
      currentSlug: edges[0]?.node.fields.slug,
    }),
    [edges],
  );

  const slugs = useMemo(() => listEdges, [listEdges]);

  return (
    <Layout>
      <Wrapper>
        <Title
          emoji={emoji}
          date={date}
          title={title}
          summary={summary}
          tags={tags}
        />
        <Contents html={html} />
        <PostFooter currentSlug={currentSlug} slugs={slugs} />
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    currentPost: allMarkdownRemark(
      filter: { fields: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          html
          frontmatter {
            date(formatString: "YYYY년 MM월 DD일")
            emoji
            title
            summary
            tags
          }
        }
      }
    }
    postList: allMarkdownRemark(sort: { frontmatter: { date: ASC } }) {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`;
