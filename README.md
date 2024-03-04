# Toronto Location Filter

This script reads a JSON file containing data about locations and filters it to only include locations within the boundaries of Toronto. It then writes the filtered data to a new JSON file.

## How it works

The script uses Node.js's built-in `fs` module to read and write files. It reads the data from a file named `data.json`, parses it into a JavaScript object, and then filters it based on the latitude and longitude of each location.

The boundaries of Toronto are defined as follows:

- Minimum latitude: 43.403221
- Maximum latitude: 43.855401
- Minimum longitude: -79.639319
- Maximum longitude: -79.115819

The script filters out any locations that are outside these boundaries. It also filters out any duplicate locations, based on their latitude and longitude.

Finally, the script writes the filtered data to a new file named `filteredData.json`.

## How to use

1. Ensure that you have Node.js installed on your machine.
2. Place your input data in a file named `data.json` in the same directory as the script. The data should be a JSON array of objects, where each object has `latitude` and `longitude` properties.
3. Run the script with the command `node main.js`.
4. The filtered data will be written to a file named `filteredData.json`.

## Customization

You can modify the script according to your needs. For example, you can change the input file name, the output file name, and the boundaries of Toronto. You can also modify the filtering logic to include or exclude locations based on different criteria.
