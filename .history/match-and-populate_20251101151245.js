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

console.log(`Found ${Object.keys(titleToAdhkars).length} categories in JSON file`);

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
const unmatched = [];

Object.entries(titleToAdhkars).forEach(([title, adhkars]) => {
  // Find the exact position of this title in the file
  const titleSearchPattern = `title: '${title}'`;
  const titleIndex = updatedContent.indexOf(titleSearchPattern);
  
  if (titleIndex === -1) {
    unmatched.push(title);
    return;
  }
  
  // Find the adhkars array that follows this title
  // Look ahead from the title to find "adhkars: []"
  const afterTitle = updatedContent.substring(titleIndex);
  
  // Pattern to match: adhkars: [] (with optional whitespace variations)
  const adhkarsPatterns = [
    /adhkars:\s*\[\s*\]/,  // adhkars: []
    /adhkars:\s*\[\]/,     // adhkars:[]
    /adhkars:\s*\[[\s\n]*\]/ // adhkars: [ ]
  ];
  
  let adhkarsMatch = null;
  let adhkarsPattern = null;
  
  for (const pattern of adhkarsPatterns) {
    const match = afterTitle.match(pattern);
    if (match && match.index !== undefined) {
      adhkarsMatch = match;
      adhkarsPattern = pattern;
      break;
    }
  }
  
  if (!adhkarsMatch || adhkarsMatch.index === undefined) {
    unmatched.push(title);
    return;
  }
  
  // Find the start and end positions of the adhkars array
  const adhkarsStartInFile = titleIndex + adhkarsMatch.index;
  const adhkarsEndInFile = adhkarsStartInFile + adhkarsMatch[0].length;
  
  // Build the replacement
  const adhkarsStr = adhkars.map(formatAdhkar).join(',\n');
  const replacement = `adhkars: [
${adhkarsStr}
      ]`;
  
  // Replace the adhkars: [] with the populated version
  const before = updatedContent.substring(0, adhkarsStartInFile);
  const after = updatedContent.substring(adhkarsEndInFile);
  updatedContent = before + replacement + after;
  
  matchedCount++;
  console.log(`✓ Matched: ${title} (${adhkars.length} adhkars)`);
});

// Write the updated content
fs.writeFileSync('constants/adhkars.ts', updatedContent, 'utf8');

console.log(`\n✓ Successfully updated constants/adhkars.ts`);
console.log(`  Matched: ${matchedCount}, Unmatched: ${unmatchedCount}`);

if (unmatched.length > 0 && unmatched.length <= 20) {
  console.log(`\nUnmatched titles:`);
  unmatched.forEach(title => console.log(`  - ${title}`));
}
