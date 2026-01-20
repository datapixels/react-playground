
import { z } from 'zod';
import { createAction } from './performAction';

const CreateSiteTypeDefinition = {
    code: z.string().min(5).max(100),
    isActive: z.boolean(),
} as const;

const GetSiteTypeDefinition = {
    "SiteType->Id": z.number().int().positive(),
    "dynamicValue": z.object({
        type: z.string(),
        // value can be anything
        value: z.any(),
    }),
} as const;

const baseUrl = "GEN/SiteType"

const SiteTypeController = {
    CreateSiteType: createAction(baseUrl, 'CreateSiteType', CreateSiteTypeDefinition),
    GetSiteType: createAction(baseUrl, 'GetSiteType', GetSiteTypeDefinition),
}


const site = {
    code: 'exampleCode',
    isActive: true
};

SiteTypeController.CreateSiteType(site);

SiteTypeController.GetSiteType({"SiteType->Id": 123, dynamicValue: { type: 'example', value: 42 }});

SiteTypeController.GetSiteType({"SiteType->Id": 423, dynamicValue: { type: 'example', value: 42 }});