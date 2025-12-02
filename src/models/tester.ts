import { BaseController } from "./controller";
import type { IWorkOrder } from "./IWorkOrder";

export async function testBaseController() {
    const controller = new BaseController();
    const model = await controller.get<IWorkOrder>(12);
    console.log(model);
    model?.getUserDefinedFields();
    model?.assignedTo;

    // Note: getCollection requires ICollectionBaseModel type
    // For IWorkOrder, use get() instead
    const collections = await controller.getCollection<any>({ status: 'open' });
    console.log(collections);
}