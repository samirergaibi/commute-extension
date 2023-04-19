import { JSX } from "preact";
import { useState } from "preact/hooks";
import { Container, Button, Notification } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import StopsAutoComplete from "./components/StopsAutoComplete";
import { Stop, Settings } from "./types";

const Options = () => {
  const [firstStop, setFirstStop] = useState<Stop>();
  const [secondStop, setSecondStop] = useState<Stop>();
  const [savedSettings, setSavedSettings] = useState<Settings>();

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    if (chrome?.storage?.sync?.set) {
      chrome.storage.sync.set({ firstStop, secondStop }, () => {
        setSavedSettings({ firstStop, secondStop });
      });
    }
  };

  return (
    <Container p={40}>
      <h1>Settings!</h1>
      <p>Set the stations that you wish to see when opening the extension.</p>

      <form onSubmit={handleSubmit}>
        <StopsAutoComplete label="First stop" setValue={setFirstStop} />
        <StopsAutoComplete label="Second stop" setValue={setSecondStop} />
        <Button mt="sm" type="submit">
          Save
        </Button>
      </form>
      {!!savedSettings && (
        <Notification
          icon={<IconCheck size="1.2rem" />}
          withCloseButton={false}
          color="green"
          title="🎉 Wohoo!"
          mt="md"
        >
          Your new settings have been saved!
        </Notification>
      )}
    </Container>
  );
};

export default Options;
