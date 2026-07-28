<script lang="ts">
  // SPDX-License-Identifier: AGPL-3.0-or-later
  import { Dialog } from "bits-ui";
  import Sidebar from "./Sidebar.svelte";
  import type { NavSection } from "@/lib/nav";

  type Props = { sections: NavSection[]; currentSlug: string };
  let { sections, currentSlug }: Props = $props();

  let open = $state(false);
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger
    aria-label="Open navigation"
    class="inline-flex size-9 items-center justify-center rounded-input border border-border-input bg-background-alt text-foreground shadow-btn transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
  >
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
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 z-50 bg-black/60 lg:hidden" />
    <Dialog.Content
      class="fixed inset-y-0 left-0 z-50 flex w-[19rem] max-w-[85vw] flex-col border-r border-border bg-background outline-none lg:hidden"
    >
      <div class="flex items-center justify-between border-b border-border px-4 py-3">
        <Dialog.Title class="text-sm font-semibold tracking-tight text-foreground">
          Documentation
        </Dialog.Title>
        <Dialog.Close
          aria-label="Close navigation"
          class="inline-flex size-8 items-center justify-center rounded-input text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </Dialog.Close>
      </div>
      <Dialog.Description class="sr-only">
        Links to every section of the Omicron documentation.
      </Dialog.Description>
      <nav class="flex-1 overflow-y-auto px-2 py-3">
        <Sidebar {sections} {currentSlug} onnavigate={() => (open = false)} />
      </nav>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
