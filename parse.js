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

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {
    const firstKey = Object.keys(data)[0]
    const name = data[firstKey]
    // create a new file for each row in the CSV file
    fs.writeFile(`${name}.md`, getAsYaml(data), (err) => {
      if (err) throw err;
      console.log(`File ${name}.txt created`);
    });
  })
  .on('end', () => {
    console.log('All files created');
  });
  