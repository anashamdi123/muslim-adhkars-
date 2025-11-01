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

// Process each category from JSON
Object.entries(titleToAdhkars).forEach(([title, adhkars]) => {
  // Escape the title for regex search
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Pattern to match: title: 'TITLE', ... adhkars: []
  const pattern = new RegExp(
    `(title:\\s*'${escapedTitle}',[^}]*adhkars:\\s*\\[)\\s*\\[\\s*\\]`,
    's'
  );
  
  const match = updatedContent.match(pattern);
  
  if (match) {
    // Found a match - replace the empty array
    const adhkarsStr = adhkars.map(formatAdhkar).join(',\n');
    const replacement = `${match[1]}
${adhkarsStr}
      ]`;
    
    updatedContent = updatedContent.replace(pattern, replacement);
    matchedCount++;
    console.log(`✓ Matched: ${title} (${adhkars.length} adhkars)`);
  } else {
    unmatched.push(title);
    unmatchedCount++;
  }
});

// Write the updated content
fs.writeFileSync('constants/adhkars.ts', updatedContent, 'utf8');

console.log(`\n✓ Successfully updated constants/adhkars.ts`);
console.log(`  Matched: ${matchedCount}, Unmatched: ${unmatchedCount}`);

if (unmatched.length > 0 && unmatched.length <= 20) {
  console.log(`\nFirst 20 unmatched titles:`);
  unmatched.slice(0, 20).forEach(title => console.log(`  - ${title}`));
}
