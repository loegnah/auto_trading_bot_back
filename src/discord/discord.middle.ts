import { verifyKey } from "discord-interactions";
import { Elysia } from "elysia";
import { env } from "@/lib/env";

export const discordVerifier = new Elysia()
  .onBeforeHandle(async ({ headers, error, request }) => {
    const signature = headers["x-signature-ed25519"] || "";
    const timestamp = headers["x-signature-timestamp"] || "";
    const arrayBuffer = await Bun.readableStreamToArrayBuffer(request.body!);
    const rawBody = new Uint8Array(arrayBuffer);
    if (!rawBody) {
      return error(401);
    }
    const isValid = await verifyKey(
      rawBody as any,
      signature,
      timestamp,
      env.DISCORD_PUBLIC_KEY,
    );
    if (!isValid) {
      return error(401);
    }
  })
  .as("plugin");
