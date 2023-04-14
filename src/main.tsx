import { render } from "preact";
import { App } from "./app";
import { MantineProvider } from "@mantine/core";

render(
  <MantineProvider
    withNormalizeCSS
    withGlobalStyles
    theme={{
      colorScheme: "dark",
      globalStyles: (theme) => ({
        body: {
          margin: 0,
          fontSize: "20px",
          textAlign: "center",
          minWidth: "400px",
        },
      }),
    }}
  >
    <App />
  </MantineProvider>,
  document.getElementById("app") as HTMLElement
);
