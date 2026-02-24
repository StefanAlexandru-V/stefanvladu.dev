# AGENTS.md

Guidelines for AI agents working in this repository.

## Project Overview

Personal portfolio/resume website for Ștefan-Alexandru Vladu. Static site built with [Eleventy (11ty)](https://www.11ty.dev/) v3 and [Decap CMS](https://decapcms.org/) for content management.

## Tech Stack

- **Static Site Generator**: Eleventy 3.1.2
- **Templating**: Nunjucks (.njk)
- **CMS**: Decap CMS (GitHub OAuth backend)
- **Hosting**: GitHub Pages with custom domain
- **CI/CD**: GitHub Actions

## Project Structure

```
stefanvladu.dev/
├── index.njk               # Main page template
├── eleventy.config.js      # Eleventy configuration (ES module)
├── package.json            # Node.js config (type: module)
├── CNAME                   # Custom domain for GitHub Pages
├── _data/
│   └── site.json           # All editable content (CMS-managed)
├── _includes/
│   └── layout.njk          # Base HTML layout with all CSS
├── admin/
│   ├── index.html          # Decap CMS entry point
│   └── config.yml          # CMS collections and fields
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deploy workflow
└── _site/                  # Build output (generated, gitignored)
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with live reload (http://localhost:8080) |
| `npm run build` | Build site to `_site/` |
| `npm install` | Install dependencies |

## Data Structure

All editable content lives in `_data/site.json`:

```json
{
  "site": { "title", "name": { "first", "last" }, "intro" },
  "jobs": [{ "dateStart", "dateEnd", "role", "company" }],
  "wins": [{ "highlight", "description" }],
  "skills": [{ "name", "category" }],
  "contact": [{ "label", "value", "url", "external" }]
}
```

Access in templates via `site.*` (e.g., `site.jobs`, `site.site.title`).

## Templating Patterns

- **Data access**: `{{ site.site.title }}`, `{% for job in site.jobs %}`
- **Safe HTML**: `{{ site.site.intro | safe }}` (intro contains `<strong>` tags)
- **Conditional classes**: `{% if skill.category %} {{ skill.category }}{% endif %}`
- **Conditional attributes**: `{% if link.external %} target="_blank"{% endif %}`

## CSS Architecture

All styles are inline in `_includes/layout.njk`:

- CSS custom properties in `:root`
- Color palette: warm neutrals, red accent (`--accent`), blue (`--blue`)
- Font variables: `--mono`, `--serif`, `--sans`
- Skill tag categories: `.tag.hi` (red/primary), `.tag.lo` (blue/infra)

## Decap CMS

- **Admin URL**: `/admin`
- **Backend**: GitHub OAuth
- **Config**: `admin/config.yml`

Collections defined for: jobs, wins, skills, contact. All managed in single file (`_data/site.json`).

**Note**: CMS requires GitHub OAuth setup. For local editing, modify `_data/site.json` directly.

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Triggers on push to `main`
2. Runs `npm ci && npm run build`
3. Deploys `_site/` to GitHub Pages

Custom domain: `stefanvladu.dev` (via CNAME file)

## Gotchas

1. **Reserved word**: `content` is reserved in Eleventy 3 - data file is named `site.json`, not `content.json`

2. **ES modules**: `package.json` has `"type": "module"` - use ES import/export in config

3. **Double nesting**: Site info accessed via `site.site.title` (file name + object key)

4. **`_site/` is generated**: Never edit directly - changes will be overwritten

5. **CMS auth**: Decap CMS requires OAuth app setup on GitHub for production use

6. **CNAME passthrough**: `eleventy.config.js` copies CNAME to output for GitHub Pages

<!-- gitnexus:start -->
# GitNexus MCP

This project is indexed by GitNexus as **stefanvladu.dev** (12 symbols, 4 relationships, 0 execution flows).

GitNexus provides a knowledge graph over this codebase — call chains, blast radius, execution flows, and semantic search.

## Always Start Here

For any task involving code understanding, debugging, impact analysis, or refactoring, you must:

1. **Read `gitnexus://repo/{name}/context`** — codebase overview + check index freshness
2. **Match your task to a skill below** and **read that skill file**
3. **Follow the skill's workflow and checklist**

> If step 1 warns the index is stale, run `npx gitnexus analyze` in the terminal first.

## Skills

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/refactoring/SKILL.md` |

## Tools Reference

| Tool | What it gives you |
|------|-------------------|
| `query` | Process-grouped code intelligence — execution flows related to a concept |
| `context` | 360-degree symbol view — categorized refs, processes it participates in |
| `impact` | Symbol blast radius — what breaks at depth 1/2/3 with confidence |
| `detect_changes` | Git-diff impact — what do your current changes affect |
| `rename` | Multi-file coordinated rename with confidence-tagged edits |
| `cypher` | Raw graph queries (read `gitnexus://repo/{name}/schema` first) |
| `list_repos` | Discover indexed repos |

## Resources Reference

Lightweight reads (~100-500 tokens) for navigation:

| Resource | Content |
|----------|---------|
| `gitnexus://repo/{name}/context` | Stats, staleness check |
| `gitnexus://repo/{name}/clusters` | All functional areas with cohesion scores |
| `gitnexus://repo/{name}/cluster/{clusterName}` | Area members |
| `gitnexus://repo/{name}/processes` | All execution flows |
| `gitnexus://repo/{name}/process/{processName}` | Step-by-step trace |
| `gitnexus://repo/{name}/schema` | Graph schema for Cypher |

## Graph Schema

**Nodes:** File, Function, Class, Interface, Method, Community, Process
**Edges (via CodeRelation.type):** CALLS, IMPORTS, EXTENDS, IMPLEMENTS, DEFINES, MEMBER_OF, STEP_IN_PROCESS

```cypher
MATCH (caller)-[:CodeRelation {type: 'CALLS'}]->(f:Function {name: "myFunc"})
RETURN caller.name, caller.filePath
```

<!-- gitnexus:end -->
