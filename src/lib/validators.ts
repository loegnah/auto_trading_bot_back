import { z } from "zod";

export const zNumericString = () =>
  z.string().refine((val) => !isNaN(Number(val)));
