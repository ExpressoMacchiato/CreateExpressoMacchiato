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
            self.broadcastExceptClient(metadata.userId, "saying_stuff", { message: `User ${metadata.userName} says: ${otherText}` });
            self.sendToClient(metadata.userId, "saying_stuff", { message: `You said: ${otherText} and everyone received it` });
        }
    }
})
