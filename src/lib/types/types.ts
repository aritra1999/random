export interface Random {
    title: string
}

export interface Item {
	location: string;
    id: number;
    title: string;
    path: string;
    type: string;
    description?: string; 
    icon?: string;
    tags?: string[];
}