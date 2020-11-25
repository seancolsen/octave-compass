module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    "@snowpack/plugin-typescript",
    ["@snowpack/plugin-webpack"],
  ],
  installOptions: {
    externalPackage: [
    // ignore `import fs from 'fs'` etc.
    ...require('module').builtinModules,
    'js-yaml',
    ]
  }
};
