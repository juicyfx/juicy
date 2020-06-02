declare module 'htm';
declare module 'htmldom';

interface Node {
  type: string,
  propsString: [],
  children: Node[]
}

interface HtmNode {
  type: string,
  props: { [key: string]: any },
  children: HtmNode[]
}
