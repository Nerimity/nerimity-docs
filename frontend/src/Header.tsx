import { Show } from "solid-js";
import { openDrawer } from "./Drawer";
import style from "./Header.module.css";
import { useTheme } from "./theme";
import { Moon, Sun, Menu, Github } from "lucide-solid";

export const Header = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <header class={style.header}>
      <div class={style.left}>
        <button
          class={style.iconButton}
          data-open-drawer-button
          onClick={openDrawer}
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
        <a href="/" class={style.logo}>
          Nerimity Docs
        </a>
      </div>

      <div class={style.right}>
        <button
          class={style.iconButton}
          onClick={toggleTheme}
          aria-label="Toggle Night Mode"
        >
          <Show when={theme() === "dark"}>
            <Moon size={22} class="dark:hidden" />
          </Show>
          <Show when={theme() === "light"}>
            <Sun size={22} class="hidden dark:block" />
          </Show>
        </button>

        <a
          class={style.iconButton}
          href="http://github.com/nerimity/nerimity-docs"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github size={24} />
        </a>
      </div>
    </header>
  );
};
