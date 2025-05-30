import bodyParser from "body-parser";
import cors from "cors";
import { Starter, getCompiledPath } from "expresso-macchiato";
import { projectConfig } from "./_configs";
import { fileRouter } from "./routes/files.routes";
import { noteRoutes } from "./routes/notes.routes";
import { salesRouter } from "./routes/sales.routes";
import { testRoutes } from "./routes/test.routes";
import { userRouter } from "./routes/user.routes";
import { sayngHiService } from "./services/sayingHi.service";
import { devUserSocket } from "./sockets/devUser.socket";
import { tokenApiOptions, tokenInstance } from "./utils/token.utils";

const [entities, migrations] = getCompiledPath(__filename, __dirname, ['db/models/**/*', 'db/migrations/**/*']).map(x => [x])

new Starter({
	projectConfig,
	db: { entities, migrations },
	plugins: [cors(), bodyParser.json()],
	clientPath: "client",
    tokenOptions: { tokenInstance, api:tokenApiOptions },
	sockets: { wrappers: [devUserSocket], options: { cors: { allowedHeaders: ['*'] } } },
	backgroundServices: [ sayngHiService],
	routers:[
		userRouter,
		salesRouter,
		fileRouter,
		noteRoutes,
		testRoutes
	],
});
