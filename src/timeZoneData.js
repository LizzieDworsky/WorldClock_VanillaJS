/**
 * Provides a custom mapping of time zone identifiers to their corresponding city and country names.
 * This data is based on Moment.js Time Zone information and is manually curated.
 *
 * The object is used throughout the application to populate select options and display time zone information.
 * Each key in the object is a time zone identifier (e.g., 'Europe/London'),
 * and the corresponding value is a string combining the city and country name (e.g., 'London, GBR').
 *
 * Example Usage:
 * - timeZoneData['Europe/London'] // Returns 'London, GBR'
 *
 * Note: This data is manually curated and should be updated as needed to reflect accurate time zone information.
 */
export const timeZoneData = {
    "Europe/London": "London, GBR",
    "Europe/Amsterdam": "Amsterdam, NLD",
    "Africa/Cairo": "Cairo, EGY",
    "Europe/Istanbul": "Istanbul, TUR",
    "Asia/Muscat": "Muscat, OMN",
    "Asia/Karachi": "Karachi, PAK",
    "Asia/Colombo": "Colombo, LKA",
    "Asia/Dhaka": "Dhaka, BGD",
    "Asia/Bangkok": "Bangkok, THA",
    "Asia/Shanghai": "Shanghai, CHN",
    "Asia/Tokyo": "Tokyo, JPN",
    "Pacific/Guam": "Guam, GUM",
    "Australia/Sydney": "Sydney, AUS",
    "Pacific/Norfolk": "Norfolk Island, NFK",
    "Pacific/Auckland": "Auckland, NZL",
    "Pacific/Honolulu": "Honolulu, USA",
    "America/Anchorage": "Anchorage, USA",
    "America/Los_Angeles": "Los Angeles, USA",
    "America/Denver": "Denver, USA",
    "America/Chicago": "Chicago, USA",
    "America/New_York": "New York, USA",
    "America/Santo_Domingo": "Santo Domingo, DOM",
    "America/Santiago": "Santigo, CHL",
    "America/Noronha": "Noronha, BRA",
    "Atlantic/Cape_Verde": "Cape Verde, CPV",
};
