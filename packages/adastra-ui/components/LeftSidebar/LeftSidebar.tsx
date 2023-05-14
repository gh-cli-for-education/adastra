import type { JSX, ParentComponent } from "solid-js";
import { For } from "solid-js";
import { NavegationTab, kebabCaseToTitleCase } from "../../util";
import NavegationTabContent from "./NavegationTabContent";

type LeftSidebarProps = {
  navigation: NavegationTab[];
  currentPage: string;
  themeToggle?: JSX.Element;
  tabToggle?: JSX.Element;
};

const LeftSidebar: ParentComponent<LeftSidebarProps> = (props) => {
  return (
    <nav class="w-full h-full text-sm">
      {props.tabToggle}
      <ul class="pt-4 max-h-full overflow-x-visible overflow-y-auto md:fixed md:top-[calc(theme(spacing.navbar-height)+3em)]  md:bottom-0 md:w-[calc(theme(spacing.sidebar-width)-1.5rem*1.6)]">
        <For each={props.navigation}>
          {(tab, index) => (
            <NavegationTabContent
              type={tab.type}
              active={
                tab.type ===
                kebabCaseToTitleCase(props.currentPage.split("/")[1])
              }
              currentPage={props.currentPage}
              sections={tab.sections}
            />
          )}
        </For>
        <li class="text-center">{props.themeToggle}</li>
        <li class="text-center">{props.children}</li>
      </ul>
    </nav>
  );
};

export default LeftSidebar;
