import style from "./ContentPane.module.css";
import { useLocation } from "@solidjs/router";
import { createEffect, createResource, createSignal, Show } from "solid-js";
import markdownit from "markdown-it";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";
import MarkdownItReplaceLink from "markdown-it-replace-link";
import MarkdownItAnchor from "markdown-it-anchor";

import MarkdownItHighlight from "markdown-it-highlightjs/core";
import hljs from "highlight.js/lib/core";

import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";

import "markdown-it-github-alerts/styles/github-colors-dark-media.css";
import "markdown-it-github-alerts/styles/github-base.css";
import { useTheme } from "./theme";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("typescript", typescript);

const md = markdownit();
md.use(MarkdownItGitHubAlerts);
md.use(MarkdownItReplaceLink, {
  replaceLink: (href, title, text) => {
    return href.replace(/\.md(?=($|[#?]))/, "");
  },
});

md.use(MarkdownItGitHubAlerts);
md.use(MarkdownItReplaceLink, {
  replaceLink: (href, title, text) => {
    return href.replace(/\.md(?=($|[#?]))/, "");
  },
});
md.use(MarkdownItAnchor, {
  slugify: (s) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/ /g, "-"),
});
md.use(MarkdownItHighlight, { hljs, auto: false });

function fetchDocs(path: string) {
  if (path === "/.md") {
    return Promise.resolve(`
# Welcome to Nerimity Docs

Explore the documentation using the drawer on the left.

PS: This documentation is unfinished, and will be improved over time!

---

_Select a page from the drawer to get started!_


`);
  }

  return fetch("/docs" + path).then(async (r) => {
    if (r.status !== 200) return "## This page does not exist.";
    return r.text();
  });
}

export const ContentPane = () => {
  const location = useLocation();
  const [docs] = createResource(() => location.pathname + ".md", fetchDocs);
  const [markdown, setMarkdown] = createSignal("");

  const { theme } = useTheme();

  createEffect(async () => {
    const curTheme = theme();
    let css = "";
    if (curTheme === "dark") {
      css = (await import("highlight.js/styles/vs2015.min.css?inline")).default;
    } else {
      css = (await import("highlight.js/styles/vs.min.css?inline")).default;
    }

    const existingStyle = document.getElementById("highlight-style");
    const style = existingStyle || document.createElement("style");
    style.id = "highlight-style";
    style.innerHTML = css;
    if (!existingStyle) {
      document.head.appendChild(style);
    }
  });

  createEffect(() => {
    const _docs = docs();
    if (!_docs) return;
    const str = md.render(_docs);
    setMarkdown(str);
  });

  createEffect(() => {
    const hash = location.hash;
    if (hash && markdown()) {
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
  return (
    <div class={`${style.container} scroll`}>
      <Show when={md}>
        <div innerHTML={markdown()}></div>
      </Show>
    </div>
  );
};
