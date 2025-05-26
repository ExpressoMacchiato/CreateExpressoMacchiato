import { RouterWrapper } from "expresso-macchiato";
import { SalesData } from "../db/models/salesData.model";

export const salesRouter = new RouterWrapper({
	tag:'sales',
	basePath:'/api/sales',
	dbRouting: {
		entity: SalesData,
		getParameters: [{ name: 'product', in: 'query', required: true }]
	},
})
