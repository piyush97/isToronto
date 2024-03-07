// Import the necessary modules
const fs = require("fs").promises;
const path = require("path");

// Define the boundaries of Toronto using environment variables or default values
const latMin = process.env.LAT_MIN || 43.403221;
const latMax = process.env.LAT_MAX || 43.855401;
const longMin = process.env.LONG_MIN || -79.639319;
const longMax = process.env.LONG_MAX || -79.115819;

// Define the input and output file paths using environment variables or default values
const inputFilePath = path.resolve(process.env.INPUT_FILE || "data.json");
const outputFilePath = path.resolve(
  process.env.OUTPUT_FILE || "filteredData.json"
);

// Initialize a Set to store unique lat-long pairs
const uniqueLocations = new Set();

/**
 * Main function to filter the locations in the input file
 *
 */
async function filterLocations() {
  try {
    // Read the data from the input file
    const data = await fs.readFile(inputFilePath, "utf8");

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Filter the data to only include locations inside Toronto
    const filteredData = jsonData
      .filter(
        (item) =>
          // Check if the location is within the defined boundaries
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
      .map((item) =>
        // Return a new object with only the latitude and longitude
        ({
          name: item.descr,
          latitude: item.latitude,
          longitude: item.longitude,
        })
      );

    // Stringify the filtered data
    const filteredDataString = JSON.stringify(filteredData, null, 2);

    // Write the filtered data to the output file
    await fs.writeFile(outputFilePath, filteredDataString);

    // Log a success message
    console.log(`Filtered data written to ${outputFilePath}`);
  } catch (error) {
    // Log any errors that occur
    console.error(`An error occurred: ${error.message}`);
  }
}

// Call the main function
filterLocations();
