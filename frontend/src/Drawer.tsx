import {
  children,
  createEffect,
  createResource,
  createSignal,
  on,
  Show,
} from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import style from "./Drawer.module.css";
import { A, useLocation } from "@solidjs/router";

const fetchDocs = () => {
  return fetch("/docs/README.md").then((r) => r.text());
};

const requestMethods = ["GET", "POST", "DELETE", "PATCH", "PUT"];

export const [drawerState, setDrawerState] = createSignal<"OPENED" | "CLOSED">(
  "OPENED",
);

export const openDrawer = () => setDrawerState("OPENED");

// https://www.css-gradient.com/
const DrawerMetadata = {
  Endpoints: {
    icon: "api",
    iconBackground: "linear-gradient(315deg, #9765DC, #2CB3C3)",
  },
  Websocket: {
    icon: "sync_alt",
    iconBackground: "linear-gradient(315deg, #447E5B, #165811)",
  },
  Types: {
    icon: "data_object",
    iconBackground: "linear-gradient(315deg, #1C59EA, #CA64F1)",
  },
  Other: {
    icon: "more_horiz",
    iconBackground: "linear-gradient(315deg, #D8BC19, #D72C57)",
  },
};
const SubTitleMetadata = {
  Channels: {
    icon: "chat_bubble",
  },
  Servers: {
    icon: "dns",
  },
  Commands: {
    icon: "terminal",
  },
  Roles: {
    icon: "shield",
  },
  CDN: {
    icon: "cloud",
  },
  Webhooks: {
    icon: "webhook",
  },
  OAuth2: {
    icon: "lock",
  },
  Voice: {
    icon: "volume_up",
  },
  Sending: {
    icon: "send",
  },
  Receiving: {
    icon: "download",
  },
};

const getMetadata = (title: string) => {
  return DrawerMetadata[title as keyof typeof DrawerMetadata];
};

const getSubTitleMetadata = (title: string) => {
  return SubTitleMetadata[title as keyof typeof SubTitleMetadata];
};

export const Drawer = () => {
  const [docs] = createResource(fetchDocs);

  const location = useLocation();

  // const onCategoryClick = (clickedCategory: string) => {
  //   const test = document.querySelector(
  //     `.${style.drawer} .category.${clickedCategory}`
  //   );
  //   test?.classList.toggle("show");
  // };

  createEffect(
    on(docs, () => {
      const lis = document.querySelectorAll(`.${style.drawer} li`);
      let mainCategory = "";

      lis.forEach((li) => {
        if (li.firstChild?.nodeName === "H3") {
          mainCategory = li.firstChild.textContent!;
          li.classList.add("category", mainCategory, "show");

          // if (li.querySelector("[data-selected='true']")) {
          //   onCategoryClick(mainCategory);
          // }

          return;
        }
      });
    }),
  );

  return (
    <>
      <Show when={drawerState() === "OPENED"}>
        <div
          class={style.backdrop}
          onClick={() => setDrawerState("CLOSED")}
        ></div>
      </Show>
      <div class={`${style.drawer} scroll`} data-state={drawerState()}>
        <Show when={!docs.loading}>
          <SolidMarkdown
            children={docs()!}
            components={{
              p: (p) => {
                const child = children(p.children as any);
                const text = child.toArray()[0] as string;
                if (text === "ROOT") {
                  return null;
                }
                return (
                  <p>
                    <Show when={getSubTitleMetadata(text)?.icon}>
                      {(icon) => (
                        <span class={`material-symbols-rounded ${style.icon}`}>
                          {icon()}
                        </span>
                      )}
                    </Show>
                    {text}
                  </p>
                );
              },
              h3: (h3) => {
                const child = children(h3.children as any);
                const name = child.toArray()[0] as string;
                return (
                  <h3
                  // onClick={() => onCategoryClick(name)}
                  >
                    <Show when={getMetadata(name)?.icon}>
                      {(icon) => (
                        <span
                          style={{
                            background: getMetadata(name).iconBackground,
                          }}
                          class={`material-symbols-rounded ${style.icon}`}
                        >
                          {icon()}
                        </span>
                      )}
                    </Show>
                    {name}
                  </h3>
                );
              },
              a: (a) => {
                const child = children(a.children as any);
                const text = child.toArray()[0] as string;
                const requestMethod = requestMethods.find((m) =>
                  text.includes(`[${m}]`),
                );
                return (
                  <A
                    href={a.href!.slice(0, -3)}
                    data-selected={location.pathname + ".md" === a.href!}
                    onClick={() => setDrawerState("CLOSED")}
                  >
                    <span>
                      {requestMethod
                        ? text.slice(0, text.indexOf(requestMethod) - 1)
                        : text}
                    </span>
                    {requestMethod ? (
                      <span
                        style={{
                          background: `var(--${requestMethod.toLowerCase()})`,
                        }}
                        class={style.method}
                      >
                        {requestMethod}
                      </span>
                    ) : (
                      ""
                    )}
                  </A>
                );
              },
            }}
          />
        </Show>
      </div>
    </>
  );
};
