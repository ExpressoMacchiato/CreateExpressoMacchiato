import { Token, TokenApiOptions } from "expresso-macchiato";
import { User } from "../db/models/user.model";
import { Minio } from "./minio.utils";

export const tokenInstance = new Token({
    SECRET_KEY: "fdisoc,i49059043vm5i493vi43v,i4390v34,04,iv,v5439i4930i4v9,943,453=?£)V$=?M$)=V$?£?",
    ExpTime:6000,
    EncAlgorithm: 'A256GCM',
    KeyLength:32
})


export const tokenApiOptions:TokenApiOptions =
{
    path: '/api/auth',
    callback: async (req, res) =>
    {
        try
        {
            const { id } = await tokenInstance.authorize(req);
            const user = await User.findOne({ where: { id }});
            if (!user) throw new Error('Unauthorized');

            const image = await Minio.getProfilePic(user.id);
            const newToken = await tokenInstance.generateJWE({ id: user.id });
            res.status(200).json({
                token:newToken,
                info:{ name: user.name, email: user.email, image }
            });
        }
        catch (err)
        {
            res.status(401).send(err);
        }
    },
}
