<script lang="ts">
  // SPDX-License-Identifier: AGPL-3.0-or-later
  import { Button } from "bits-ui";

  // Mirrors the inline no-FOUC script in BaseLayout.astro: the `dark` class on
  // <html> is the switch, `omicron-docs-theme` in localStorage is the memory.
  let dark = $state(false);

  $effect(() => {
    dark = document.documentElement.classList.contains("dark");
  });

  function toggle() {
    dark = !dark;
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("omicron-docs-theme", dark ? "dark" : "light");
    } catch {
      // Private mode / storage disabled — the toggle still works for this page.
    }
  }
</script>

<Button.Root
  onclick={toggle}
  aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
  title="Toggle theme"
  class="inline-flex size-9 items-center justify-center rounded-input border border-border-input bg-background-alt text-foreground shadow-btn transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
>
  {#if dark}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-[18px]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-[18px]"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  {/if}
</Button.Root>
