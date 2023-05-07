import type { Component, ParentProps } from "solid-js";
import { For } from "solid-js";
import { NavegationTab } from "../../util";
import NavegationTabContent from "./NavegationTabContent";

type LeftSidebarProps = {
  navigation: NavegationTab[];
  currentPage: string;
  pathname: string;
};

const LeftSidebar: Component<LeftSidebarProps> = (props) => {
  return (
    <nav class="w-full h-full text-sm">
      <ul class="pt-4 max-h-full overflow-x-visible overflow-y-auto md:fixed md:top-[calc(var(--theme-navbar-height)+3em)] md:bottom-0 md:w-[calc(var(--theme-left-sidebar-width)-var(--min-spacing-inline)*1.6)]">
        <For each={props.navigation}>
          {(tab, index) => (
            <NavegationTabContent
              type={tab.type}
              active={index() === 0}
              currentPage={props.currentPage}
              pathname={props.pathname}
              sections={tab.sections}
            />
          )}
        </For>
        <li class="text-center">
          <slot name="theme-toggle" />
        </li>
        <li class="text-center">
          <slot />
        </li>
      </ul>
    </nav>
  );
};

export default LeftSidebar;
