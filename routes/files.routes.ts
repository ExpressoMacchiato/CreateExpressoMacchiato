
import { apiOk, RouterWrapper, Swagger } from "expresso-macchiato";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() })

export const fileRouter = new RouterWrapper({
    tag:'file',
    basePath:'/api/file',
    swaggerNewSchemas: { 'file-schema': Swagger.createMultipartSchema('file') },
    apis:
    {
        '/test':
        {
            "POST":
            {
                middlewares: [upload.single('file')],
                swaggerBody: { schema: 'file-schema', comType: 'multipart/form-data' },
                handler: async (req, res) =>
                {
                    console.log(req.file)
                    return apiOk('wow');
                },
            }
        },
    }
})
