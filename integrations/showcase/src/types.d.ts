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

declare module 'htm';
