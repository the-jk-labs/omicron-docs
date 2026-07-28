<script lang="ts">
  import { Accordion } from "bits-ui";
  import type { NavSection } from "@/lib/nav";
  import { hrefFor } from "@/lib/nav";

  type Props = {
    sections: NavSection[];
    currentSlug: string;
    /** Called after a link is activated — lets the mobile sheet close itself. */
    onnavigate?: () => void;
  };

  let { sections, currentSlug, onnavigate }: Props = $props();

  // Every section starts expanded; the accordion only exists so long sections
  // can be collapsed by the reader, not to hide content by default.
  let open = $state(sections.map((s) => s.label));
</script>

<Accordion.Root type="multiple" bind:value={open} class="w-full">
  {#each sections as section (section.label)}
    <Accordion.Item value={section.label} class="border-b border-dark-10 px-1 py-1">
      <Accordion.Header>
        <Accordion.Trigger
          class="flex w-full flex-1 select-none items-center justify-between rounded-card px-3 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-foreground-alt transition-all hover:bg-muted [&[data-state=open]>svg]:rotate-180"
        >
          {section.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4 shrink-0 text-dark-40 transition-transform duration-200"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content
        class="overflow-hidden text-sm data-[state=closed]:animate-none data-[state=open]:animate-none"
      >
        <ul class="mb-2 ml-3 border-l border-dark-10 pl-2">
          {#each section.items as item (item.slug)}
            {@const active = item.slug === currentSlug}
            <li>
              <a
                href={hrefFor(item.slug)}
                onclick={() => onnavigate?.()}
                aria-current={active ? "page" : undefined}
                class="-ml-[9px] flex items-center rounded-button border-l-2 py-1.5 pl-4 pr-3 text-[13.5px] transition-colors
                  {active
                  ? 'border-foreground font-medium text-foreground'
                  : 'border-transparent text-muted-foreground hover:border-dark-40 hover:text-foreground'}"
              >
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
