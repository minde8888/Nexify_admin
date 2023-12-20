interface ApiAction {
    type: string;
    payload: any;
    meta?: {
        api?: {
            method: string;
            url: string;
            formData?: FormData;
            bool?: boolean;
        };
    };
}
