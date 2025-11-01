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
      id: adhkar.id || '',
      text: adhkar.text || '',
      repetitions: adhkar.repetitions || 1
    }));
  }
});

// Function to escape text for TypeScript strings
function escapeText(text) {
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

// Process the TypeScript file - match by title and replace empty adhkars arrays
let updatedContent = tsContent;
let matchedCount = 0;
let unmatchedCount = 0;
const unmatchedTitles = [];

Object.entries(titleToAdhkars).forEach(([title, adhkars]) => {
  // Find the pattern: title: '...', followed by adhkars: []
  // We need to escape the title for regex
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Pattern to match: title: 'TITLE', ... adhkars: []
  // This needs to handle optional whitespace and the fact that title might be followed by adhkars
  const pattern = new RegExp(
    `(title:\\s*'${escapedTitle}',[^}]*adhkars:\\s*\\[)\\s*\\[\\s*\\]`,
    's'
  );
  
  const match = updatedContent.match(pattern);
  
  if (match) {
    // Found a match - replace the empty array with the populated one
    const adhkarsStr = adhkars.map(formatAdhkar).join(',\n');
    const replacement = `$1
${adhkarsStr}
      ]`;
    
    updatedContent = updatedContent.replace(pattern, replacement);
    matchedCount++;
    console.log(`✓ Matched: ${title}`);
  } else {
    unmatchedCount++;
    unmatchedTitles.push(title);
    console.log(`✗ Not found: ${title}`);
  }
});

// Write the updated content
fs.writeFileSync('constants/adhkars.ts', updatedContent, 'utf8');

console.log(`\n✓ Successfully updated constants/adhkars.ts`);
console.log(`  Matched: ${matchedCount}, Unmatched: ${unmatchedCount}`);

if (unmatchedCount > 0) {
  console.log(`\nUnmatched titles (${unmatchedCount}):`);
  unmatchedTitles.slice(0, 10).forEach(title => console.log(`  - ${title}`));
  if (unmatchedTitles.length > 10) {
    console.log(`  ... and ${unmatchedTitles.length - 10} more`);
  }
}

