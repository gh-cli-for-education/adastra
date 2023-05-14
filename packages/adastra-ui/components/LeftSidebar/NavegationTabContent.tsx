import { Component, For } from "solid-js";
import { Section } from "../../util";

type NavegationTabContentProps = {
  type: string;
  active: boolean;
  sections: Section[];
  currentPage: string;
  pathname: string;
};

const NavegationTabContent: Component<NavegationTabContentProps> = (props) => {
  return (
    <For each={props.sections}>
      {(section) => (
        <li
          class={`mb-4 md:hidden md:mb-7 nav-group ${props.type} ${
            props.active && "!block"
          }`}
        >
          <details class="group" open>
            <summary class="text-base font-semibold py-1.5 px-8 md:py-1 md:px-4 list-none marker:hidden cursor-pointer">
              <h2 class="m-0 p-0 text-base sm:text-sm">
                {section.name}
                <svg
                  class="rotate-0 transition-transform align-middle group-open:rotate-90 rtl:rotate-180 m-0 inline"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 1 16 16"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    class="fill-current"
                    fill-rule="evenodd"
                    d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
                  />
                </svg>
              </h2>
            </summary>
            <ul>
              <For each={section.entries}>
                {(entries) => (
                  <li>
                    <a
                      class="m-0.5 py-1.5 px-8 md:py-1 md:px-4 text-text/80 dark:text-dark-text/80 no-underline block hover:bg-secondary/10 focus:bg-secondary/10 dark:hover:bg-secondary/20 dark:focus:bg-secondary/20 focus:outline focus:outline-2 aria-[current=page]:text-text dark:aria-[current=page]:text-dark-text aria-[current=page]:bg-secundary/20 aria-[current=page]:bg-dark-secundary/40 aria-[current=page]:font-medium aria-[current=page]:outline-1 aria-[current=page]:outline aria-[current=page]:outline-transparent aria-[current=page]:focus:outline-2 aria-[current=page]:focus:outline"
                      href={`${props.pathname}${entries.slug}/`}
                      aria-current={`${
                        props.currentPage.endsWith(entries.slug)
                          ? "page"
                          : "false"
                      }`}
                    >
                      {entries.text}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </details>
        </li>
      )}
    </For>
  );
};

export default NavegationTabContent;
