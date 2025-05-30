import { BackgroundService, sleep } from 'expresso-macchiato';
import { Like } from "typeorm";
import { User } from '../db/models/user.model';
import { devUserSocket } from '../sockets/devUser.socket';

export const sayngHiService = new BackgroundService({
    name: 'sayngHi',
    main: async () =>
    {
        let counter:number = 0;

        while (true)
        {
            if (counter % 5 === 0)
            {
                const devUser = await User.findBy({ name: Like('%dev%') });
                for (const user of devUser)
                {
                    const connectedCLients = Array.from(devUserSocket.getConnectedSockets().keys());
                    if (connectedCLients.includes(user.id))
                    {
                        devUserSocket.sendToClient(
                            user.id,
                            "sayingStuff",
                            { message: `Hello ${user.name}, your name contains 'dev' and the counter is a multiple of five, this is a test message #${counter}` }
                        );
                    }
                }
            }

            devUserSocket.broadcast("sayingStuff", { message: `This is a test message #${counter}` });
            counter++;
            await sleep(2000);
        }
    }
});
