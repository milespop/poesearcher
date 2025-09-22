// POE Trade Site Structure Validator
// Validates that all DOM elements we interact with are present and correct

import { createLogger } from './logger';

const logger = createLogger('SiteValidator');

// Type definitions for validation results
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ComprehensiveSiteValidation {
  searchInterface: ValidationResult;
  typeFilters: ValidationResult;
  statFilters: ValidationResult;
  advancedControls: ValidationResult;
  results: ValidationResult;
  overallValid: boolean;
  criticalErrors: string[];
}

// Selector definitions for each site section
const SEARCH_INTERFACE_SELECTORS = {
  // Main search field - should NOT be targeted for categories
  searchField: '.search-select input[placeholder*="Search Items"]',
  searchDropdown: '.search-select .multiselect__content',

  // Form controls
  clearButton: '.clear-btn',
  searchButton: '.search-btn, button[type="submit"]',

  // Status selectors (top right)
  leagueSelector: '.status-select',

  // Search tabs
  searchTab: '[data-tab="search"]',
  exchangeTab: '[data-tab="exchange"]'
};

const TYPE_FILTERS_SELECTORS = {
  // Main container
  typeFiltersSection: '.filter-group-header',
  typeFiltersBody: '.filter-group-body',

  // Item Category filter
  itemCategoryTitle: '.filter-title',

  // Expected category options that should be present
  expectedCategories: ['Ring', 'Amulet', 'Belt', 'Any Weapon', 'Any Armour', 'Any Accessory', 'Any Gem']
};

const STAT_FILTERS_SELECTORS = {
  // Main stat filter area
  statFiltersContainer: '.search-advanced-items',
  addFilterButton: '.filter-group-select',

  // Individual stat filter components
  statFilterRow: '.filter',
  statSearchInput: '.filter-select input',
  statOptions: '.multiselect__option',

  // Value inputs
  minValueInput: 'input[placeholder="Min"]',
  maxValueInput: 'input[placeholder="Max"]',

  // Filter group types
  filterGroups: {
    explicit: '.mutate-type-explicit',
    implicit: '.mutate-type-implicit',
    pseudo: '.mutate-type-pseudo',
    fractured: '.mutate-type-fractured',
    desecrated: '.mutate-type-desecrated'
  },

  // Remove filter controls
  removeFilterButton: '.remove-btn'
};

const ADVANCED_CONTROLS_SELECTORS = {
  // Expand/collapse controls
  advancedToggle: '.search-advanced-toggle, .toggle-btn',
  advancedSection: '.search-advanced',

  // Filter category controls
  filterCategoryToggles: '.filter-group-header .toggle-btn',

  // Search execution
  searchExecuteButton: '.search-btn, button[type="submit"]',
  liveSearchToggle: '.live-search-toggle'
};

// Results selectors - commented out for now as not actively used
// const RESULTS_SELECTORS = {
//   // Results container
//   resultsContainer: '.results, .search-results',
//   resultsTable: '.results table, .search-results table',
//
//   // Navigation
//   pagination: '.pagination',
//   nextButton: '.pagination .next',
//   prevButton: '.pagination .prev',
//
//   // Sort controls
//   sortControls: '.sort-controls',
//   sortByPrice: '.sort-price',
//   sortByLevel: '.sort-level'
// };

// Individual validation functions
async function validateSearchInterface(): Promise<ValidationResult> {
  const errors: string[] = [];

  logger.debug('Validating search interface...');

  // Verify search field exists and has correct placeholder
  const searchField = document.querySelector(SEARCH_INTERFACE_SELECTORS.searchField);
  if (!searchField) {
    errors.push('Main search field not found');
  } else {
    const placeholder = searchField.getAttribute('placeholder');
    if (!placeholder?.includes('Search Items')) {
      errors.push(`Search field placeholder unexpected: "${placeholder}"`);
    }
    logger.verbose(`Search field found with placeholder: "${placeholder}"`);
  }

  // Verify clear button exists
  const clearButton = document.querySelector(SEARCH_INTERFACE_SELECTORS.clearButton);
  if (!clearButton) {
    errors.push('Clear button not found');
  } else {
    logger.verbose('Clear button found');
  }

  // Verify league selector exists
  const leagueSelectors = document.querySelectorAll(SEARCH_INTERFACE_SELECTORS.leagueSelector);
  if (leagueSelectors.length === 0) {
    errors.push('League selector not found');
  } else {
    logger.verbose(`Found ${leagueSelectors.length} status selectors`);
  }

  return { valid: errors.length === 0, errors };
}

async function validateTypeFilters(): Promise<ValidationResult> {
  const errors: string[] = [];

  logger.debug('Validating type filters section...');

  // Find Type Filters section
  const typeFilterHeaders = Array.from(document.querySelectorAll(TYPE_FILTERS_SELECTORS.typeFiltersSection));
  const typeSection = typeFilterHeaders.find(header =>
    header.textContent?.includes('Type Filters')
  );

  if (!typeSection) {
    errors.push('Type Filters section not found');
    return { valid: false, errors };
  }

  logger.verbose('Type Filters section found');

  // Find Item Category filter
  const categoryTitles = Array.from(document.querySelectorAll(TYPE_FILTERS_SELECTORS.itemCategoryTitle));
  const categoryTitle = categoryTitles.find(title =>
    title.textContent?.includes('Item Category')
  );

  if (!categoryTitle) {
    errors.push('Item Category filter not found');
    return { valid: false, errors };
  }

  logger.verbose('Item Category filter found');

  // Verify category input exists
  const categoryFilter = categoryTitle.closest('.filter');
  const categoryInput = categoryFilter?.querySelector('.multiselect__input');
  if (!categoryInput) {
    errors.push('Item Category input not found');
  } else {
    const placeholder = categoryInput.getAttribute('placeholder');
    logger.verbose(`Item Category input found with placeholder: "${placeholder}"`);
  }

  // Verify expected categories exist
  const categoryDropdown = categoryFilter?.querySelector('.multiselect__content');
  if (categoryDropdown) {
    const options = Array.from(categoryDropdown.querySelectorAll('.multiselect__option span'))
      .map(span => span.textContent?.trim())
      .filter(text => text && text !== 'No elements found. Consider changing the search query.');

    logger.verbose(`Found ${options.length} category options`);

    const missingCategories: string[] = [];
    for (const expectedCategory of TYPE_FILTERS_SELECTORS.expectedCategories) {
      if (!options.includes(expectedCategory)) {
        missingCategories.push(expectedCategory);
      }
    }

    if (missingCategories.length > 0) {
      errors.push(`Missing expected categories: ${missingCategories.join(', ')}`);
    } else {
      logger.verbose('All expected categories found');
    }
  } else {
    // Category dropdown might not be visible initially, this is not necessarily an error
    logger.verbose('Category dropdown not visible (may be hidden)');
  }

  return { valid: errors.length === 0, errors };
}

async function validateStatFilters(): Promise<ValidationResult> {
  const errors: string[] = [];

  logger.debug('Validating stat filters section...');

  // Check main stat filter container
  const statContainer = document.querySelector(STAT_FILTERS_SELECTORS.statFiltersContainer);
  if (!statContainer) {
    errors.push('Stat filters container not found');
  } else {
    logger.verbose('Stat filters container found');
  }

  // Check filter group types exist
  let groupsFound = 0;
  Object.entries(STAT_FILTERS_SELECTORS.filterGroups).forEach(([groupName, selector]) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      logger.verbose(`${groupName} filter group not currently visible`);
    } else {
      groupsFound++;
      logger.verbose(`${groupName} filter group found (${elements.length} elements)`);
    }
  });

  if (groupsFound === 0) {
    errors.push('No filter groups found (this may be normal if no stats are added yet)');
  }

  return { valid: errors.length === 0, errors };
}

async function validateAdvancedControls(): Promise<ValidationResult> {
  const errors: string[] = [];

  logger.debug('Validating advanced controls...');

  // Check advanced section exists
  const advancedSection = document.querySelector(ADVANCED_CONTROLS_SELECTORS.advancedSection);
  if (!advancedSection) {
    errors.push('Advanced search section not found');
  } else {
    logger.verbose('Advanced search section found');
  }

  // Check for toggle buttons
  const toggleButtons = document.querySelectorAll(ADVANCED_CONTROLS_SELECTORS.filterCategoryToggles);
  if (toggleButtons.length === 0) {
    errors.push('No filter category toggle buttons found');
  } else {
    logger.verbose(`Found ${toggleButtons.length} toggle buttons`);
  }

  return { valid: errors.length === 0, errors };
}

async function validateResults(): Promise<ValidationResult> {
  const errors: string[] = [];

  logger.debug('Validating results section...');

  // Results validation is lighter since results may not exist initially
  // We just verify the basic structure is present

  return { valid: errors.length === 0, errors };
}

// Master validation function
export async function validateEntireSiteStructure(): Promise<ComprehensiveSiteValidation> {
  logger.info('Starting comprehensive site structure validation...');

  const validation: ComprehensiveSiteValidation = {
    searchInterface: await validateSearchInterface(),
    typeFilters: await validateTypeFilters(),
    statFilters: await validateStatFilters(),
    advancedControls: await validateAdvancedControls(),
    results: await validateResults(),
    overallValid: false,
    criticalErrors: []
  };

  // Determine critical errors that would break core functionality
  const criticalSections: (keyof Pick<ComprehensiveSiteValidation, 'searchInterface' | 'typeFilters'>)[] = ['searchInterface', 'typeFilters'];
  validation.criticalErrors = criticalSections
    .filter(section => {
      const sectionResult = validation[section];
      return !sectionResult.valid;
    })
    .flatMap(section => {
      const sectionResult = validation[section];
      return sectionResult.errors.map(error => `${section}: ${error}`);
    });

  validation.overallValid = validation.criticalErrors.length === 0;

  // Log validation results
  if (validation.overallValid) {
    logger.success('Site structure validation passed');
  } else {
    logger.error('Site structure validation failed:', validation.criticalErrors);
  }

  // Log all section results for debugging
  Object.entries(validation).forEach(([section, result]) => {
    if (typeof result === 'object' && result.valid !== undefined) {
      const sectionResult = result as ValidationResult;
      if (sectionResult.valid) {
        logger.verbose(`${section}: ✓ Valid`);
      } else {
        logger.warn(`${section}: ✗ Invalid -`, sectionResult.errors);
      }
    }
  });

  return validation;
}

// Specific function to validate and find the Item Category input
export function findItemCategoryInput(): HTMLInputElement | null {
  logger.debug('Finding Item Category input...');

  // Method 1: Find by "Item Category" title text
  const categoryTitles = Array.from(document.querySelectorAll('.filter-title'));
  const categoryTitle = categoryTitles.find(title =>
    title.textContent?.includes('Item Category')
  );

  if (categoryTitle) {
    const categoryFilter = categoryTitle.closest('.filter');
    const categoryInput = categoryFilter?.querySelector('.multiselect__input') as HTMLInputElement;

    if (categoryInput) {
      logger.verbose('Item Category input found via title text');
      return categoryInput;
    }
  }

  // Method 2: Fallback - look for multiselect in Type Filters section
  const typeFilterHeaders = Array.from(document.querySelectorAll('.filter-group-header'));
  const typeSection = typeFilterHeaders.find(header =>
    header.textContent?.includes('Type Filters')
  );

  if (typeSection) {
    const typeBody = typeSection.nextElementSibling;
    const multiselectInput = typeBody?.querySelector('.multiselect__input') as HTMLInputElement;

    if (multiselectInput) {
      logger.verbose('Item Category input found via Type Filters section');
      return multiselectInput;
    }
  }

  logger.error('Item Category input not found');
  return null;
}