declare const COLLECTION_BRAND: unique symbol;

export interface ICollectionBaseModel {
    readonly [COLLECTION_BRAND]: void;
}