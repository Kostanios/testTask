import React, {useState} from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';

import {INode} from "../../types/tree.type";

interface INodeComponent {
    node: INode;
    deleteNode: (node: INode) => void
    createNewNode: (node: INode, inputValue: string) => void
    renameNode: (node: INode, newNodeName: string) => void
}
const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Node: React.FC<INodeComponent> = ({ node, deleteNode, createNewNode, renameNode}) => {
    const [newNodeInputValue, setNewNodeInputValue] = useState('')
    const [editNodeInputValue, setEditNodeInputValue] = useState(node.name)
    const [editModelIsOpen, setEditModelIsOpen] = useState(false)

    return <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
        >
            <Typography>{`${node.name} node`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Stack spacing={1} direction="row">
                <TextField value={newNodeInputValue} onChange={(e) => setNewNodeInputValue(e.target.value)} label="New node name"
                           variant="outlined"/>
                <Button onClick={() => {
                    createNewNode(node, newNodeInputValue)
                    setNewNodeInputValue('')
                }} variant="contained">Create new root node</Button>
                <Button color="error" onClick={() => deleteNode(node)} variant="contained">delete node</Button>
                <Button color="secondary" onClick={() => setEditModelIsOpen(true)} variant="contained">edit node name</Button>
            </Stack>
            <Modal
                open={editModelIsOpen}
                onClose={() => setEditModelIsOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Stack spacing={1} direction="row">
                        <TextField value={editNodeInputValue} onChange={(e) => setEditNodeInputValue(e.target.value)} label="New node name"
                                   variant="outlined"/>
                        <Button onClick={() => {
                            renameNode(node, editNodeInputValue)
                            setEditModelIsOpen(false)
                        }} variant="contained">edit node name</Button>
                    </Stack>
                </Box>
            </Modal>
            <br/>
            {!!node?.children.length ? node.children.map((e) => <Node renameNode={renameNode} deleteNode={deleteNode} createNewNode={createNewNode} node={e}/>) : `${node.name} dont have children`}
        </AccordionDetails>
    </Accordion>
}

export default Node