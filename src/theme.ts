import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  colorScheme: "dark",
  globalStyles: (theme) => ({
    body: {
      margin: 0,
      fontSize: "20px",
      textAlign: "center",
      minWidth: "400px",
    },
  }),
};
