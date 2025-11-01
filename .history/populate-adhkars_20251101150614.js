const fs = require('fs');

// Read both files
const adhkarData = JSON.parse(fs.readFileSync('constants/adhkar', 'utf8'));
const tsContent = fs.readFileSync('constants/adhkars.ts', 'utf8');

// Create a mapping of titles to adhkars
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

// Function to format adhkar object for TypeScript
function formatAdhkar(adhkar) {
  // Escape backslashes and quotes in text
  let escapedText = adhkar.text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
  
  return `        {
          id: '${adhkar.id}',
          text: '${escapedText}',
          repetitions: ${adhkar.repetitions}
        }`;
}

// Process each title match
let updatedContent = tsContent;
let matchedCount = 0;
let unmatchedCount = 0;

Object.entries(titleToAdhkars).forEach(([title, adhkars]) => {
  // Escape special regex characters in title
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Pattern to match: title: '...', ... description: '...', adhkars: []
  // This pattern needs to handle optional description
  const pattern1 = new RegExp(
    `(title:\\s*['"]${escapedTitle}['"][^}]*adhkars:\\s*\\[)\\s*\\[\\s*\\]`,
    's'
  );
  
  // Alternative pattern without description
  const pattern2 = new RegExp(
    `(title:\\s*['"]${escapedTitle}['"][^}]*adhkars:\\s*\\[)\\s*\\[\\s*\\]`,
    's'
  );
  
  // Try both patterns
  let pattern = pattern1;
  if (!pattern.test(updatedContent)) {
    pattern = pattern2;
  }
  
  if (pattern.test(updatedContent)) {
    const adhkarsStr = adhkars.map(formatAdhkar).join(',\n');
    
    const replacement = `$1
${adhkarsStr}
      ]`;
    
    updatedContent = updatedContent.replace(pattern, replacement);
    matchedCount++;
    console.log(`✓ Matched: ${title}`);
  } else {
    unmatchedCount++;
    // Try to find similar titles for debugging
    const similarTitle = Object.keys(titleToAdhkars).find(t => 
      t.includes(title.substring(0, 10)) || title.includes(t.substring(0, 10))
    );
    if (similarTitle && similarTitle !== title) {
      console.log(`✗ Not found: ${title} (similar: ${similarTitle})`);
    } else {
      console.log(`✗ Not found: ${title}`);
    }
  }
});

// Write updated content
fs.writeFileSync('constants/adhkars.ts', updatedContent, 'utf8');
console.log(`\n✓ Successfully updated constants/adhkars.ts`);
console.log(`  Matched: ${matchedCount}, Unmatched: ${unmatchedCount}`);
