export interface Random {
    title: string
}

export interface Item {
    id: number;
    title: string;
    path: string;
    type: string;
    icon?: string;
    tags?: string[];
}