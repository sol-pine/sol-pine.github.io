import React from "react";
import Layout from "../components/Layout";
import { parse } from "query-string";
import TagList from "../components/tag/TagList";

export default function Tag() {
  const { tag } = parse(location.search);
  console.log(tag);
  return (
    <Layout>
      <TagList tag={tag} />
    </Layout>
  );
}
