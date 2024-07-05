import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    --lime: hsl(61, 70%, 52%);
    --red: hsl(4, 69%, 50%);
    --white: hsl(0, 0%, 100%);
    --slate-100: hsl(202, 86%, 94%);
    --slate-300: hsl(203, 41%, 72%);
    --slate-500: hsl(200, 26%, 54%);
    --slate-700: hsl(200, 24%, 40%);
    --slate-900: hsl(202, 55%, 16%);
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Plus Jakarta Sans";
}

body {
    height: 100vh;
    width: 100%;
    background-color: var(--slate-100);
    display: grid;
    place-items: center;
}

#root {
    display: grid;
    place-items: center;
}

h1 {
    color: var(--slate-900);
    font-size: 24px;
    line-height: 36px;
    user-select: none;
}

h2 {
    color: var(--white);
}

p {
    font-size: 16px;
    color: var(--slate-300);
    text-align: center;
}

.underline {
    text-decoration: underline;
}

.line {
    width: 100%;
    height: 1px;
    background-color: var(--slate-700);
}
`;

export default GlobalStyles;
