import { SocketConnectionMiddleware, socketNok, socketOk } from "expresso-macchiato";
import { Equal } from "typeorm";
import { User } from "../db/models/user.model";
import { tokenInstance } from "../utils/token.utils";

export type SocketMiddlewareFinalMetadata = { userId:string, userName:string, userEmail:string }
export const authMiddleware:SocketConnectionMiddleware =  async (self, client, commId, metadata) =>
{
    if (!commId) return socketNok("Unauthorized");
    const { id } = await tokenInstance.authorize(commId)

    const user = await User.findOneBy({ id: Equal(id) });
    if (!user) return socketNok("User not found");

    return socketOk({ userId:user.id, userEmail:user.email, userName:user.name });
}
