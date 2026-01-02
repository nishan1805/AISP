/**
 * Utility function to remove HTML tags from a string
 * @param htmlString - The string containing HTML tags
 * @returns Plain text string with HTML tags removed
 */
export const stripHtmlTags = (htmlString: string | null | undefined): string => {
  if (!htmlString) {
    return '';
  }
  
  // Create a temporary element and set its innerHTML to the HTML string
  // Then extract the textContent to get plain text
  if (typeof window !== 'undefined') {
    // Client-side: use DOM API
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || '';
  } else {
    // Server-side: use regex fallback
    return htmlString
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>') // Replace &gt; with >
      .replace(/&quot;/g, '"') // Replace &quot; with "
      .replace(/&#39;/g, "'") // Replace &#39; with '
      .trim(); // Remove leading/trailing whitespace
  }
};

/**
 * Utility function to truncate text to a specified length
 * @param text - The text to truncate
 * @param maxLength - Maximum length of the text
 * @param suffix - Suffix to add when text is truncated (default: '...')
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + suffix;
};

/**
 * Utility function to strip HTML tags and truncate text
 * @param htmlString - The string containing HTML tags
 * @param maxLength - Maximum length of the text after stripping HTML
 * @param suffix - Suffix to add when text is truncated (default: '...')
 * @returns Plain text string with HTML tags removed and truncated if necessary
 */
export const stripHtmlAndTruncate = (
  htmlString: string | null | undefined, 
  maxLength: number, 
  suffix: string = '...'
): string => {
  const plainText = stripHtmlTags(htmlString);
  return truncateText(plainText, maxLength, suffix);
};