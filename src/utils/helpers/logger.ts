const isDebugMode: boolean = true; 

export const log = (message: any, ...additionalParams: any[]): void => {
    if (isDebugMode) {
        console.log(message, ...additionalParams);
    }
};

export const error = (message: any, ...additionalParams: any[]): void => {
    if (isDebugMode) {
        console.error(message, ...additionalParams);
    }
};
