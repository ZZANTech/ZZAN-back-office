declare module "dayjs/plugin/utc";
declare module "dayjs/plugin/timezone";

import { PluginFunc } from "dayjs";

declare module "dayjs" {
  export function extend(plugin: PluginFunc, option?: any): Dayjs;

  export function tz(timezone: string, keepLocalTime?: boolean): Dayjs;

  interface Dayjs {
    tz(timezone: string): Dayjs;
    utc(): Dayjs;
  }
}
