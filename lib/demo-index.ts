import 'server-only';

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

export type ImplementedDemo = {
  title: string;
  href: string;
  label: string;
  image: string;
  description: string;
  stack: string;
  status: string;
  docsStatus: string;
};

const DEMOS_DIR = path.join(process.cwd(), 'app', 'demos');
const DEMO_DOCS_DIR = path.join(process.cwd(), 'docs', 'demos');
const FIELD_SUPPLY_IMAGE = '/assets/field-supply/hero-composition.svg';

function readIfExists(filePath: string) {
  if (!existsSync(filePath)) {
    return '';
  }

  return readFileSync(filePath, 'utf8');
}

function readMetadataString(source: string, key: 'title' | 'description') {
  const match = source.match(new RegExp(`${key}:\\s*(['"\`])([\\s\\S]*?)\\1`));
  return match?.[2]?.replace(/\s+/g, ' ').trim();
}

function formatSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getDemoLabel(slug: string, source: string, docs: string) {
  const searchable = `${slug} ${source} ${docs}`.toLowerCase();

  if (searchable.includes('ochi') || searchable.includes('magnetic')) {
    return 'Magnetic interactions';
  }

  if (searchable.includes('stripe') || searchable.includes('wave')) {
    return 'Hero background wave';
  }

  if (searchable.includes('joinclyde') || searchable.includes('background field')) {
    return 'Background field';
  }

  return 'Clean-room demo';
}

function getDemoStack(source: string, docs: string) {
  const searchable = `${source} ${docs}`.toLowerCase();
  const stack = ['Next.js', 'Tailwind'];

  if (searchable.includes('framer motion')) {
    stack.push('Framer Motion');
  }

  if (searchable.includes('canvas 2d') || searchable.includes('<canvas')) {
    stack.push('Canvas 2D');
  }

  if (
    searchable.includes('magnetic') ||
    searchable.includes('pointer-following') ||
    searchable.includes('pointer-aware')
  ) {
    stack.push('Pointer motion');
  }

  return Array.from(new Set(stack)).join(', ');
}

export function getImplementedDemos(): ImplementedDemo[] {
  if (!existsSync(DEMOS_DIR)) {
    return [];
  }

  return readdirSync(DEMOS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => existsSync(path.join(DEMOS_DIR, slug, 'page.tsx')))
    .sort((left, right) => left.localeCompare(right))
    .map((slug) => {
      const pageSource = readIfExists(path.join(DEMOS_DIR, slug, 'page.tsx'));
      const cleanRoomNotes = readIfExists(path.join(DEMO_DOCS_DIR, slug, 'clean-room-notes.md'));
      const designDoc = readIfExists(path.join(DEMO_DOCS_DIR, slug, 'DESIGN.md'));
      const docsText = `${cleanRoomNotes}\n${designDoc}`;
      const hasDocs = Boolean(cleanRoomNotes && designDoc);

      return {
        title: readMetadataString(pageSource, 'title') ?? formatSlug(slug),
        href: `/demos/${slug}`,
        label: getDemoLabel(slug, pageSource, docsText),
        image: FIELD_SUPPLY_IMAGE,
        description:
          readMetadataString(pageSource, 'description') ??
          `Clean-room implementation documented under docs/demos/${slug}.`,
        stack: getDemoStack(pageSource, docsText),
        status: 'Operational',
        docsStatus: hasDocs ? 'Docs complete' : 'Docs pending',
      };
    });
}
