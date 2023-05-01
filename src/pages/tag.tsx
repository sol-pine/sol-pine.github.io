import React from "react";
import Layout from "../components/Layout";
import TagList from "../components/tag/TagList";
import { parse } from "query-string";

export default function Tag() {
  const parsed = typeof window !== "undefined" ? parse(location.search) : {};

  return (
    <Layout>
      <TagList tag={parsed?.tag} />
    </Layout>
  );
}
