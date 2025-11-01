const fs = require('fs');

// Read both files
const adhkarData = JSON.parse(fs.readFileSync('constants/adhkar', 'utf8'));
let tsContent = fs.readFileSync('constants/adhkars.ts', 'utf8');

// Create a mapping of titles to adhkars (normalize titles)
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
  // Escape text properly for JavaScript/TypeScript strings
  let escapedText = adhkar.text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
  
  return `{
          id: '${adhkar.id}',
          text: '${escapedText}',
          repetitions: ${adhkar.repetitions}
        }`;
}

// Process each match - use a simpler approach with split and replace
let updatedContent = tsContent;
let matchedCount = 0;

Object.entries(titleToAdhkars).forEach(([title, adhkars]) => {
  // Find the position in the file where this title appears
  const titlePattern = `title: '${title}'`;
  const titleIndex = updatedContent.indexOf(titlePattern);
  
  if (titleIndex === -1) {
    console.log(`✗ Not found: ${title}`);
    return;
  }
  
  // Find the adhkars: [] that follows this title
  // Look for the pattern: adhkars: [] or adhkars:[]
  const afterTitle = updatedContent.substring(titleIndex);
  const adhkarsPattern = /adhkars:\s*\[\s*\]/;
  const match = afterTitle.match(adhkarsPattern);
  
  if (!match) {
    console.log(`✗ Could not find empty adhkars array for: ${title}`);
    return;
  }
  
  // Find the full match including where it starts
  const matchIndex = afterTitle.indexOf(match[0]);
  const fullMatchIndex = titleIndex + matchIndex;
  const matchEndIndex = fullMatchIndex + match[0].length;
  
  // Create replacement
  const adhkarsStr = adhkars.map(formatAdhkar).join(',\n      ');
  const replacement = `adhkars: [
      ${adhkarsStr}
      ]`;
  
  // Replace in the content
  const before = updatedContent.substring(0, fullMatchIndex);
  const after = updatedContent.substring(matchEndIndex);
  
  // Find where "adhkars:" starts
  const adhkarsStartIndex = before.lastIndexOf('adhkars:');
  if (adhkarsStartIndex === -1) {
    console.log(`✗ Could not find adhkars: start for: ${title}`);
    return;
  }
  
  // Reconstruct with replacement
  updatedContent = updatedContent.substring(0, adhkarsStartIndex) + 
                   replacement + 
                   updatedContent.substring(matchEndIndex);
  
  matchedCount++;
  console.log(`✓ Matched: ${title}`);
});

// Write updated content
fs.writeFileSync('constants/adhkars.ts', updatedContent, 'utf8');
console.log(`\n✓ Successfully updated constants/adhkars.ts`);
console.log(`  Matched: ${matchedCount}, Total categories: ${Object.keys(titleToAdhkars).length}`);
