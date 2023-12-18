type HttpMethod = 'post' | 'get' | 'put' | 'delete';

interface ApiRequest {
    method: HttpMethod;
    url: string;
    id?: string;
    formData?: FormData;
}
