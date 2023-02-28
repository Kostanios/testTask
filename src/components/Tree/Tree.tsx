import React, {useCallback, useState} from "react";
import {useQuery} from "react-query";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import {createTreeNode, deleteTreeNode, getTree, renameTreeNode} from "../../api/tree.api";
import Node from "../Tree/Node"
import {INode} from "../../types/tree.type";

const Tree = () => {
    const { data, refetch } = useQuery('repoData', () =>
        getTree('KonstantinKotauTree')
    )

    const tree = data?.data || null
    const [inputValue, setInputValue] = useState('')

    const createNewNode = useCallback((node: INode, inputValue: string) => {
        if (inputValue && tree) {
            createTreeNode(tree.name, node.id, inputValue).then(() => refetch()).then(() => setInputValue(''))
        }
    }, [refetch, tree])

    const deleteNode = useCallback((node: INode) => {
        if (node && tree) {
            deleteTreeNode(tree.name, node.id).then(() => refetch())
        }
    }, [refetch, tree])

    const renameNode = useCallback((node: INode, newNodeName: string) => {
        if (node && tree) {
            renameTreeNode(tree.name, node.id, newNodeName).then(() => refetch())
        }
    }, [refetch, tree])

    return <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
            >
                <Typography>{`${tree?.name} tree`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={1} direction="row">
                    <TextField value={inputValue} onChange={(e) => setInputValue(e.target.value)} label="New node name" variant="outlined" />
                    <Button onClick={() => tree && createNewNode(tree, inputValue)} variant="contained">Create new root node</Button>
                </Stack>
                <br/>
                {!!tree?.children.length ? tree.children.map((node) => <>
                    <Node renameNode={renameNode} createNewNode={createNewNode} deleteNode={deleteNode} node={node}/>
                    <br/>
                </>) : 'Tree dont have children'}
            </AccordionDetails>
        </Accordion>
};

export default React.memo(Tree);

