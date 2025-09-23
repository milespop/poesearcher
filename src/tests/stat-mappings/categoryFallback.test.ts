import { describe, it, expect } from 'vitest';
import { ITEM_CLASS_TO_CATEGORY, CATEGORY_FALLBACKS } from '../../modules/itemParser';

describe('Category Fallback System', () => {
  it('should have primary mappings for two-handed weapons', () => {
    expect(ITEM_CLASS_TO_CATEGORY['Two Hand Swords']).toBe('Two-Handed Sword');
    expect(ITEM_CLASS_TO_CATEGORY['Two Hand Axes']).toBe('Two-Handed Axe');
    expect(ITEM_CLASS_TO_CATEGORY['Two Hand Maces']).toBe('Two-Handed Mace');
  });

  it('should have fallback mappings defined', () => {
    expect(CATEGORY_FALLBACKS['Two Hand Swords']).toEqual(['Two-Handed Sword', 'Two Hand Sword']);
    expect(CATEGORY_FALLBACKS['Two Hand Axes']).toEqual(['Two-Handed Axe', 'Two Hand Axe']);
    expect(CATEGORY_FALLBACKS['Two Hand Maces']).toEqual(['Two-Handed Mace', 'Two Hand Mace']);
  });

  it('should have fallbacks include the primary mapping as first option', () => {
    Object.entries(CATEGORY_FALLBACKS).forEach(([itemClass, fallbacks]) => {
      const primaryMapping = ITEM_CLASS_TO_CATEGORY[itemClass as keyof typeof ITEM_CLASS_TO_CATEGORY];
      expect(fallbacks[0]).toBe(primaryMapping);
    });
  });

  it('should provide alternative formats for each two-handed weapon', () => {
    // Each fallback should have at least 2 options (hyphenated and space versions)
    Object.values(CATEGORY_FALLBACKS).forEach(fallbacks => {
      expect(fallbacks.length).toBeGreaterThanOrEqual(2);
    });
  });
});