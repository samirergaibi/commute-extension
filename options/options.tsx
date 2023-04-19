import { render } from "preact";
import { MantineProvider } from "@mantine/core";

import { theme } from "../src/theme";
import Options from "../src/options";

render(
  <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
    <Options />
  </MantineProvider>,
  document.getElementById("app") as HTMLElement
);
