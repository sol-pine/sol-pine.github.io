import React from "react";
import Intro from "../components/index/Intro";
import List from "../components/index/List";
import Layout from "../components/Layout";

export default function index() {
  return (
    <Layout>
      <Intro />
      <List />
    </Layout>
  );
}
