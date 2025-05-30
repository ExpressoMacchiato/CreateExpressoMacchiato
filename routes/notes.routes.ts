import { RouterWrapper, Swagger } from "expresso-macchiato";
import { Note } from "../db/models/notes.model";


export const noteRoutes = new RouterWrapper({
    tag:'note',
    basePath:'/api/note',
    dbRouting:
    {
        entity: Note,
        secure: { user_id: { tokenKey: 'id', methods: "*" } },
        getParameters: [{ in: 'query', like:true, name:'content' }],
        bodyParameters: Swagger.createSchema({ content: 'string' }),
    }
});
