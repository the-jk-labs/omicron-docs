// SPDX-License-Identifier: AGPL-3.0-or-later
// The documentation's table of contents. This is the single source of truth for
// the sidebar, the mobile nav, and the previous/next pager — add a page here and
// everywhere that lists pages picks it up.

export type NavItem = {
  /** Slug of the entry in the `docs` content collection (no leading slash). */
  slug: string;
  label: string;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const nav: NavSection[] = [
  {
    label: "Getting started",
    items: [
      { slug: "introduction", label: "Introduction" },
      { slug: "quick-start", label: "Quick start" },
      { slug: "concepts", label: "Core concepts" },
    ],
  },
  {
    label: "Self-hosting",
    items: [
      { slug: "self-hosting/requirements", label: "Requirements" },
      { slug: "self-hosting/installation", label: "Installation" },
      { slug: "self-hosting/domain-and-https", label: "Domain and HTTPS" },
      { slug: "self-hosting/setup-wizard", label: "Setup wizard" },
      { slug: "self-hosting/email", label: "Email" },
      { slug: "self-hosting/federation", label: "Enabling federation" },
      { slug: "self-hosting/admin-panel", label: "Admin panel" },
      { slug: "self-hosting/configuration", label: "Configuration" },
      { slug: "self-hosting/podman", label: "Running on Podman" },
      { slug: "self-hosting/upgrading", label: "Upgrading" },
      { slug: "self-hosting/backups", label: "Backups and restore" },
      { slug: "self-hosting/troubleshooting", label: "Troubleshooting" },
      { slug: "self-hosting/security", label: "Security" },
    ],
  },
  {
    label: "Using Omicron",
    items: [
      { slug: "using/writing", label: "Writing posts" },
      { slug: "using/profiles", label: "Profiles" },
      { slug: "using/reading", label: "Reading and following" },
      { slug: "using/lists", label: "Lists and read later" },
      { slug: "using/moderation", label: "Moderation tools" },
      { slug: "using/analytics", label: "Writer dashboard" },
    ],
  },
  {
    label: "Federation",
    items: [
      { slug: "federation/overview", label: "How federation works" },
      { slug: "federation/endpoints", label: "ActivityPub endpoints" },
      { slug: "federation/delivery", label: "Delivery and queues" },
      { slug: "federation/compatibility", label: "Compatibility" },
    ],
  },
  {
    label: "Development",
    items: [
      { slug: "development/architecture", label: "Architecture" },
      { slug: "development/local-setup", label: "Local setup" },
      { slug: "development/backend", label: "Backend guide" },
      { slug: "development/frontend", label: "Frontend guide" },
      { slug: "development/database", label: "Database and migrations" },
      { slug: "development/contributing", label: "Contributing" },
    ],
  },
  {
    label: "Reference",
    items: [
      { slug: "reference/environment", label: "Environment variables" },
      { slug: "reference/http-api", label: "HTTP API" },
      { slug: "reference/admin-api", label: "Admin API" },
      { slug: "reference/rate-limits", label: "Rate limits" },
      { slug: "reference/license", label: "License and AGPL" },
    ],
  },
];

/** Flat, in-order list of every page — used for the prev/next pager. */
export const flatNav: NavItem[] = nav.flatMap((section) => section.items);

export function pagerFor(slug: string): { prev?: NavItem; next?: NavItem } {
  const i = flatNav.findIndex((item) => item.slug === slug);
  if (i === -1) return {};
  return { prev: flatNav[i - 1], next: flatNav[i + 1] };
}

/** Absolute path for a docs slug. */
export const hrefFor = (slug: string) => `/docs/${slug}/`;
