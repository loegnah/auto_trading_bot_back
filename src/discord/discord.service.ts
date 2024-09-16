import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import { env } from "@/lib/env";

export class DiscordService {
  async verify({ headers, body }: { headers: any; body: any }) {
    const signature = headers["x-signature-ed25519"] || "";
    const timestamp = headers["x-signature-timestamp"] || "";
    return await verifyKey(
      JSON.stringify(body),
      signature,
      timestamp,
      env.DISCORD_PUBLIC_KEY,
    );
  }

  interaction(body: any) {
    const { type } = body;
    if (type === InteractionType.PING) {
      return this.handlePingPong();
    }
    if (type === InteractionType.APPLICATION_COMMAND) {
      return this.handleApplicationCommand(body);
    }
  }

  private handlePingPong() {
    return { type: InteractionResponseType.PONG };
  }

  private handleApplicationCommand(body: any) {
    const { data } = body;
    console.log(data);
    return { msg: "ok" };
  }
}
