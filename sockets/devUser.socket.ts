import { SocketWrapper } from "expresso-macchiato";
import { authMiddleware, SocketMiddlewareFinalMetadata } from "./_middlewares.socket";

export const devUserSocket = new SocketWrapper<SocketMiddlewareFinalMetadata>({
    socketNamespace: "devUser",
    clientConnectionKey: "userId",
    connectionMiddleware:authMiddleware,
    listeners:
    {
        "sayStuff": async (self, _, metadata:SocketMiddlewareFinalMetadata, otherText:string) =>
        {
            self.broadcastExceptClient(metadata.userId, "sayingStuff", { message: `User ${metadata.userName} says: ${otherText}` });
            self.sendToClient(metadata.userId, "sayingStuff", { message: `You said: ${otherText} and everyone received it` });
        }
    }
})
