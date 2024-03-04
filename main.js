const fs = require("fs").promises;
const path = require("path");

// Define the boundaries of Toronto
const latMin = process.env.LAT_MIN || 43.403221;
const latMax = process.env.LAT_MAX || 43.855401;
const longMin = process.env.LONG_MIN || -79.639319;
const longMax = process.env.LONG_MAX || -79.115819;

// File paths
const inputFilePath = path.resolve(process.env.INPUT_FILE || "data.json");
const outputFilePath = path.resolve(
  process.env.OUTPUT_FILE || "filteredData.json"
);

// Use a Set to store unique lat-long pairs
const uniqueLocations = new Set();

async function filterLocations() {
  try {
    // Read the data from the file
    const data = await fs.readFile(inputFilePath, "utf8");

    // Parse the JSON data
    const jsonData = JSON.parse(data);

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
    await fs.writeFile(outputFilePath, filteredDataString);

    console.log(`Filtered data written to ${outputFilePath}`);
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

filterLocations();
