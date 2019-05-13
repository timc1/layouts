// @ts-ignore
import interWoff2 from './Inter-Regular.woff2'
// @ts-ignore
import interWoff from './Inter-Regular.woff'
import { css } from '@emotion/core'

const globalStyles = css`
  @font-face {
    font-family: 'Inter';
    src: url(${interWoff2}) format('woff2'), url(${interWoff}) format('woff');
    font-weight: 100 700;
  }

  * {
    font: 17px 'Inter', system-ui, sans-serif;
    font-weight: 400;
    font-style: normal;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    -webkit-font-feature-settings: 'pnum';
    font-feature-settings: 'pnum';
    font-variant-numeric: proportional-nums;
  }

  body {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  ul,
  ol {
    margin: 0;
  }

  ul,
  ol {
    padding: 0;
  }

  a,
  button,
  input,
  textarea,
  select {
    -webkit-tap-highlight-color: transparent;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: #000;
    transition: background-color 100000000s;
  }
`

export default globalStyles
