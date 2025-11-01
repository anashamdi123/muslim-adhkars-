const fs = require('fs');

// Read both files
const adhkarData = JSON.parse(fs.readFileSync('constants/adhkar', 'utf8'));
let tsContent = fs.readFileSync('constants/adhkars.ts', 'utf8');

// Create a mapping of titles to adhkars from JSON
const titleToAdhkars = {};
adhkarData.forEach(category => {
  if (category.title && category.adhkars) {
    const title = category.title.trim();
    titleToAdhkars[title] = category.adhkars.map(adhkar => ({
      id: String(adhkar.id || ''),
      text: adhkar.text || '',
      repetitions: adhkar.repetitions || 1
    }));
  }
});

// Function to escape text for TypeScript strings
function escapeText(text) {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

// Function to format an adhkar object for TypeScript
function formatAdhkar(adhkar) {
  return `        {
          id: '${adhkar.id}',
          text: '${escapeText(adhkar.text)}',
          repetitions: ${adhkar.repetitions}
        }`;
}

// Process the TypeScript file - match by finding the exact title pattern
let updatedContent = tsContent;
let matchedCount = 0;
let unmatchedCount = 0;

Object.entries(titleToAdhkars).forEach(([title, adhkars]) => {
  // Find the exact position of this title in the file
  const titleSearchPattern = `title: '${title}'`;
  const titleIndex = updatedContent.indexOf(titleSearchPattern);
  
  if (titleIndex === -1) {
    unmatchedCount++;
    return;
  }
  
  // Find the adhkars array that follows this title
  // Look for "adhkars: []" or "adhkars:[]" after this title
  const afterTitle = updatedContent.substring(titleIndex);
  
  // Pattern to match: adhkars: [] (with optional whitespace)
  const adhkarsPattern = /adhkars:\s*\[\s*\]/;
  const adhkarsMatch = afterTitle.match(adhkarsPattern);
  
  if (!adhkarsMatch) {
    unmatchedCount++;
    return;
  }
  
  // Find the start and end positions of the adhkars array
  const adhkarsStartIndex = afterTitle.indexOf(adhkarsMatch[0]);
  const adhkarsStartInFile = titleIndex + adhkarsStartIndex;
  const adhkarsEndInFile = adhkarsStartInFile + adhkarsMatch[0].length;
  
  // Find where "adhkars:" starts
  const adhkarsColonIndex = updatedContent.lastIndexOf('adhkars:', adhkarsEndInFile);
  if (adhkarsColonIndex === -1 || adhkarsColonIndex < titleIndex) {
    unmatchedCount++;
    return;
  }
  
  // Build the replacement
  const adhkarsStr = adhkars.map(formatAdhkar).join(',\n');
  const replacement = `adhkars: [
${adhkarsStr}
      ]`;
  
  // Replace the adhkars: [] with the populated version
  const before = updatedContent.substring(0, adhkarsColonIndex);
  const after = updatedContent.substring(adhkarsEndInFile);
  updatedContent = before + replacement + after;
  
  matchedCount++;
  console.log(`✓ Matched: ${title}`);
});

// Write the updated content
fs.writeFileSync('constants/adhkars.ts', updatedContent, 'utf8');

console.log(`\n✓ Successfully updated constants/adhkars.ts`);
console.log(`  Matched: ${matchedCount}, Unmatched: ${unmatchedCount}`);
