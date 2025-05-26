import { RouterWrapper, Swagger } from "expresso-macchiato";
import { Test } from "../db/models/test.model";


export const testRoutes = new RouterWrapper({
    tag:'test',
    basePath:'/api/test',
    dbRouting:
    {
        entity: Test,
        getParameters: [{ in: 'query', like:true, name:'content' }],
        bodyParameters: Swagger.createSchema({
            content: { type: 'string', required:false },
            // test: { type: 'string', required:true },
        }),
    }
});
