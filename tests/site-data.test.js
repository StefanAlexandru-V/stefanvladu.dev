import { describe, it, expect } from 'vitest';
import siteData from '../_data/site.json';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
describe('site.json — metadata', () => {
  it('has a non-empty title', () => {
    expect(siteData.site.title).toBeTruthy();
  });

  it('has a non-empty first name', () => {
    expect(siteData.site.name.first).toBeTruthy();
  });

  it('has a non-empty last name', () => {
    expect(siteData.site.name.last).toBeTruthy();
  });

  it('has a non-empty intro', () => {
    expect(siteData.site.intro).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------
describe('site.json — jobs', () => {
  it('contains at least one entry', () => {
    expect(siteData.jobs.length).toBeGreaterThan(0);
  });

  it('every job has all required string fields', () => {
    for (const job of siteData.jobs) {
      expect(job.dateStart, `job "${job.role}" — dateStart`).toBeTruthy();
      expect(job.dateEnd,   `job "${job.role}" — dateEnd`).toBeTruthy();
      expect(job.role,      `job "${job.role}" — role`).toBeTruthy();
      expect(job.company,   `job "${job.role}" — company`).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
// Wins / highlights
// ---------------------------------------------------------------------------
describe('site.json — wins', () => {
  it('contains at least one entry', () => {
    expect(siteData.wins.length).toBeGreaterThan(0);
  });

  it('every win has a highlight and a description', () => {
    for (const win of siteData.wins) {
      expect(win.highlight,   `win highlight`).toBeTruthy();
      expect(win.description, `win "${win.highlight}" — description`).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------
describe('site.json — skills', () => {
  it('contains at least one entry', () => {
    expect(siteData.skills.length).toBeGreaterThan(0);
  });

  it('every skill has a non-empty name', () => {
    for (const skill of siteData.skills) {
      expect(skill.name).toBeTruthy();
    }
  });

  it('every skill category is "hi", "lo", or an empty string', () => {
    const valid = new Set(['hi', 'lo', '']);
    for (const skill of siteData.skills) {
      expect(
        valid.has(skill.category),
        `skill "${skill.name}" has unexpected category "${skill.category}"`,
      ).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// Contact links
// ---------------------------------------------------------------------------
describe('site.json — contact', () => {
  it('contains at least one entry', () => {
    expect(siteData.contact.length).toBeGreaterThan(0);
  });

  it('every contact has label, value, url, and a boolean external flag', () => {
    for (const link of siteData.contact) {
      expect(link.label,               `label`).toBeTruthy();
      expect(link.value,               `value for "${link.label}"`).toBeTruthy();
      expect(link.url,                 `url for "${link.label}"`).toBeTruthy();
      expect(typeof link.external,     `external must be boolean for "${link.label}"`).toBe('boolean');
    }
  });

  it('external contacts have https:// URLs', () => {
    for (const link of siteData.contact) {
      if (link.external) {
        expect(link.url, `${link.label} URL should start with https://`).toMatch(/^https:\/\//);
      }
    }
  });

  it('non-external email contacts use mailto: scheme', () => {
    for (const link of siteData.contact) {
      if (!link.external && link.label.toLowerCase() === 'email') {
        expect(link.url, 'email URL should start with mailto:').toMatch(/^mailto:/);
      }
    }
  });
});
