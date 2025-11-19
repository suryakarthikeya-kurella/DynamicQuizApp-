/**
 * Utility helpers shared across pages.
 * Using ES module exports keeps the global scope clean.
 */

/**
 * Format seconds into mm:ss string.
 * @param {number} seconds
 * @returns {string}
 */
const formatTime = (seconds = 0) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

/**
 * Save a JSON-friendly object to sessionStorage.
 * @param {string} key
 * @param {unknown} value
 */
const saveToSession = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieve parsed JSON from sessionStorage.
 * @param {string} key
 * @param {unknown} fallback
 * @returns {any}
 */
const getFromSession = (key, fallback = null) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Failed to parse sessionStorage key "${key}"`, error);
    return fallback;
  }
};

/**
 * Remove a key from sessionStorage.
 * @param {string} key
 */
const removeFromSession = (key) => sessionStorage.removeItem(key);

/**
 * Guard helper to redirect if required keys are missing.
 * @param {string[]} keys
 * @param {string} redirectTo
 * @returns {boolean}
 */
const ensureSessionKeys = (keys = [], redirectTo = "index.html") => {
  const missing = keys.some((key) => !sessionStorage.getItem(key));
  if (missing) {
    window.location.replace(redirectTo);
    return false;
  }
  return true;
};

export { formatTime, saveToSession, getFromSession, removeFromSession, ensureSessionKeys };

