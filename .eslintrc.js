module.exports =	{
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:security/recommended',
    'plugin:xss/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    },
    {
      'files': ['*.js', '*.jsx', '*.ts', '*.tsx'],
      'processor': '@graphql-eslint/graphql'
    },
    {
      'files': ['*.graphql'],
      'extends': 'plugin:@graphql-eslint/operations-recommended',
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'jsx-a11y',
    'no-secrets',
    'no-unsanitized',
    'promise',
    'react',
    'security',
    'xss'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-secrets/no-secrets': [
      'error',
      'always',
      { 'tolerance': 6 }
    ],
    'no-unsanitized/method': 'error',
    'no-unsanitized/property': 'error'
  }
};
