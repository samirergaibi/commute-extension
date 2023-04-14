import { useState, useEffect } from "preact/hooks";

import classes from "./Time.module.css";
import Spinner from "./Spinner";
import { Stop } from "../types";

type TripData = {
  date: string;
  name: string;
  prognosisType: string;
  time: string;
};

type Trip = {
  Origin: TripData;
  Destination: TripData;
};

type Response = {
  Trip: Trip[];
};

type Props = {
  firstStop: Stop;
  secondStop: Stop;
};

const createTripUrl = (from: string, to: string) => {
  return `https://api.resrobot.se/v2.1/trip?format=json&originId=${from}&destId=${to}&passlist=true&showPassingPoints=true&accessId=${
    import.meta.env.VITE_API_KEY
  }`;
};

const TimeTable = ({ firstStop, secondStop }: Props) => {
  const [loading, setLoading] = useState(true);
  const [primaryTrip, setPrimaryTrip] = useState<Response>();
  const [secondTrip, setSecondTrip] = useState<Response>();
  const [tripIndex, setTripIndex] = useState(0);

  useEffect(() => {
    const getTrips = async () => {
      try {
        setLoading(true);
        const primaryTripRes = fetch(
          createTripUrl(firstStop.extId, secondStop.extId)
        );
        const secondTripRes = fetch(
          createTripUrl(secondStop.extId, firstStop.extId)
        );
        const responses = await Promise.all([primaryTripRes, secondTripRes]);
        const [primaryTripData, secondTripData] = await Promise.all(
          responses.map((res) => res.json())
        );

        setPrimaryTrip(primaryTripData);
        setSecondTrip(secondTripData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error("Something went wrong fetching the trips", {
          cause: error,
        });
      }
    };
    getTrips();
  }, []);

  if (loading) {
    return (
      <div className={classes.wrapper}>
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  }

  const shortenStr = (str?: string) => {
    return str
      ?.split(" (")[0]
      .replace("T-bana", "")
      .replace("station", "")
      .trim();
  };
  const primaryItem = {
    origin: primaryTrip?.Trip?.[tripIndex]?.Origin?.time,
    originName: shortenStr(primaryTrip?.Trip?.[tripIndex]?.Origin?.name),
    destination: primaryTrip?.Trip?.[tripIndex]?.Destination?.time,
    destinationName: shortenStr(
      primaryTrip?.Trip?.[tripIndex]?.Destination?.name
    ),
  };

  const secondItem = {
    origin: secondTrip?.Trip?.[tripIndex]?.Origin?.time,
    originName: shortenStr(secondTrip?.Trip?.[tripIndex]?.Origin?.name),
    destination: secondTrip?.Trip?.[tripIndex]?.Destination?.time,
    destinationName: shortenStr(
      secondTrip?.Trip?.[tripIndex]?.Destination?.name
    ),
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.innerWrapper}>
        <TimeTableItem item={primaryItem} />
        <div className={classes.separator} />
        <TimeTableItem item={secondItem} />
      </div>
      <button
        className={classes.button}
        disabled={tripIndex === 0}
        onClick={() => setTripIndex(tripIndex - 1)}
      >
        Föregående
      </button>
      <button
        className={classes.button}
        disabled={tripIndex === 4}
        onClick={() => setTripIndex(tripIndex + 1)}
      >
        Nästa
      </button>
    </div>
  );
};

export default TimeTable;

type TimeTable = {
  origin?: string;
  originName?: string;
  destination?: string;
  destinationName?: string;
};

type TimeTableItemProps = {
  item: TimeTable;
};

const formatTime = (time: string) => time.replace(":00", "");

const TimeTableItem = ({ item }: TimeTableItemProps) => {
  const { destination, destinationName, origin, originName } = item;

  if (!origin || !destination) {
    return null;
  }
  formatTime(origin);

  return (
    <div className={classes.timeWrapper}>
      <div className={classes.timeItemWrapper}>
        <strong className={classes.something}>{originName}</strong>
        <p>{formatTime(origin)}</p>
      </div>
      <p className={classes.arrow}>→</p>
      <div className={classes.timeItemWrapper}>
        <strong>{destinationName}</strong>
        <p>{formatTime(destination)}</p>
      </div>
    </div>
  );
};
