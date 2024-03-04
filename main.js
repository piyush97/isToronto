// Description: This script reads a JSON file containing data about locations and filters it to only include locations within the boundaries of Toronto. It then writes the filtered data to a new JSON file.

// You can modify it according to your needs
// For example, you can change the input file name, the output file name, and the boundaries of Toronto.
// You can also modify the filtering logic to include or exclude locations based on different criteria.
const fs = require("fs");

// Read the data from the file
const data = fs.readFileSync("data.json", "utf8");

// Parse the JSON data
const jsonData = JSON.parse(data);

// Define the boundaries of Toronto
const latMin = 43.403221,
  latMax = 43.855401,
  longMin = -79.639319,
  longMax = -79.115819;

// Use a Set to store unique lat-long pairs
const uniqueLocations = new Set();

// Filter the data to only include locations inside Toronto
const filteredData = jsonData
  .filter(
    (item) =>
      item.latitude >= latMin &&
      item.latitude <= latMax &&
      item.longitude >= longMin &&
      item.longitude <= longMax
  )
  .filter((item) => {
    // Create a string representation of the lat-long pair
    const key = `${item.latitude},${item.longitude}`;

    // If the Set already contains this key, return false to filter it out
    if (uniqueLocations.has(key)) {
      return false;
    }

    // Otherwise, add the key to the Set and return true to keep this item
    uniqueLocations.add(key);
    return true;
  })
  .map((item) => ({ latitude: item.latitude, longitude: item.longitude })); // map to new object with only lat and long

// Stringify the filtered data
const filteredDataString = JSON.stringify(filteredData, null, 2);

// Write the filtered data to a new JSON file
fs.writeFileSync("filteredData.json", filteredDataString);
