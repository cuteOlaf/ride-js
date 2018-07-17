#!/bin/bash
cd /opt/src
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
npm i
npm --no-git-tag-version version $VERSION
npm run build
npm run publish
rm .npmrc


