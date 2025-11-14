const fs = require("fs");
const path = require("path");

const inputFile = path.join("output.jsonl");
const outputFile = path.join("public", "output.json");

const text = fs.readFileSync(inputFile, "utf-8");

const lines = text
    .split("\n")
    .filter(line => line.trim() !== "");

const jsonArray = lines.map(line => JSON.parse(line));

fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2));

console.log(`Converted ${jsonArray.length} items → ${outputFile}`);
