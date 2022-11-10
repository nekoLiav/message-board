// I don't know exactly how this works, but it lets me load SVGs with typescript when I otherwise couldn't
// https://stackoverflow.com/questions/70554922/typescript-doesnt-recognise-declared-modules-svg-from-my-declaration-file

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}
declare module '*.png' {
  const value: any;
  export default value;
}
