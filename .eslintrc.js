const fs = require('fs');

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  "extends": ["standard", "prettier"],
  "env": {
    "jest": true
  },
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ['error', prettierOptions],
  }
}