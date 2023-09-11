/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import dayjs from "dayjs";

import { isObject } from "./checkObject";

const dateFieldSuffixes = [
  "Date",
  "DateFrom",
  "DateTo",
  "DateStart1",
  "DateStart2",
  "DateEnd1",
  "DateEnd2",
];

const dateTimeFieldSuffixes = ["At", "AtFrom", "PeriodStart", "PeriodEnd"];

const dateTimeToFieldSuffixes = ["AtTo"];

const dateAndDateTimeFieldSuffixes = [
  ...dateFieldSuffixes,
  ...dateTimeFieldSuffixes,
  ...dateTimeToFieldSuffixes,
];

export const transformStringToDate = <T>(object: T) => {
  if (object == null) return object;

  const obj = object as any;
  Object.keys(obj).forEach((key) => {
    if (isObject(obj[key])) {
      obj[key] = transformStringToDate(obj[key]);
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map(transformStringToDate);
    } else if (
      obj[key] &&
      typeof obj[key] === "string" &&
      dateAndDateTimeFieldSuffixes.findIndex((s) => key.endsWith(s)) >= 0
    ) {
      obj[key] = dayjs(obj[key]).toDate();
    }
  });

  return obj as T;
};

export const transformDateToString = <T>(object: T) => {
  if (object == null) return object;

  const obj = object as any;
  Object.keys(obj).forEach((key) => {
    if (isObject(obj[key])) {
      if (dateFieldSuffixes.findIndex((s) => key.endsWith(s)) >= 0) {
        obj[key] = dayjs(obj[key]).format("YYYY-MM-DD");
      } else if (dateTimeFieldSuffixes.findIndex((s) => key.endsWith(s)) >= 0) {
        obj[key] = dayjs(obj[key]).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      } else if (
        dateTimeToFieldSuffixes.findIndex((s) => key.endsWith(s)) >= 0
      ) {
        obj[key] = dayjs(obj[key]).format("YYYY-MM-DDTHH:mm:59.999Z");
      } else {
        obj[key] = transformDateToString(obj[key]);
      }
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map(transformDateToString);
    }
  });

  return obj as T;
};
