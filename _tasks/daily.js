const fs = require('fs');
const path = require('path');

const date = new Date().toISOString().split('T')[0];

const contents = `---
title: 
date: '${date} 00:00:00'
---

All the best,

-- Jim
`;

const filename = `${date.replace(/\-/g, '')}.md`;
const filepath = path.resolve(__dirname, '..', '_list', filename);

fs.writeFile(filepath, contents, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Created file ${filename}`);
    process.exit(0);
  }
});
