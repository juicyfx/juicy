import { NowRequest, NowResponse } from '@now/node';
import tinycolor from 'tinycolor2';
import htm from 'htm';
import vhtml from 'vhtml';

const DEFAULT_COLORS = [
  { title: 'Red', color: '#f44336' },
  { title: 'Pink', color: '#e91e63' },
  { title: 'Purple', color: '#9c27b0' },
  { title: 'Deep Purple', color: '#673ab7' },
  { title: 'Indigo', color: '#3f51b5' },
  { title: 'Blue', color: '#2196f3' },
  { title: 'Light Blue', color: '#03a9f4' },
  { title: 'Cyan', color: '#00bcd4' },
  { title: 'Teal', color: '#009688' },
  { title: 'Green', color: '#4caf50' },
  { title: 'Light Green', color: '#8bc34a' },
  { title: 'Lime', color: '#cddc39' },
  { title: 'Yellow', color: '#ffeb3b' },
  { title: 'Amber', color: '#ffc107' },
  { title: 'Orange', color: '#ff9800' },
  { title: 'Deep Orange', color: '#ff5722' },
  { title: 'Brown', color: '#795548' },
  { title: 'Grey', color: '#9e9e9e' },
  { title: 'Blue Grey', color: '#607d8b' },
];

const DEFAULT_CONTRASTS = [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30];

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  const html = htm.bind(vhtml);
  const output = html`
    <div class="app">
      <h1>Coloring</h1>
      ${coloring().map(group => html`
      <ul>
        <h2>${group.color}</h2>
        ${group.colors.map(color => html`
          <li>
            <div style="background: ${color.color}; color: ${color.isLight ? 'black' : 'white'}; padding: 5px;">
              ${color.color}
            </div>
          </li>
        `)}
      </ul>
      `)}

      <h2>Lights</h2>
      <pre><code>${JSON.stringify(dumpLight(), null, 2)}</code></pre>
    </div>
  `;

  res.end(output);
}

function coloring(): ColorGroup[] {
  return DEFAULT_COLORS.map(({ color, title }) => {
    const group = DEFAULT_CONTRASTS.map(contrast => {
      let newcolor = tinycolor(color);

      if (contrast < 0) {
        newcolor = tinycolor(color).lighten(Math.abs(contrast));
      } else if (contrast > 0) {
        newcolor = tinycolor(color).darken(contrast);
      }

      return {
        original: color,
        color: newcolor.toString(),
        isLight: newcolor.isLight(),
      };
    });

    return {
      color: title,
      colors: group,
    };
  });
}

function dumpLight(): object {
  return coloring()
    .reduce<string[]>((accumulator, group) => {
      const colors = group.colors
        .filter(color => color.isLight)
        .map(color => color.color);

      return accumulator.concat(colors);
    }, []);
}
