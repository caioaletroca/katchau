module.exports = {
  // Array of strings using the glob syntax (https://www.npmjs.com/package/glob)
  input: [
    './src/app/**/*.@(jsx|tsx|js|ts)', 
    './src/components/**/*.@(jsx|tsx|js|ts)'
  ],
  // Output path for the generated files (default: './locales/$LOCALE/$NAMESPACE.json')
  output: './locales/$LOCALE/$NAMESPACE.json',
  // If keys inside json should be sorted
  sort: true,
  // If keys removed from code should be deleted automatically
  keepRemoved: false,
  // Default namespace used if not passed to useTranslation or in the translation key.
  defaultNS: "common",
  // Create default value from element
  defaultValue: (data) => data.options.default,
  // Indention used in json files (default: 2 spaces)
  indentation: 2
}