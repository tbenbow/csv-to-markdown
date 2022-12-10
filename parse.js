const fs = require('fs');
const csv = require('csv-parser');

function getAsYaml(csvRow) {
  let text = "---\n"
  for (const [key, value] of Object.entries(csvRow)) {
    text = text + `${key}: ${value}\n`
  }
  text = text + "---\n"
  return text
}

function removeBannedChars(string) {
  let sanitizedString = string
  const bannedChars = ["@", "?", "(", ")"]
  bannedChars.forEach(bannedChar => sanitizedString = sanitizedString.replace(bannedChar, ""))
  return sanitizedString
}

function slugify(string) {
  const lowerCaseString = string.toLowerCase()
  const sanitizedString = removeBannedChars(lowerCaseString)
  const trimmedString = sanitizedString.trimEnd();
  const dashedString = trimmedString.replace(/\s+/g, '-')
  return dashedString
}

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {
    const firstKey = Object.keys(data)[0]
    const name = slugify(data[firstKey])
    // create a new file for each row in the CSV file
    fs.writeFile(`out/${name}.md`, getAsYaml(data), (err) => {
      if (err) throw err;
      console.log(`File ${name}.txt created`);
    });
  })
  .on('end', () => {
    console.log('All files created');
  });
  