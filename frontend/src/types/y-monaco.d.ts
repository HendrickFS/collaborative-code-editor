declare module 'y-monaco' {
    export class MonacoBinding {
        constructor(
            type: any,
            model: any,
            editors: Set<any>,
            awareness?: any
        );
        destroy(): void;
    }
}
