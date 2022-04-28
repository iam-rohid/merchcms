import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 10);

export const getRandomCode = (length = 5): string => {
  return nanoid(length);
};
