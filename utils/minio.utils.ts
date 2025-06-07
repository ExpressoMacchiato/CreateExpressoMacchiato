import { fullLogNok, fullLogOk } from "expresso-macchiato";
import { Client } from "minio";
import Stream from "stream";
import { projectConfig } from '../_configs';


export class Minio
{
    public static readonly profilePicBucket = 'profilepics'
    public static readonly client = new Client({
        endPoint: projectConfig.MINIO_ENDPOINT,
        port: projectConfig.MINIO_PORT,
        useSSL: projectConfig.MINIO_SSL,
        accessKey: projectConfig.MINIO_ACCESS_KEY,
        secretKey: projectConfig.MINIO_SECRET_KEY,
    });


    /**
     * Cache for profile picture URLs to avoid frequent requests to MinIO.
     * The cache stores the URL and an expiration timestamp.
     */
    public static readonly profilePicCache:
        Map<string, { url:string, expires:number }> =
        new Map();


    public static putObject = async (bucket:string, writingFileName:string, content:string | Buffer, metadata?:any) =>
    {
        try
        {
            const exists = await this.client.bucketExists(bucket)
            if (!exists)
            {
                await this.client.makeBucket(bucket)
                fullLogOk('minio', `Bucket ${bucket} created`)
            }

            await this.client.putObject(bucket, writingFileName, content, metadata)
            return true;
        }
        catch (err)
        {
            fullLogNok('minio', err);
            return false;
        }
    }



    public static getProfilePic = async (id:string) =>
    {
        try
        {
            const minioRes = await this.client.getObject(this.profilePicBucket, `${id}.png`)
            const minioBuffer = await this.streamToBuffer(minioRes)
            const imgBase64 = minioBuffer.toString('base64');

            return imgBase64;
        }
        catch (err)
        {
            fullLogNok('minio', id, err);
            return null;
        }
    }

    public static getProfilePicPresignedUrl = async (id:string) =>
    {
        try
        {
            if (this.profilePicCache.has(id))
            {
                const cached = this.profilePicCache.get(id);
                if (!cached || cached.expires > Date.now()) return cached!.url;
                else this.profilePicCache.delete(id);
            }

            const expire = 60 * 60
            const minioRes = await this.client.presignedGetObject(this.profilePicBucket, `${id}.png`, expire)
            this.profilePicCache.set(id, { url:minioRes, expires: Date.now() + (expire - 300) * 1000})
            return minioRes;
        }
        catch (err)
        {
            fullLogNok('minio', id, err);
            return null;
        }
    }


    private static streamToBuffer = async (stream:Stream.Readable) =>
    {
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        return Buffer.concat(chunks);
    };
}
