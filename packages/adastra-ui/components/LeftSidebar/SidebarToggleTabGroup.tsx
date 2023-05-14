import type { Component, JSX } from "solid-js";
import { For, createSignal } from "solid-js";
import { kebabCaseToTitleCase } from "../../util";

type SidebarToggleTabGroupProps = {
  defaultTab: string;
  tabs: string[];
  class?: string;
};

const SidebarToggleTabGroup: Component<SidebarToggleTabGroupProps> = (
  props
) => {
  const [activeTab, setActiveTab] = createSignal<string>(props.defaultTab);

  return (
    <div
      class={`flex border-b-4 border-solid border-neutral/10 dark:border-dark-neutral/10 ${props.class}`}
    >
      <For each={props.tabs}>
        {(tab) => {
          const checked = () => tab === activeTab();

          const handleChange: JSX.EventHandler<
            HTMLInputElement,
            Event
          > = () => {
            if (checked()) return;

            document
              .querySelectorAll("li.nav-group")
              .forEach((element) => element.classList.remove("!block"));
            document
              .querySelectorAll(`li.nav-group.${tab}`)
              .forEach((element) => element.classList.add("!block"));
            setActiveTab(tab);
          };

          return (
            <label
              class={`flex-1 text-center whitespace-nowrap border-radius rounded-none cursor-pointer py-2.5 px-4 text-text/80 dark:text-dark-text/80 border-b-4 border-solid border-b-transparent ${
                checked()
                  ? "!border-b-primary dark:!border-b-dark-primary !text-text dark:!text-dark-text font-bold"
                  : ""
              } -mb-1 bg-transparent no-underline`}
            >
              {kebabCaseToTitleCase(tab)}
              <input
                class="absolute opacity-0 top-0 right-0 left-0 bottom-0 -z-[1] "
                type="radio"
                name="tab"
                checked={checked()}
                onChange={handleChange}
              ></input>
            </label>
          );
        }}
      </For>
    </div>
  );
};

export default SidebarToggleTabGroup;
