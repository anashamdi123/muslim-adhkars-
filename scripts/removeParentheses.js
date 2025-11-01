const fs = require('fs');
const path = require('path');

// Path to the adhkar file
const adhkarPath = path.join(__dirname, '..', 'constants', 'adhkar');

// Read the file
fs.readFile(adhkarPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const adhkarData = JSON.parse(data);
    
    // Process each adhkar entry
    const processedData = adhkarData.map(category => {
      if (category.adhkars && Array.isArray(category.adhkars)) {
        category.adhkars = category.adhkars.map(adhkar => {
          // Remove (( and )) from the text
          if (adhkar.text) {
            adhkar.text = adhkar.text.replace(/\(\s*\(/g, '').replace(/\)\s*\)/g, '');
          }
          return adhkar;
        });
      }
      return category;
    });

    // Write the processed data back to the file
    fs.writeFile(adhkarPath, JSON.stringify(processedData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('Successfully removed double parentheses from adhkar file');
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
