import { logger } from "@chneau/elysia-logger";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Elysia from "elysia";

dayjs.extend(utc);
dayjs.extend(timezone);

// async function runApp() {
//   const app = new Hono();

//   app.use(logger());

//   // await connectBybitWs();

//   app.route("/discord", discordRoute);
//   app.route("/coin", coinRoute);

//   return app;
// }

// export default await runApp();

new Elysia().use(logger()).listen(3000);
