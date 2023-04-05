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
    links?: LinkListItem[]
    icon?: string;
    tags?: string[];
}

export interface LinkListItem {
    title: string;
    link: string;
    logo?: string; 
}