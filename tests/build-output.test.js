import { beforeAll, describe, it, expect } from 'vitest';
import Eleventy from '@11ty/eleventy';
import * as cheerio from 'cheerio';
import siteData from '../_data/site.json';

let $;

beforeAll(async () => {
  const elev = new Eleventy('.', '_site', { quietMode: true });
  await elev.init();
  const results = await elev.toJSON();
  const indexPage = results.find(r => r.url === '/');
  if (!indexPage) throw new Error('Index page (url "/") not found in Eleventy build output');
  $ = cheerio.load(indexPage.content);
}, 60000);

// ---------------------------------------------------------------------------
// Page structure
// ---------------------------------------------------------------------------
describe('build output — page structure', () => {
  it('renders the site title in the <title> tag', () => {
    expect($('title').text()).toContain(siteData.site.title);
  });

  it('renders the first name in the h1', () => {
    expect($('h1').text()).toContain(siteData.site.name.first);
  });

  it('renders the last name in the h1', () => {
    expect($('h1').text()).toContain(siteData.site.name.last);
  });
});

// ---------------------------------------------------------------------------
// Jobs section
// ---------------------------------------------------------------------------
describe('build output — jobs section', () => {
  it('renders the correct number of job entries', () => {
    expect($('.job').length).toBe(siteData.jobs.length);
  });

  it('renders every job role', () => {
    const renderedRoles = $('.job-role').toArray().map(el => $(el).text().trim());
    for (const job of siteData.jobs) {
      expect(renderedRoles, `role "${job.role}" should appear`).toContain(job.role);
    }
  });

  it('renders every company name', () => {
    const renderedCompanies = $('.job-co').toArray().map(el => $(el).text().trim());
    for (const job of siteData.jobs) {
      expect(renderedCompanies, `company "${job.company}" should appear`).toContain(job.company);
    }
  });
});

// ---------------------------------------------------------------------------
// Wins / highlights section
// ---------------------------------------------------------------------------
describe('build output — wins section', () => {
  it('renders the correct number of win entries', () => {
    expect($('.win').length).toBe(siteData.wins.length);
  });
});

// ---------------------------------------------------------------------------
// Skills section — category CSS classes
// ---------------------------------------------------------------------------
describe('build output — skills section', () => {
  it('renders the correct total number of skill tags', () => {
    expect($('.tag').length).toBe(siteData.skills.length);
  });

  it('applies class "hi" to high-priority skills only', () => {
    const hiCount = siteData.skills.filter(s => s.category === 'hi').length;
    expect($('.tag.hi').length).toBe(hiCount);
  });

  it('applies class "lo" to low-priority skills only', () => {
    const loCount = siteData.skills.filter(s => s.category === 'lo').length;
    expect($('.tag.lo').length).toBe(loCount);
  });

  it('does not apply extra classes to uncategorised skills', () => {
    // Skills with empty category should have exactly the "tag" class, nothing else
    const plainCount = siteData.skills.filter(s => s.category === '').length;
    const rendered = $('.tag').toArray().filter(el => {
      const cls = $(el).attr('class') ?? '';
      return cls.trim() === 'tag';
    });
    expect(rendered.length).toBe(plainCount);
  });
});

// ---------------------------------------------------------------------------
// Contact section — link attributes
// ---------------------------------------------------------------------------
describe('build output — contact section', () => {
  it('renders all contact links', () => {
    expect($('.link').length).toBe(siteData.contact.length);
  });

  it('adds target="_blank" and rel="noopener" to external links', () => {
    for (const link of siteData.contact.filter(c => c.external)) {
      const el = $(`a.link[href="${link.url}"]`);
      expect(el.attr('target'), `${link.label} should have target="_blank"`).toBe('_blank');
      expect(el.attr('rel'),    `${link.label} should have rel="noopener"`).toBe('noopener');
    }
  });

  it('does not add target="_blank" to non-external links', () => {
    for (const link of siteData.contact.filter(c => !c.external)) {
      const el = $(`a.link[href="${link.url}"]`);
      expect(el.attr('target'), `${link.label} should not have target`).toBeUndefined();
    }
  });
});
