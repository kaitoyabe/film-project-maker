// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (value: any) =>
  value !== null && !Array.isArray(value) && typeof value === "object";
