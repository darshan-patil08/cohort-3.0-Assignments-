// ── Helpers & utilities ──────────────────────────────────────────

/**
 * Format a number as USD currency
 */
export const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);

/**
 * Calculate discount percentage
 */
export const calcDiscount = (original, sale) =>
  Math.round(((original - sale) / original) * 100);

/**
 * Clamp a number between min and max
 */
export const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

/**
 * Generate a simple avatar from name initials
 */
export const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

/**
 * Truncate text to n characters
 */
export const truncate = (text = "", n = 100) =>
  text.length > n ? text.slice(0, n).trimEnd() + "…" : text;

/**
 * Debounce a function call
 */
export const debounce = (fn, delay = 400) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Slugify a string
 */
export const slugify = (str = "") =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

/**
 * Generate star array for a rating (1-5)
 */
export const getStars = (rating = 0) =>
  Array.from({ length: 5 }, (_, i) => (i < Math.round(rating) ? "filled" : "empty"));

/**
 * Sort products by field
 */
export const sortProducts = (products, sortBy) => {
  const arr = [...products];
  switch (sortBy) {
    case "price-asc":    return arr.sort((a, b) => a.price - b.price);
    case "price-desc":   return arr.sort((a, b) => b.price - a.price);
    case "rating":       return arr.sort((a, b) => b.rating - a.rating);
    case "name-asc":     return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":       return arr.sort((a, b) => b.id - a.id);
    default:             return arr;
  }
};

/**
 * Get a random subset of an array
 */
export const getRandom = (arr, n) => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
};
