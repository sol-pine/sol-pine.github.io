import styled from "@emotion/styled";
import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";

type Data = {
  site: {
    siteMetadata: {
      title: string;
      author: string;
      github: string;
    };
  };
};

export default function Footer() {
  const data = useStaticQuery<Data>(graphql`
    query metadataQuery {
      site {
        siteMetadata {
          title
          author
          github
        }
      }
    }
  `);

  const { title, author, github } = useMemo(
    () => ({
      title: data?.site.siteMetadata.title,
      author: data?.site.siteMetadata.author,
      github: data?.site.siteMetadata.github,
    }),
    [data],
  );
  return (
    <Base>
      <section>
        {title}ⓒ<a href={github}>{author}</a>, {new Date().getFullYear()}
      </section>
      <section>Powered By gatsby with gh-pages</section>
    </Base>
  );
}

const Base = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 150px;
  position: relative;
  transform: translateY(-100%);
  section {
    font-size: 12px;
  }
  a {
    text-decoration: underline;
  }
`;
