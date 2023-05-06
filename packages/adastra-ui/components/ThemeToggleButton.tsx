import { Component, JSX, createSignal, mergeProps, onMount } from "solid-js";

export type ThemeToggleButtonProps = {
  isInsideHeader?: boolean;
};

const defaultProps = { isInsideHeader: false };

export type Theme = "light" | "dark";

const themes: Theme[] = ["light", "dark"];

const themesIcons: JSX.Element[] = [
  <svg
    class="fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path
      fill-rule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clip-rule="evenodd"
    ></path>
  </svg>,
  <svg
    class="fill-current"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
  </svg>,
];

const getDefaultTheme = (): Theme => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  )
    return "dark";

  return "light";
};

const [currentTheme, setCurrentTheme] = createSignal<Theme>("light");

const ThemeToggleButton: Component<ThemeToggleButtonProps> = (
  undefaultedProps
) => {
  const props = mergeProps(defaultProps, undefaultedProps);

  onMount(() => setCurrentTheme(getDefaultTheme()));

  return (
    <div
      class={`items-center gap-1 py-1 px-2 mt-8 rounded-full bg-[var(--theme-code-inline-bg)] outline-none md:mt-0 ${
        props.isInsideHeader ? "hidden md:inline-flex" : "inline-flex md:hidden"
      }`}
    >
      {themes.map((theme, index) => {
        const icon = themesIcons[index];
        const checked = () => theme === currentTheme();

        const handleChange: JSX.EventHandler<HTMLInputElement, Event> = () => {
          if (checked()) return;

          setCurrentTheme(theme);
          localStorage.theme = theme;
        };

        return (
          <label
            class={`${
              checked() && "!text-[color:var(--theme-accent)] !opacity-100"
            } focus-within:outline-none focus-within:shadow-[0_0_0_0.08rem_var(--theme-accent),_0_0_0_0.12rem_white] text-[color:var(--theme-code-inline-text)] relative flex items-center justify-center opacity-50 cursor-pointer`}
          >
            {icon}
            <input
              class="absolute opacity-0 top-0 right-0 left-0 bottom-0 -z-[1] peer"
              type="radio"
              name="theme-toggle"
              checked={checked()}
              onChange={handleChange}
            />
          </label>
        );
      })}
    </div>
  );
};

export default ThemeToggleButton;
