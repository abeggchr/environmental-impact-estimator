export interface Impact {

    gC02eq: number;
    key: string;

    get(key: string): Impact
}
