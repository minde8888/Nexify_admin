interface AttributesFormProperty {
    id: string;
    attributeName?: string;
    image?: ImageFile[];
    imageDescription?: string;
    properties?: DynamicFormProperty[];
}

export default AttributesFormProperty;
