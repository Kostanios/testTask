import axiosInstance from "../config/axios.config";
import {ITree} from "../types/tree.type";

export const getTree = (name: string) => axiosInstance.get<ITree>('api.user.tree.get', {
    params: {
        treeName: name
    }
})

export const createTreeNode = (treeName: string, parentNodeId: number, nodeName: string) => axiosInstance.post('/api.user.tree.node.create', undefined, {
    params: {
        treeName,
        parentNodeId,
        nodeName
    }
})

export const deleteTreeNode = (treeName: string, nodeId: number) => axiosInstance.post('/api.user.tree.node.delete', undefined, {
    params: {
        treeName,
        nodeId,
    }
})

export const renameTreeNode = (treeName: string, nodeId: number, newNodeName: string) => axiosInstance.post('/api.user.tree.node.rename', undefined, {
    params: {
        treeName,
        nodeId,
        newNodeName
    }
})
