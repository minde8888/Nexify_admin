interface IdProps {
    id: string;
}

export const filterIds = (obj: IdProps[]) => obj.map(obj => obj.id).filter(id => id !== "00000000-0000-0000-0000-000000000000")
