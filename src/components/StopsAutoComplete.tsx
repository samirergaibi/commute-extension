import { useState, useEffect, StateUpdater } from "preact/hooks";
import { forwardRef } from "preact/compat";
import {
  Autocomplete,
  MantineColor,
  SelectItemProps,
  Text,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import { Stop } from "../types";

type StopResponse = {
  StopLocation: Stop;
};

type Props = {
  setValue: StateUpdater<Stop | undefined>;
  label: string;
};

const StopsAutoComplete = ({ setValue, label }: Props) => {
  const [autoCompleteValue, setAutoCompleteValue] = useState("");
  const [debounced] = useDebouncedValue(autoCompleteValue, 200);
  const [stops, setStops] = useState<Stop[]>([]);

  useEffect(() => {
    const getStations = async (stop: string) => {
      try {
        const resp = await fetch(
          `https://api.resrobot.se/v2.1/location.name?input=${stop}&format=json&accessId=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const data = await resp.json();
        const stops = data?.stopLocationOrCoordLocation
          ?.filter((stop: StopResponse) => !!stop.StopLocation)
          .map((stop: StopResponse) => ({
            name: stop?.StopLocation?.name,
            extId: stop?.StopLocation?.extId,
          }));
        setStops(stops);
      } catch (error) {
        throw new Error("Something went wrong getting the stop", {
          cause: error,
        });
      }
    };

    if (debounced?.length > 1) {
      getStations(debounced);
    }
  }, [debounced]);

  return (
    <Autocomplete
      label={label}
      data={stops}
      value={autoCompleteValue}
      onChange={setAutoCompleteValue}
      onItemSubmit={(item: Stop) => {
        setAutoCompleteValue(item?.name);
        setValue(item);
      }}
      itemComponent={AutoCompleteItem}
      filter={(value: string, item: Stop) =>
        item.name.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
};

export default StopsAutoComplete;

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  description: string;
  image: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ name, ...others }: ItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Text>{name}</Text>
      </div>
    );
  }
);
