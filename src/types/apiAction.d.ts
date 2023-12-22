interface ApiAction {
    type: string;
    payload: any;
    meta?: {
        api?: {
            id?: string;
            method: string;
            url: string;
            formData?: FormData;
            bool?: boolean;
        };
    };
}
