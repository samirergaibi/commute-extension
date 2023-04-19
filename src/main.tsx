import { render } from "preact";
import { MantineProvider } from "@mantine/core";

import { theme } from "./theme";
import { App } from "./app";

render(
  <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
    <App />
  </MantineProvider>,
  document.getElementById("app") as HTMLElement
);
