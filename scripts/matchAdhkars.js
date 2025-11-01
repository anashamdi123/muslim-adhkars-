const fs = require('fs');
const path = require('path');

// Paths to the files
const adhkarsTsPath = path.join(__dirname, '..', 'constants', 'adhkars.ts');
const adhkarPath = path.join(__dirname, '..', 'constants', 'adhkar');

// Read the adhkar JSON file
const adhkarData = JSON.parse(fs.readFileSync(adhkarPath, 'utf8'));

// Read the TypeScript file
let tsContent = fs.readFileSync(adhkarsTsPath, 'utf8');

// Create a mapping of titles to adhkars from the JSON file
const titleToAdhkars = {};
adhkarData.forEach(category => {
  if (category.title && category.adhkars) {
    titleToAdhkars[category.title.trim()] = category.adhkars;
  }
});

// Find the ADHKARS_GROUPS array in the TypeScript file
const adhkarsGroupsMatch = tsContent.match(/export const ADHKARS_GROUPS: AdhkarCategory\[\] = (\[.*?\])(?=;)/s);

if (!adhkarsGroupsMatch) {
  console.error('Could not find ADHKARS_GROUPS array in the TypeScript file');
  process.exit(1);
}

// Extract the array content
const adhkarsGroupsStr = adhkarsGroupsMatch[1];

// Process each subcategory and update adhkars
let updatedTsContent = tsContent;

for (const [title, adhkars] of Object.entries(titleToAdhkars)) {
  // Create a regex pattern to find the subcategory with this title
  const titlePattern = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const subCatRegex = new RegExp(`(\{\s*id:\s*['"]\w+['"]\s*,\s*title:\s*['"]${titlePattern}['"][^}]*adhkars:\s*\[)([^\]]*)(\]\s*\})`, 's');
  
  // Create the new adhkars array content
  const newAdhkars = adhkars.map(adhkar => ({
    id: `'${adhkar.id}'`,
    text: adhkar.text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
    repetitions: adhkar.repetitions || 1
  }));
  
  const newAdhkarsStr = newAdhkars.map(adhkar => 
    `{ id: ${adhkar.id}, text: '${adhkar.text.replace(/'/g, "\\'")}', repetitions: ${adhkar.repetitions} }`
  ).join(',\n      ');
  
  // Replace the old adhkars with the new ones
  updatedTsContent = updatedTsContent.replace(
    subCatRegex,
    `$1
      ${newAdhkarsStr}
    $3`
  );
  
  console.log(`Updated adhkars for: ${title}`);
}

// Write the updated content back to the file
fs.writeFileSync(adhkarsTsPath, updatedTsContent, 'utf8');
console.log('Successfully updated adhkars.ts with matched adhkars');
