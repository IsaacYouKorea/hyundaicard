const fs = require('fs');
const mockRawData = require('./index.json');

function travel(array) {
  const result = [];
  for(const data of array) {
    result.push(deepen(data));
  }
  return JSON.stringify({data: result});
}

function deepen(obj) {
  const result = {};

  // For each object path (property key) in the object
  for (const objectPath in obj) {
    // Split path into component parts
    if(objectPath[0] === '_') continue;
    const parts = objectPath.split('.');

    // Create sub-objects along path as needed
    let target = result;
    while (parts.length > 1) {
      const part = parts.shift();
      target = target[part] = target[part] || {};
    }

    // Set value at end of path
    target[parts[0]] = obj[objectPath]
  }

  return result;
}

fs.writeFileSync('mockdata/mock.json', travel(mockRawData), {encoding:'utf8',flag:'w'});