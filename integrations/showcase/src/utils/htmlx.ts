function h(type: string, props: any = [], ...children: any[]): HtmNode {
  return { type, props: props || {}, children: children || [] };
}
import htm from 'htm';

export const htmlx = htm.bind(h);

export function renderer(node: Node | string): string {
  if (node === null) {
    return 'null';
  }

  if (node === undefined) {
    return 'undefined';
  }

  if (typeof node === 'string') {
    return node;
  }

  const { type, propsString, children } = node;

  const childrenStr = children
    .map(child => renderer(child))
    .join('\n');

  return `<${type}${propsString}>${childrenStr}</${type}>`;
}

export function renderNode(node: HtmNode | string): string {
  if (typeof node === "string") {
    return node;
  }

  const { type, props, children } = node;

  const content = children.map((k, i) => {
    return renderNode(children[i]);
  });

  const properties = Object.keys(props).map((k) => {
    if (typeof props[k] === "boolean") {
      if (props[k] === false) {
        return `${k}="${props[k]}"`;
      } else {
        return `${k}`;
      }
    }

    return `${k}="${props[k]}"`;
  });

  return `<${type}${properties ? ' ' + properties : null}>${content}</${type}>`;
}
