
export interface Resource {
    name: string
    url: string
}

export interface ResourceDetail {
    count: number
    next: string
    previous: string
    results: Result[]
}


export interface Result {
    created: string;
    edited: string;
    films: string[];
    id: string;
    imagePath: string;
    name: string;
    url: string;
    title?: string;
}
