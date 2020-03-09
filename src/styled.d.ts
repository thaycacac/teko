import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      reddishOrange: string;
      coolGrey: string;
      silver: string;
      tomato: string;
      darkGrey: string;
      paleGrey: string;
      white: string;
      black30: string;
      pumpkinOrange: string;
      deepSkyBlue: string;
    };
  }
}
