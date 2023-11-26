import { Mermaid } from 'mermaid';

const mermaid: Mermaid = {
  contentLoaded: jest.fn(),
  detectType: jest.fn(),
  init: jest.fn(),
  initialize: jest.fn(),
  mermaidAPI: null,
  parse: jest.fn(),
  registerExternalDiagrams: jest.fn(),
  render: jest.fn(),
  run: jest.fn(),
  setParseErrorHandler: jest.fn(),
  startOnLoad: false,
  parseError: jest.fn(),
};

export default mermaid;
