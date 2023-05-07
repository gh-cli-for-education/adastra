import { Component, createEffect, createSignal } from "solid-js";

const SidebarToggle: Component = () => {
  const [sidebarShow, setSidebarShow] = createSignal<boolean>(false);

  createEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    if (sidebarShow()) {
      body.classList.add("mobile-sidebar-toggle");
      document
        .querySelector('details a[data-current-parent="true"]')
        ?.closest("details")
        ?.setAttribute("open", "");
      return;
    }

    body.classList.remove("mobile-sidebar-toggle");
    document.querySelectorAll("aside nav details").forEach((e) => {
      e.setAttribute("open", "");
    });
  });

  return (
    <button
      class="md:hidden"
      type="button"
      aria-pressed={sidebarShow() ? "true" : "false"}
      onClick={() => setSidebarShow(!sidebarShow())}
    >
      <svg
        class="fill-none stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          class="stroke-2"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};

export default SidebarToggle;
