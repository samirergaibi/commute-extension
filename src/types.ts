export type Stop = {
  name: string;
  extId: string;
};

export type Settings = {
  firstStop?: Stop;
  secondStop?: Stop;
};
