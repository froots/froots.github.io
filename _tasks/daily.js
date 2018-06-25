const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const dayOffset = Number(process.argv[2] || 0);

let d = new Date();
d.setDate(d.getDate() + dayOffset);

const date = d.toISOString().split('T')[0];

const contents = `---
title: 
date: '${date} 00:00:00'
---

All the best,

-- Jim
`;

const filename = `${date.replace(/\-/g, '')}.md`;
const filepath = path.resolve(__dirname, '..', '_list', filename);

exec(`git checkout -b email-${date.replace(/\-/g, '')}`, function(e) {
  if (e) {
    console.error(e);
  }

  fs.writeFile(filepath, contents, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Created file ${filename}`);
      process.exit(0);
    }
  });
});
