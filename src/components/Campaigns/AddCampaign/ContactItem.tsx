import { Avatar, Box, Checkbox, Divider, FormLabel, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import {  CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material"
import { ChangeEventHandler } from "react";
import { AllContacts } from "../../../@types/allContacts"

type ContactItemProps = {
    contact : AllContacts;
    index : number;
    count : number;
    setCheckedContacts : any;
    checkedContacts : AllContacts[]
}

export const ContactItem =  ({contact, index,count, setCheckedContacts, checkedContacts}: ContactItemProps) => {

    const handleContactChange = (evt :any,contact : AllContacts) => {
        if(evt.target.checked){
            setCheckedContacts([...checkedContacts,contact]);
        }
        else{
            const filterCheckedContacts = checkedContacts.filter((contactItem) => contactItem.contactId !== contact.contactId);
            setCheckedContacts([...filterCheckedContacts]);
        }
    }

    const checkedAccounts = checkedContacts.map((contact) => contact.contactId)
    const isChecked = checkedContacts.find(() => checkedAccounts.includes(contact.contactId))

    return (<Box width={"100%"} sx={{cursor : "pointer"}}>
    <Box>
        <FormLabel htmlFor={contact.contactId} sx={{display:"block"}}>
            <ListItem sx={{ padding: "8px 18px" }} key={contact.contactId}>
                <Box display={"flex"} justifyContent="space-between" width={"100%"}>
                    <Box display={"inline-flex"} alignItems="center">
                        <Box mr={1}>
                            <Avatar />
                        </Box>
                        <ListItemText sx={{ fontSize: "0.7em" }} primary={contact.contactFirstName} />
                    </Box>
                    <Box display={"inline-flex"}>
                        <ListItemIcon>
                            <Checkbox checked={isChecked ? true : false} onChange={(evt) => handleContactChange(evt,contact)} id={contact.contactId} value={contact.contactFirstName} icon={<CheckBoxOutlineBlank style={{ color: "lightgrey" }} fontSize="medium" />}
                                checkedIcon={<CheckBox style={{ color: "#6abb44" }} fontSize="medium" />} />
                        </ListItemIcon>
                    </Box>
                </Box>
            </ListItem>
        </FormLabel>
    </Box>
    { index !== count -1 &&  <Divider sx={{width: '94%',
    margin: 'auto',
    color : "#c2c0c0"}}/>}
</Box>)
}