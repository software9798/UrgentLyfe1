import { ServiceItem, Category } from '../types';

// Common stop words to filter out from multi-word queries
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'in', 'on', 'at', 'to', 'for', 'with', 'from',
  'need', 'needed', 'needs', 'require', 'required', 'requires', 'want', 'wanted',
  'please', 'my', 'and', 'or', 'keeps', 'keep', 'not', 'working', 'help', 'issue', 'problem'
]);

// Synonyms and category linkages
const SYNONYM_MAP: Record<string, string[]> = {
  // Plumbing & Water Issues
  plumber: ['plumbing', 'pipe', 'tap', 'leak', 'leakage', 'drain', 'drainage', 'faucet', 'valve', 'washbasin', 'flush', 'nal', 'paani', 'seepage'],
  plumbing: ['plumber', 'pipe', 'tap', 'leak', 'leakage', 'drain', 'drainage', 'faucet', 'seepage', 'water', 'nal', 'paani'],
  nal: ['plumber', 'plumbing', 'tap', 'pipe', 'water', 'leak', 'faucet'],
  paani: ['water', 'plumbing', 'plumber', 'leak', 'leakage', 'purifier', 'ro', 'pipe', 'tap'],
  leak: ['leakage', 'pipe', 'tap', 'water', 'plumber', 'plumbing', 'seepage', 'dripping', 'paani'],
  leakage: ['leak', 'pipe', 'tap', 'water', 'plumber', 'plumbing', 'seepage', 'drain', 'paani'],
  water: ['plumbing', 'leak', 'leakage', 'purifier', 'ro', 'drain', 'tap', 'pipe', 'paani'],
  tap: ['plumber', 'plumbing', 'leak', 'faucet', 'spindle', 'pipe', 'nal'],
  pipe: ['plumber', 'plumbing', 'leak', 'leakage', 'fitting', 'drain', 'nal'],
  drain: ['drainage', 'unclog', 'clogged', 'plumbing', 'bathroom', 'choke', 'block'],
  drainage: ['drain', 'unclog', 'clogged', 'plumbing', 'bathroom', 'choke'],
  choke: ['drain', 'drainage', 'unclog', 'plumbing', 'pipe', 'blockage'],

  // Electrical & Power Issues
  electrician: ['electrical', 'wiring', 'switch', 'socket', 'mcb', 'fan', 'light', 'fuse', 'spark', 'short circuit', 'bijli', 'pankha'],
  electrical: ['electrician', 'wiring', 'switch', 'socket', 'mcb', 'fan', 'light', 'fuse', 'power', 'bijli', 'pankha'],
  bijli: ['electrical', 'electrician', 'switch', 'socket', 'mcb', 'wiring', 'fan', 'light', 'fuse'],
  fan: ['ceiling fan', 'exhaust fan', 'electrical', 'electrician', 'regulator', 'motor', 'pankha'],
  pankha: ['fan', 'ceiling fan', 'exhaust fan', 'electrical', 'electrician', 'regulator'],
  mcb: ['short circuit', 'fuse', 'tripping', 'trip', 'electrical', 'electrician', 'switchboard', 'spark'],
  wiring: ['wire', 'short circuit', 'electrical', 'electrician', 'switchboard'],
  switch: ['switchboard', 'socket', 'plug', 'electrical', 'electrician', 'bijli'],
  light: ['bulb', 'led', 'tube light', 'electrical', 'electrician', 'holder'],

  // AC & Appliances
  ac: ['air conditioner', 'cooling', 'foam jet', 'gas', 'compressor', 'split ac', 'window ac', 'servicing', 'thanda', 'cooling'],
  air: ['ac', 'air conditioner', 'cooling', 'purifier'],
  cooling: ['ac', 'air conditioner', 'gas refill', 'foam jet', 'compressor', 'thanda'],
  thanda: ['ac', 'cooling', 'refrigerator', 'fridge'],
  fridge: ['refrigerator', 'appliance', 'cooling', 'single door', 'double door', 'compressor'],
  refrigerator: ['fridge', 'appliance', 'compressor', 'cooling'],
  washing: ['washing machine', 'appliance', 'top load', 'front load', 'drain pump', 'machine'],
  machine: ['washing machine', 'washing', 'appliance'],
  ro: ['water purifier', 'purifier', 'filter', 'membrane', 'tds', 'paani'],
  purifier: ['ro', 'water purifier', 'filter', 'membrane'],
  geyser: ['water heater', 'appliance', 'heating', 'thermostat', 'hot water'],
  heater: ['geyser', 'water heater', 'appliance'],

  // Cleaning & Housekeeping
  cleaning: ['clean', 'deep clean', 'bathroom', 'kitchen', 'sofa', 'house cleaning', 'scrubbing', 'safai'],
  clean: ['cleaning', 'deep clean', 'bathroom', 'kitchen', 'sofa', 'safai'],
  safai: ['cleaning', 'clean', 'deep cleaning', 'bathroom', 'kitchen', 'house cleaning'],
  bathroom: ['deep cleaning', 'scrubbing', 'plumbing', 'tap', 'leakage', 'tiles'],
  kitchen: ['deep cleaning', 'chimney', 'scrubbing', 'stove'],
  sofa: ['fabric', 'dry clean', 'shampooing', 'cushion', 'cleaning'],

  // Carpentry & Locksmith
  carpenter: ['carpentry', 'wood', 'door', 'lock', 'hinge', 'handle', 'furniture', 'cupboard', 'taala'],
  carpentry: ['carpenter', 'wood', 'door', 'lock', 'hinge', 'furniture'],
  door: ['lock', 'handle', 'hinge', 'carpenter', 'carpentry', 'jammed', 'darwaza'],
  lock: ['door', 'jammed', 'key', 'carpenter', 'carpentry', 'cylinder', 'taala'],
  taala: ['lock', 'door', 'carpenter', 'key'],

  // Pest Control
  pest: ['cockroach', 'termite', 'bedbug', 'mosquito', 'rodent', 'ant', 'fumigation', 'kida'],
  cockroach: ['pest', 'pest control', 'gel', 'spray'],
  termite: ['pest', 'wood', 'borer', 'treatment'],
  kida: ['pest', 'cockroach', 'termite', 'bedbug'],

  // Salon & Beauty
  salon: ['facial', 'wax', 'waxing', 'haircut', 'pedicure', 'manicure', 'threading', 'massage', 'beauty'],
  facial: ['salon', 'glow', 'skin', 'massage', 'cleanup'],
  wax: ['waxing', 'salon', 'rica', 'honey'],
  haircut: ['hair', 'salon', 'trim', 'styling'],
};

/**
 * Normalizes input string into lower-case clean tokens
 */
export function tokenizeQuery(query: string): string[] {
  if (!query || !query.trim()) return [];
  
  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

/**
 * Filter and sort services by relevance to search query
 */
export function searchServices(
  services: ServiceItem[],
  categories: Category[],
  searchQuery: string,
  selectedCategoryId: string = 'all'
): { filtered: ServiceItem[]; matchCount: number; isSearchActive: boolean } {
  const trimmed = searchQuery.trim();
  const isSearchActive = trimmed.length > 0;

  // If no search query, filter purely by category
  if (!isSearchActive) {
    const filtered =
      selectedCategoryId === 'all'
        ? services
        : services.filter((s) => s.categoryId === selectedCategoryId);
    return { filtered, matchCount: filtered.length, isSearchActive: false };
  }

  const rawTokens = tokenizeQuery(trimmed);
  // Keep meaningful tokens (strip stop words if we have at least 1 non-stop word)
  const meaningfulTokens = rawTokens.filter((t) => !STOP_WORDS.has(t));
  const queryTokens = meaningfulTokens.length > 0 ? meaningfulTokens : rawTokens;

  // Expand query tokens with synonyms
  const expandedTerms = new Set<string>();
  queryTokens.forEach((token) => {
    expandedTerms.add(token);
    if (SYNONYM_MAP[token]) {
      SYNONYM_MAP[token].forEach((syn) => expandedTerms.add(syn.toLowerCase()));
    }
    // Also check if any key in SYNONYM_MAP includes token
    Object.entries(SYNONYM_MAP).forEach(([key, synList]) => {
      if (key.includes(token) || token.includes(key)) {
        expandedTerms.add(key);
        synList.forEach((s) => expandedTerms.add(s.toLowerCase()));
      }
    });
  });

  const queryLower = trimmed.toLowerCase();

  // Score each service
  const scored = services.map((service) => {
    let score = 0;
    const titleLower = service.title.toLowerCase();
    const subtitleLower = service.subtitle.toLowerCase();
    const descLower = service.description.toLowerCase();
    const tagsLower = service.tags.map((t) => t.toLowerCase()).join(' ');
    const categoryLower = service.categoryId.toLowerCase();
    const includesLower = (service.includes || []).join(' ').toLowerCase();

    // 1. Exact or whole phrase matches (highest boost)
    if (titleLower.includes(queryLower)) {
      score += 100;
    }
    if (subtitleLower.includes(queryLower)) {
      score += 60;
    }
    if (descLower.includes(queryLower)) {
      score += 40;
    }
    if (tagsLower.includes(queryLower)) {
      score += 50;
    }
    if (categoryLower.includes(queryLower)) {
      score += 50;
    }

    // 2. Token-level matching
    for (const token of queryTokens) {
      if (titleLower.includes(token)) {
        score += 30;
      }
      if (subtitleLower.includes(token)) {
        score += 18;
      }
      if (tagsLower.includes(token)) {
        score += 15;
      }
      if (categoryLower.includes(token)) {
        score += 20;
      }
      if (descLower.includes(token)) {
        score += 10;
      }
      if (includesLower.includes(token)) {
        score += 8;
      }
    }

    // 3. Synonym & semantic matching
    for (const term of expandedTerms) {
      if (titleLower.includes(term)) {
        score += 15;
      }
      if (categoryLower.includes(term)) {
        score += 12;
      }
      if (subtitleLower.includes(term)) {
        score += 8;
      }
      if (tagsLower.includes(term)) {
        score += 8;
      }
    }

    // If user has explicitly selected a category (and it's not 'all'),
    // grant slight bonus if it matches, but do NOT hide relevant cross-category results completely
    if (selectedCategoryId !== 'all' && service.categoryId === selectedCategoryId) {
      score += 5;
    }

    return { service, score };
  });

  // Keep services with positive relevance score and sort descending
  const matchingScored = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const filtered = matchingScored.map((item) => item.service);

  return {
    filtered,
    matchCount: filtered.length,
    isSearchActive: true,
  };
}
