#!/usr/bin/env node

const MaterialCustomizer = require('./docs/_assets/customizer.js');
const mc = new MaterialCustomizer();

const colors = mc.paletteIndices;
const shades = mc.lightnessIndices;

console.log('alias gulp="node_modules/.bin/gulp"');

function run (cmd) {
  cmd = cmd.replace(/\s\s+/g, ' ');
  console.log(`echo "${cmd}"`);
  console.log(cmd);
}

const asNumber = str => Number(str.replace(/\D/g, ''))

colors.forEach(primary =>
  colors.forEach(accent =>
    shades.forEach(normalShade =>
      shades.forEach(darkerShade =>
        shades.forEach(accentShade =>
          primary !== accent &&
          shades.indexOf(normalShade) < shades.indexOf(darkerShade) &&
          normalShade[0] !== 'A' &&
          darkerShade[0] !== 'A' &&
          asNumber(normalShade) > 200 &&
          asNumber(accentShade) > 200 &&
          run(`gulp styles:gen \
            --skip true \
            --primary '${primary}' \
            --accent '${accent}' \
            --normal-shade '${normalShade}' \
            --darker-shade '${darkerShade}' \
            --accent-shade '${accentShade}'`)
        )))))
