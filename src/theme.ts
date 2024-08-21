import { lightTheme as thorinLightTheme, DefaultTheme as ThorinDefaultTheme } from '@ensdomains/thorin';
import { lightTheme, Theme } from '@rainbow-me/rainbowkit';
import 'styled-components';

type ExtendedTheme = typeof thorinLightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends ExtendedTheme {}
}

export const rainbowKitTheme: Theme = {
  ...lightTheme({
    accentColor: thorinLightTheme.colors.black,
    borderRadius: 'medium',
  }),
  fonts: {
    body: 'Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
};

export const thorinTheme: ThorinDefaultTheme = {
  ...thorinLightTheme,
  colors: {
    ...thorinLightTheme.colors,
    accent: thorinLightTheme.colors.black,
    accentSecondary: `rgba(${thorinLightTheme.accentsRaw.black}, ${thorinLightTheme.shades.accentSecondary})`,
    accentSecondaryHover: `rgba(${thorinLightTheme.accentsRaw.black}, ${thorinLightTheme.shades.accentSecondary})`,
    accentTertiary: `rgba(${thorinLightTheme.accentsRaw.black}, calc(${thorinLightTheme.shades.accentSecondary} * 0.5))`,
  },
};
