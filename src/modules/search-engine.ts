// POE Search Engine Module
// Handles POE trade site search operations and DOM manipulation

import type { ParsedItem } from './itemParser';
import type { StatMapping as StatMappingConfig } from './statMappings';
import { createLogger } from './logger';
import { findItemCategoryInput, validateEntireSiteStructure } from './siteValidator';
import { combineCompatibleStats } from './statCombination';

// Type definitions for search engine
export interface SearchResult {
  success: boolean;
  error?: string;
}

export interface SearchStatMapping {
  filterText: string;
  value?: number;
  group: 'explicit' | 'implicit' | 'pseudo' | 'fractured' | 'desecrated';
}

export interface ScaledStatMapping extends SearchStatMapping {
  originalValue?: number;
}

// Configurable delays for testing and optimization
interface DelayConfig {
  clearForm: number;
  setItemType: number;
  expandFilters: number;
  setFilterCategories: number;
  betweenStats: number;
  findFilter: number;
  setFilterValue: number;
  executeSearch: number;
  fallbackRetry: number;
}

// Delay profiles for testing
const DELAY_PROFILES = {
  // Safe - reliable with good performance (formerly ultra)
  safe: {
    clearForm: 50,
    setItemType: 30,
    expandFilters: 50,
    setFilterCategories: 30,
    betweenStats: 20,
    findFilter: 50,
    setFilterValue: 100,
    executeSearch: 20,
    fallbackRetry: 50
  },

  // Lightning - virtually no delays (1ms minimum)
  lightning: {
    clearForm: 1,
    setItemType: 1,
    expandFilters: 1,
    setFilterCategories: 1,
    betweenStats: 1,
    findFilter: 1,
    setFilterValue: 1,
    executeSearch: 1,
    fallbackRetry: 1
  }
} as const;

// Current active profile - change this to test different speeds
let CURRENT_PROFILE: keyof typeof DELAY_PROFILES = 'safe';
let DELAYS: DelayConfig = DELAY_PROFILES[CURRENT_PROFILE];

// Create module logger
const logger = createLogger('SearchEngine');

// Log the current profile for debugging
logger.info(`Using delay profile: ${CURRENT_PROFILE}`, DELAYS);

// Function to update delay profile dynamically
function updateDelayProfile(newProfile: keyof typeof DELAY_PROFILES): void {
  CURRENT_PROFILE = newProfile;
  DELAYS = DELAY_PROFILES[CURRENT_PROFILE];
  logger.info(`Delay profile updated to: ${CURRENT_PROFILE}`, DELAYS);
}

// Expose the function globally for interface access
(window as any).updateDelayProfile = updateDelayProfile;


// Main search engine function
export async function performSearch(parsed: ParsedItem, scalePercent: number = 100): Promise<SearchResult> {
  logger.info('Performing search with item data:', parsed);
  logger.info(`Scale: ${scalePercent}%`);

  try {
    // Step 0: Validate site structure before proceeding
    logger.debug('Step 0: Validating site structure');
    const structureValidation = await validateEntireSiteStructure();

    if (!structureValidation.overallValid) {
      return {
        success: false,
        error: `Site structure validation failed: ${structureValidation.criticalErrors.join(', ')}`
      };
    }
    // Step 1: Clear existing search
    logger.debug('Step 1: Clearing existing search');
    await clearSearchForm();

    // Step 2: Set item category
    logger.debug('Step 2: Setting item type');
    await setItemType(parsed);

    // Step 3: Expand filters if we have stats to add
    const allStats = [...(parsed.implicitStats || []), ...(parsed.stats || [])];
    if (allStats.length > 0) {
      logger.debug(`Step 3: Expanding filters for ${allStats.length} stats (${parsed.implicitStats?.length || 0} implicit, ${parsed.stats?.length || 0} explicit)`);

      // Step 3.1: Combine compatible implicit + explicit stats into pseudo totals
      const combinedStats = combineCompatibleStats(parsed.implicitStats || [], parsed.stats || []);
      logger.debug(`Step 3.1: Combined ${allStats.length} individual stats into ${combinedStats.length} filters (${allStats.length - combinedStats.length} combinations made)`);

      await expandFilters();

      // Step 3.5: Configure filter categories
      logger.debug('Step 3.5: Setting filter categories (only Type Filters enabled)');
      await setFilterCategories();

      // Step 4: Add stat filters with combined stats
      logger.debug(`Step 4: Adding ${combinedStats.length} stat filters with ${scalePercent}% scale`);
      await addStatFilters(combinedStats, scalePercent, parsed.itemClass);
    }

    // Step 5: Execute search
    logger.debug('Step 5: Executing search');
    await executeSearch();

    logger.success('Search completed successfully');
    return { success: true };

  } catch (error) {
    logger.error('Search failed:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

// Clear the search form
async function clearSearchForm(): Promise<void> {
  logger.debug('Attempting to clear search form');

  const clearButton = document.querySelector<HTMLButtonElement>('.clear-btn');
  if (!clearButton) {
    throw new Error('Clear button not found');
  }

  logger.verbose(`Found clear button: ${clearButton.className}`);
  logger.verbose(`Clear button text: "${clearButton.textContent?.trim()}"`);
  logger.verbose(`Clear button visible: ${clearButton.offsetParent !== null}`);
  logger.verbose(`Clear button enabled: ${!clearButton.disabled}`);

  logger.verbose('Clicking clear button');
  clearButton.click();

  await new Promise(resolve => setTimeout(resolve, DELAYS.clearForm));
  logger.debug('Clear button clicked successfully');
}

// Set item category
async function setItemType(parsed: ParsedItem): Promise<void> {
  logger.debug(`Setting item category for Item Class: "${parsed.itemClass}"`);

  const categoryName = (window as any).ITEM_CLASS_TO_CATEGORY[parsed.itemClass];
  if (!categoryName) {
    throw new Error(`Unknown item class: ${parsed.itemClass}`);
  }

  logger.verbose(`Mapping "${parsed.itemClass}" to category: "${categoryName}"`);

  // Find the category dropdown
  const categoryDropdown = document.querySelector<HTMLSelectElement>('select[data-field="category"]');
  if (!categoryDropdown) {
    logger.verbose('Standard dropdown not found, looking for Item Category multiselect...');

    // Use precise selector to find Item Category input specifically
    const multiselectInput = findItemCategoryInput();
    if (!multiselectInput) {
      throw new Error('Item Category selection not found - site structure may have changed');
    }

    // Validate this is actually the Item Category input
    const parentFilter = multiselectInput.closest('.filter');
    const filterTitle = parentFilter?.querySelector('.filter-title')?.textContent?.trim();
    logger.verbose(`Found Item Category dropdown with placeholder: "${multiselectInput.placeholder}"`);
    logger.verbose(`Parent filter title: "${filterTitle}"`);

    // Ensure we're not targeting the search field
    const searchField = document.querySelector('.search-select input');
    if (multiselectInput === searchField) {
      throw new Error('ERROR: Targeting search field instead of Item Category dropdown!');
    }
    logger.verbose('✓ Confirmed we are NOT targeting the search field');

    // Type the category name to filter options
    logger.verbose(`Focusing and typing category: "${categoryName}"`);
    multiselectInput.focus();
    multiselectInput.value = categoryName;
    multiselectInput.dispatchEvent(new Event('input', { bubbles: true }));

    await new Promise(resolve => setTimeout(resolve, DELAYS.setItemType));

    // Wait for dropdown to appear and find exact match
    await new Promise(resolve => setTimeout(resolve, DELAYS.setItemType));

    // Find the specific dropdown options for this multiselect
    const categoryFilter = multiselectInput.closest('.filter');
    const categoryDropdownOptions = categoryFilter?.querySelectorAll('.multiselect__option') || [];

    logger.verbose(`Found ${categoryDropdownOptions.length} options in Item Category dropdown`);

    // Log all available options for debugging
    const availableOptions = Array.from(categoryDropdownOptions).map(opt => opt.textContent?.trim()).filter(Boolean);
    logger.verbose(`Available category options: [${availableOptions.join(', ')}]`);

    let exactOption: Element | null = null;
    for (const option of categoryDropdownOptions) {
      const optionText = option.textContent?.trim();
      if (optionText === categoryName) {
        exactOption = option;
        logger.verbose(`Found exact match for "${categoryName}" in Item Category dropdown`);
        break;
      }
    }

    if (exactOption) {
      // Click the exact option
      (exactOption as HTMLElement).click();
      logger.verbose(`Clicked exact option: "${categoryName}"`);
    } else {
      // Try fallback categories if available
      const fallbacks = (window as any).CATEGORY_FALLBACKS?.[parsed.itemClass];
      let fallbackOption: Element | null = null;
      let usedFallback: string | null = null;

      if (fallbacks && Array.isArray(fallbacks)) {
        logger.verbose(`Trying fallback categories for "${parsed.itemClass}": [${fallbacks.join(', ')}]`);

        for (const fallbackCategory of fallbacks) {
          // Skip the already tried primary category
          if (fallbackCategory === categoryName) continue;

          for (const option of categoryDropdownOptions) {
            const optionText = option.textContent?.trim();
            if (optionText === fallbackCategory) {
              fallbackOption = option;
              usedFallback = fallbackCategory;
              logger.verbose(`Found fallback match: "${fallbackCategory}"`);
              break;
            }
          }
          if (fallbackOption) break;
        }
      }

      if (fallbackOption && usedFallback) {
        // Click the fallback option
        (fallbackOption as HTMLElement).click();
        logger.success(`✓ Used fallback category: "${usedFallback}" for "${parsed.itemClass}"`);
      } else {
        // Final fallback to Enter key if no matches found
        logger.warn(`No exact match found for "${categoryName}" or fallbacks in available options: [${availableOptions.join(', ')}]`);
        logger.warn('Using Enter key fallback');

        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true
        });
        multiselectInput.dispatchEvent(enterEvent);
        logger.verbose('Pressing Enter to select category');
      }
    }

    await new Promise(resolve => setTimeout(resolve, DELAYS.setItemType));

    // Verify the selection was successful
    const selectedValue = multiselectInput.value;
    const isSearchField = multiselectInput === document.querySelector('.search-select input');

    logger.debug(`After category selection:`);
    logger.debug(`  - Selected value: "${selectedValue}"`);
    logger.debug(`  - Is search field: ${isSearchField}`);
    logger.debug(`  - Target category: "${categoryName}"`);

    if (isSearchField) {
      logger.error('CRITICAL ERROR: Text was entered into search field instead of Item Category!');
      throw new Error('Category selection failed - text entered into search field');
    }

    logger.success(`✓ Item category successfully set to: "${categoryName}"`);

  } else {
    // Use standard dropdown
    categoryDropdown.value = categoryName;
    categoryDropdown.dispatchEvent(new Event('change', { bubbles: true }));
    logger.debug(`Item category set to: "${categoryName}"`);
  }
}

// Expand filters section
async function expandFilters(): Promise<void> {
  logger.debug('Looking for show/hide filters button...');

  const toggleButton = document.querySelector<HTMLButtonElement>('.toggle-search-btn');
  if (!toggleButton) {
    throw new Error('Filters toggle button not found');
  }

  logger.verbose(`Found toggle button with selector: ${toggleButton.className}`);

  await new Promise(resolve => setTimeout(resolve, DELAYS.setFilterCategories));

  const buttonText = toggleButton.textContent?.trim() || '';
  logger.verbose(`Current button text: "${buttonText}"`);

  if (buttonText.includes('Show')) {
    logger.verbose('Filters hidden, clicking to expand');
    toggleButton.click();

    await new Promise(resolve => setTimeout(resolve, DELAYS.expandFilters));
    logger.verbose(`After click, button text: "${toggleButton.textContent?.trim()}"`);
  } else {
    logger.verbose('Filters already expanded');
  }
}

// Configure filter categories (only Type Filters enabled)
async function setFilterCategories(): Promise<void> {
  logger.debug('Configuring filter categories...');

  const categoriesToDisable = ['Equipment Filters', 'Requirements', 'Endgame Filters', 'Miscellaneous', 'Trade Filters'];
  const categoriesToEnable = ['Type Filters'];

  // Disable unwanted categories
  for (const category of categoriesToDisable) {
    logger.verbose(`Setting "${category}" to disabled`);
    await setFilterCategoryState(category, false);
  }

  // Enable wanted categories
  for (const category of categoriesToEnable) {
    logger.verbose(`Setting "${category}" to enabled`);
    await setFilterCategoryState(category, true);
  }

  logger.debug('Filter categories configured');
}

// Set individual filter category state
async function setFilterCategoryState(categoryName: string, enabled: boolean): Promise<void> {
  const categoryElements = document.querySelectorAll<HTMLElement>('.filter-group');

  for (const element of categoryElements) {
    const titleElement = element.querySelector<HTMLElement>('.filter-group-title');
    if (titleElement && titleElement.textContent?.trim() === categoryName) {

      const enableButton = element.querySelector<HTMLButtonElement>('.filter-group-enable');

      // Check current state
      const isExpanded = !element.classList.contains('filter-group-collapsed');
      const isEnabled = enableButton ? !enableButton.classList.contains('btn-default') : true;

      logger.verbose(`"${categoryName}" current state: expanded=${isExpanded}, enabled=${isEnabled}`);

      // Set enabled/disabled state
      if (enableButton) {
        const shouldBeEnabled = enabled;
        if (isEnabled !== shouldBeEnabled) {
          logger.verbose(`${shouldBeEnabled ? 'Enabling' : 'Disabling'} "${categoryName}"`);
          enableButton.click();
          await new Promise(resolve => setTimeout(resolve, DELAYS.betweenStats));
        } else {
          logger.verbose(`"${categoryName}" is already ${enabled ? 'enabled' : 'disabled'}`);
        }
      } else {
        logger.verbose(`"${categoryName}" is already ${enabled ? 'enabled' : 'disabled'}`);
      }

      return;
    }
  }

  logger.warn(`Category "${categoryName}" not found`);
}

// Add stat filters
async function addStatFilters(stats: string[], scalePercent: number = 100, itemClass: string | null = null): Promise<void> {
  logger.debug('Adding stat filters for:', stats);

  for (const stat of stats) {
    logger.verbose(`Processing: "${stat}"`);

    const mapping = (window as any).findStatMapping(stat, itemClass) as StatMappingConfig | null;
    if (!mapping) {
      logger.warn(`No mapping found for: "${stat}"`);
      continue;
    }

    if (mapping.unsupported) {
      logger.info(`Skipping intentionally unsupported stat: "${stat}"`);
      continue;
    }

    // Extract value from stat text and create search mapping
    const extractedValue = mapping.extractValue(stat);
    if (extractedValue === null) {
      logger.warn(`Could not extract value from: "${stat}"`);
      continue;
    }

    // Create search mapping with extracted value
    let searchMapping: SearchStatMapping = {
      filterText: mapping.filterText,
      group: mapping.group,
      value: extractedValue
    };

    // Apply scaling to the mapping value
    let scaledMapping: ScaledStatMapping = { ...searchMapping };
    if (searchMapping.value && scalePercent !== 100) {
      const originalValue = searchMapping.value;
      const scaledValue = Math.floor(originalValue * (scalePercent / 100));
      scaledMapping.value = scaledValue;
      scaledMapping.originalValue = originalValue;
      logger.verbose(`Scaling "${stat}": ${originalValue} -> ${scaledValue} (${scalePercent}%)`);
    }

    logger.verbose(`Adding filter: "${stat}" -> "${scaledMapping.filterText}" (value: ${scaledMapping.value})`);

    const success = await addSingleStatFilter(scaledMapping);
    if (success) {
      logger.debug(`Added: "${stat}"`);
    } else {
      logger.error(`Failed to add "${stat}" - stopping here`);
      return; // Exit completely on first failure
    }
  }
}

// Add a single stat filter - typing approach
async function addSingleStatFilter(mapping: SearchStatMapping): Promise<boolean> {
  // Step 1: Find and focus the Add Stat Filter input
  const addInput = document.querySelector<HTMLInputElement>('input[placeholder="+ Add Stat Filter"]');
  if (!addInput) {
    logger.error('Add Stat Filter input not found');
    return false;
  }

  logger.verbose(`Typing filter text: "${mapping.filterText}"`);

  // Step 2: Focus the input and clear any existing text
  addInput.focus();
  addInput.value = '';

  // Step 3: Type the filter text
  addInput.value = mapping.filterText;

  // Dispatch input event to trigger Vue.js reactivity
  addInput.dispatchEvent(new Event('input', { bubbles: true }));

  await new Promise(resolve => setTimeout(resolve, DELAYS.findFilter));

  // Step 3.5: Smart dropdown selection - find best match and avoid "desecrated" versions
  const dropdownOptions = document.querySelectorAll<HTMLSpanElement>('.multiselect__option span');
  logger.verbose(`Dropdown shows ${dropdownOptions.length} options after typing`);

  let bestMatch: HTMLSpanElement | null = null;
  let exactMatch: HTMLSpanElement | null = null;
  let firstFiveOptions: string[] = [];

  for (let i = 0; i < dropdownOptions.length; i++) {
    const opt = dropdownOptions[i];
    const optText = opt.textContent?.trim() || '';

    // Log first 5 for debugging
    if (i < 5) {
      firstFiveOptions.push(optText);
    }

    // Check if we should include or skip based on mapping group
    const optionMutateType = opt.querySelector<HTMLElement>('i.mutate-type');
    const mutateTypeClass = optionMutateType ? optionMutateType.className : '';
    const mutateTypeText = optionMutateType ? optionMutateType.textContent?.trim().toLowerCase() || '' : '';

    // Determine the group type from both class and text content
    let optionGroup: SearchStatMapping['group'] = 'explicit'; // default
    if (mutateTypeClass.includes('mutate-type-desecrated') || mutateTypeText === 'desecrated') {
      optionGroup = 'desecrated';
    } else if (mutateTypeClass.includes('mutate-type-fractured') || mutateTypeText === 'fractured') {
      optionGroup = 'fractured';
    } else if (mutateTypeClass.includes('mutate-type-pseudo') || mutateTypeText === 'pseudo') {
      optionGroup = 'pseudo';
    }

    // Skip if the option group doesn't match our mapping group
    if (optionGroup !== mapping.group) {
      continue;
    }

    // Check for exact match
    if (optText === mapping.filterText) {
      exactMatch = opt;
      logger.verbose(`Found exact match at position ${i + 1}: "${optText}"`);
      break;
    }

    // Check for best partial match (only if no exact match yet)
    if (!bestMatch && optText.includes(mapping.filterText.replace('#', '').trim())) {
      bestMatch = opt;
      logger.verbose(`Found potential match at position ${i + 1}: "${optText}"`);
    }
  }

  // Use exact match if found, otherwise use best match
  const selectedOption = exactMatch || bestMatch;

  if (selectedOption) {
    const optText = selectedOption.textContent?.trim() || '';
    logger.verbose(`Selecting option: "${optText}"`);

    // Click on the parent option element
    const optionElement = selectedOption.closest<HTMLElement>('.multiselect__option');
    if (optionElement) {
      optionElement.click();
      logger.verbose('Clicked selected option');

      // Wait for selection to register
      await new Promise(resolve => setTimeout(resolve, DELAYS.findFilter));

      // Jump to verification step
      const filterTitles = document.querySelectorAll<HTMLElement>('.filter-title');
      logger.verbose(`Looking for filter containing: "${mapping.filterText}"`);
      logger.verbose(`Found ${filterTitles.length} filter titles:`, Array.from(filterTitles).map(el => `"${el.textContent?.trim()}"`));

      const newFilter = Array.from(filterTitles).find(el => {
        const cleanTitle = el.textContent?.replace(/explicit\s+/i, '').replace(/\s+/g, ' ').trim() || '';
        return cleanTitle === mapping.filterText || cleanTitle.includes(mapping.filterText);
      });

      if (!newFilter) {
        logger.error(`Filter was not created for: ${mapping.filterText}`);
        return false;
      }

      logger.debug(`Filter created: ${newFilter.textContent?.trim()}`);

      // Set the value - use min for "Adds # to #" stats, min for others
      const filterElement = newFilter.closest<HTMLElement>('.filter');
      if (filterElement) {
        const isAddsRange = mapping.filterText && mapping.filterText.includes('Adds # to #');

        if (isAddsRange) {
          // For "Adds # to #" stats, set the min value
          const minInput = filterElement.querySelector<HTMLInputElement>('input[placeholder="min"]');
          if (minInput && mapping.value) {
            logger.verbose(`Setting min value to: ${mapping.value} (for Adds # to # stat)`);
            minInput.focus();
            minInput.value = String(mapping.value);
            minInput.dispatchEvent(new Event('input', { bubbles: true }));
            minInput.dispatchEvent(new Event('change', { bubbles: true }));
            logger.verbose(`Min value set to: ${mapping.value}`);
          }
        } else {
          // For other stats, set the min value
          const minInput = filterElement.querySelector<HTMLInputElement>('input[placeholder="min"]');
          if (minInput && mapping.value) {
            logger.verbose(`Setting min value to: ${mapping.value}`);
            minInput.focus();
            minInput.value = String(mapping.value);
            minInput.dispatchEvent(new Event('input', { bubbles: true }));
            minInput.dispatchEvent(new Event('change', { bubbles: true }));
            logger.verbose(`Min value set to: ${mapping.value}`);
          }
        }
      }

      return true;
    }
  }

  // Log what we saw in the dropdown
  logger.verbose('First 5 options:', firstFiveOptions);

  if (!selectedOption) {
    logger.verbose('No suitable match found, falling back to Enter key');
  } else {
    logger.verbose('Used smart selection, skipping Enter key fallback');
    return true;
  }

  // Fallback to Enter key if no smart selection was made
  logger.verbose('Falling back to Enter key selection');
  // Step 4: Press Enter to confirm selection

  // Try multiple Enter events - some components need keyup, keypress, or both
  const enterKeydown = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  });

  const enterKeypress = new KeyboardEvent('keypress', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  });

  const enterKeyup = new KeyboardEvent('keyup', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true,
    cancelable: true
  });

  // Dispatch all three events
  addInput.dispatchEvent(enterKeydown);
  addInput.dispatchEvent(enterKeypress);
  addInput.dispatchEvent(enterKeyup);

  await new Promise(resolve => setTimeout(resolve, DELAYS.setFilterValue));

  // Step 5: Verify the filter was created
  const filterTitles = document.querySelectorAll<HTMLElement>('.filter-title');

  logger.verbose(`Looking for filter containing: "${mapping.filterText}"`);
  logger.verbose(`Found ${filterTitles.length} filter titles:`, Array.from(filterTitles).map(el => `"${el.textContent?.trim()}"`));

  const newFilter = Array.from(filterTitles).find(el => {
    const cleanTitle = el.textContent?.replace(/explicit\s+/i, '').replace(/\s+/g, ' ').trim() || '';
    // Check if the filter title matches our filter text
    return cleanTitle === mapping.filterText || cleanTitle.includes(mapping.filterText);
  });

  if (!newFilter) {
    logger.error(`Filter was not created for: ${mapping.filterText}`);
    return false;
  }

  logger.debug(`Filter created: ${newFilter.textContent?.trim()}`);

  // Step 6: Tab to the min input field (much more natural!)
  logger.verbose('Tabbing to min input field');
  const tabEvent = new KeyboardEvent('keydown', {
    key: 'Tab',
    code: 'Tab',
    bubbles: true,
    cancelable: true
  });
  (document.activeElement as HTMLElement)?.dispatchEvent(tabEvent);

  await new Promise(resolve => setTimeout(resolve, DELAYS.executeSearch));

  // Step 7: Type the min value into the focused input
  const activeElement = document.activeElement as HTMLInputElement;
  if (activeElement && activeElement.placeholder === 'min') {
    logger.verbose(`Setting min value: ${mapping.value}`);
    activeElement.value = String(mapping.value || '');
    activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    activeElement.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  } else {
    logger.error('Tab didn\'t focus min input. Active element:', activeElement);
    logger.verbose('Trying fallback - finding min input manually');

    // Fallback: find the min input manually
    const minInputs = document.querySelectorAll<HTMLInputElement>('input[placeholder="min"]');
    const lastMinInput = minInputs[minInputs.length - 1];

    if (lastMinInput) {
      lastMinInput.focus();
      lastMinInput.value = String(mapping.value || '');
      lastMinInput.dispatchEvent(new Event('input', { bubbles: true }));
      lastMinInput.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    } else {
      logger.error('Min input not found after creating filter');
      return false;
    }
  }
}

// Execute the search
async function executeSearch(): Promise<void> {
  const searchButton = document.querySelector<HTMLButtonElement>('.search-btn');
  if (searchButton) {
    searchButton.click();
    logger.debug('Search button clicked');
  } else {
    logger.warn('Search button not found, search may auto-execute');
  }
}

// Browser environment - attach to window
(window as any).performSearch = performSearch;
(window as any).clearSearchForm = clearSearchForm;
(window as any).setItemType = setItemType;
(window as any).expandFilters = expandFilters;
(window as any).setFilterCategories = setFilterCategories;
(window as any).addStatFilters = addStatFilters;
(window as any).addSingleStatFilter = addSingleStatFilter;
(window as any).executeSearch = executeSearch;
(window as any).combineCompatibleStats = combineCompatibleStats;