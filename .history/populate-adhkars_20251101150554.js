const fs = require('fs');
const path = require('path');

// Read both files
const adhkarData = JSON.parse(fs.readFileSync('constants/adhkar', 'utf8'));
const tsContent = fs.readFileSync('constants/adhkars.ts', 'utf8');

// Create a mapping of titles to adhkars
const titleToAdhkars = {};
adhkarData.forEach(category => {
  if (category.title && category.adhkars) {
    titleToAdhkars[category.title.trim()] = category.adhkars.map(adhkar => ({
      id: adhkar.id || '',
      text: adhkar.text || '',
      repetitions: adhkar.repetitions || 1
    }));
  }
});

// Function to escape regex special characters
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Replace each empty adhkars array with matched data
let updatedContent = tsContent;

Object.entries(titleToAdhkars).forEach(([title, adhkars]) => {
  const escapedTitle = escapeRegex(title);
  
  // Pattern to match: title: '...', ... adhkars: []
  const pattern = new RegExp(
    `(title:\\s*['"]${escapedTitle}['"][^}]*adhkars:\\s*\\[)\\s*\\[\\s*\\]`,
    's'
  );
  
  if (pattern.test(updatedContent)) {
    // Format adhkars array
    const adhkarsStr = adhkars.map(adhkar => {
      // Escape quotes in text
      const escapedText = adhkar.text.replace(/'/g, "\\'").replace(/"/g, '\\"');
      return `        {
          id: '${adhkar.id}',
          text: '${escapedText}',
          repetitions: ${adhkar.repetitions}
        }`;
    }).join(',\n');
    
    const replacement = `$1
${adhkarsStr}
      ]`;
    
    updatedContent = updatedContent.replace(pattern, replacement);
    console.log(`✓ Matched: ${title}`);
  } else {
    console.log(`✗ Not found: ${title}`);
  }
});

// Write updated content
fs.writeFileSync('constants/adhkars.ts', updatedContent, 'utf8');
console.log('\n✓ Successfully updated constants/adhkars.ts');

