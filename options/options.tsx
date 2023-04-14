import { render } from "preact";
import { MantineProvider } from "@mantine/core";

import Options from "../src/options";

render(
  <MantineProvider
    withNormalizeCSS
    withGlobalStyles
    theme={{
      colorScheme: "dark",
    }}
  >
    <Options />
  </MantineProvider>,
  document.getElementById("app") as HTMLElement
);
