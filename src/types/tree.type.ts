export interface ITree {
    name: string
    id: number
    children: INode[]
}

export interface INode {
    name: string
    id: number
    children: INode[]
}