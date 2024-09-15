import { z } from "zod";

export const zNumericString = () =>
  z.string().refine((val) => !isNaN(Number(val)));

export const zBoolean = () =>
  z.coerce.string().transform((val) => val === "true");
