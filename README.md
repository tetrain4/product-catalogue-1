- Product Catalog
A simple React app that displays a product catalog from a JSON file with search, sortable columns, and pagination.

- Features
Deep search across all product fields, including nested fields
Clickable column headers to sort ascending/descending
Pagination with next/previous buttons and page indicator
JSONL → JSON conversion script included

Project Structure
src/
  App.jsx          # Main logic
  App.css          # Styles
  components/
    ProductTable.jsx
    Pagination.jsx
public/
  output.json      # Data loaded by the app
convert-jsonl.js   # JSONL → JSON converter

Setup & Run
npm install
node convert-jsonl.js   # convert data if needed
npm run dev             # start development server

Open the app at link provided after running "npm run dev"
