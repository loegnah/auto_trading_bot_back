import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const formValidator = (schema: Record<string, any>) =>
  zValidator("form", z.object(schema));
