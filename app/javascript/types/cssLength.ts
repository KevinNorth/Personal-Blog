export type CSSLength =
  | '0'
  // Absolute units
  | `${number}cm`
  | `${number}mm`
  | `${number}Q`
  | `${number}in`
  | `${number}pc`
  | `${number}pt`
  | `${number}px`
  // Relative units
  | `${number}em`
  | `${number}ex`
  | `${number}ch`
  | `${number}rem`
  | `${number}lh`
  | `${number}rlh`
  | `${number}vw`
  | `${number}vh`
  | `${number}vmin`
  | `${number}vmax`
  | `${number}vb`
  | `${number}vi`
  | `${number}svw`
  | `${number}svh`
  | `${number}lvw`
  | `${number}lvh`
  | `${number}dvw`
  | `${number}dvh`
  | `${number}%`;

export const cssLengthRegex = /^(0|(\d+(\.\d+)?(cm|mm|Q|in|pc|pt|px|em|ex|ch|rem|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|%)))$/;

export function isCSSLength(str: string): str is CSSLength {
  return cssLengthRegex.test(str);
}
