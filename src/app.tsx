import { useState, useEffect } from "preact/hooks";
import { Image, Anchor } from "@mantine/core";

import Time from "./components/Time";
import { Settings } from "./types";
import subwayImg2 from "./images/subway.jpeg";

export function App() {
  const [settings, setSettings] = useState<Settings>();

  useEffect(() => {
    if (import.meta.env.DEV) {
      setSettings({
        firstStop: {
          extId: "740021673",
          name: "Rådmansgatan (this text is never used)",
        },
        secondStop: {
          extId: "740000001",
          name: "Medborgarplatsen (this text is never used)",
        },
      });
    }

    const getSettings = async () => {
      if (chrome?.storage?.sync) {
        const settings = await chrome.storage.sync.get(null);
        setSettings(settings as any);
      }
    };
    getSettings();
  }, []);

  const { firstStop, secondStop } = settings ?? {};

  if (!firstStop || !secondStop) {
    return (
      <div>
        <p>
          To use this application you need to add two stops to your settings!
        </p>
        <Anchor href="/options/">Go to settings</Anchor>
      </div>
    );
  }

  return (
    <>
      <Image height={200} src={subwayImg2} />
      <Time firstStop={firstStop} secondStop={secondStop} />
    </>
  );
}
