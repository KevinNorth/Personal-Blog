module.exports = {
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^react', '^@.*', '<THIRD_PARTY_MODULES>', '.*'],
  importOrderCaseInsensitive: true,
  importOrderGroupNamespaceSpecifiers: false,
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  jsxQuotes: false,
  trailingComma: 'es5',
  tabWidth: 2,
  tabs: false,
  semi: true,
  singleQuote: true,
};
