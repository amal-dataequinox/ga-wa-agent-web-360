import { Box, Input, Grid, Card, Typography, Divider } from "@material-ui/core";
import { UploadFile, PersonAddAlt1Outlined } from "@mui/icons-material"
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Button, Table } from "reactstrap";
import { AllContacts } from "../../../@types/allContacts";
import { RootState, useDispatch, useSelector } from "../../../redux-persist/store";
import { ContactItem } from "./";
import { FileUploader } from 'react-drag-drop-files';
import { addNewContactFromFile } from "../../../redux-persist/slices/addContact";
import { getAllContacts, searchContacts } from "../../../redux-persist/slices/allContacts";
import { getCampaignName } from "../../../redux-persist/slices/campaignData";
import { getAllTemplates } from "../../../redux-persist/slices/getAllTemplates";
import * as XLSX from "xlsx";


type AddContactProps = {
    setActiveStep: (num: number) => void;
    activeStep: number;
}

export type FileUploadData = {
    mobileNumber: string;
    countryCode:string;
};

type FileDataType = {
    lastModified: string;
    lastModifiedDate: Date;
    name: string;
    type: string;
    size: string;
    webkitRelativePath: string;
};

export const AddContacts = (props: AddContactProps) => {
    const { activeStep, setActiveStep } = props;
    const [showContactsModal, setShowContactsModal] = useState(false);
    const [addFileModal, setAddFileModalModal] = useState(false);
    const [file, setFile] = useState<FileDataType>();
    const [fileName, setFileName] = useState("");
    const [arrayContacts, setArrayContacts] = useState<FileUploadData[]>([]);
    const showModal = () => setShowContactsModal(true);
    const closeModal = () => setShowContactsModal(false);


    const { campaignData } = useSelector(
        (state: RootState) => state.campaignData
    );

    const { getTemplates } = useSelector(
        (state: RootState) => state.getTemplates
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllTemplates());
        dispatch(getAllContacts(1));
    }, [dispatch]);
    const fileTypes = ["CSV", "XLSX"];

    const { allContacts } = useSelector(
        (state: RootState) => state.allContacts
    );
    const [checkedContacts, setCheckedContacts] = useState<AllContacts[]>([]);
    const clearContacts = () => {
        setCheckedContacts([])
    }

    const toggleAddFileModalModal = () => {
        setAddFileModalModal(!addFileModal);
    }

    const handleUploadFile = (e) => {
        setFile(e);
    };

    const fileReader = new FileReader();
    const [contacts, setContacts] = useState(allContacts);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            var fileName = file.name;
            setFileName(fileName)
            var fileExtension = fileName.split('.').pop();
            // alert(fileExtension);
            fileReader.onload = function (event) {
                const text = event.target.result;
                if (fileExtension == 'csv') {
                    csvFileToArray(text);
                }
                if (fileExtension == 'xlsx') {
                    xlsxFileToCsvFile(e)
                }
            };

            fileReader.readAsText(file);
        }


    };

    const csvFileToArray = (string) => {
        let csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        let csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        csvHeader = csvHeader.filter(function (element) {
            return element.length > 0;
        });

        csvRows = csvRows.filter(function (element) {
            return element.length > 0;
        });
        let arrayContactsTemp = csvRows.map(i => {
            const values = i.split(",");

            const obj = csvHeader.reduce((object, header, index) => {

                object[header.trim()] = values[index];
                return object;
            }, {});
            return obj;
        });

        arrayContactsTemp = arrayContactsTemp.map(tempContact=>({
            mobileNumber:`${tempContact.countryCode}${tempContact.mobileNumber}`   
        }))
        console.log("contacts:",arrayContactsTemp);
        
        setArrayContacts(arrayContactsTemp);
        toggleAddFileModalModal();

    };


    // converting xlsx file to csv format
    const xlsxFileToCsvFile = (e: any) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            csvFileToArray(data);

        };

        reader.readAsBinaryString(file);
    }
    let toContacts = [] as string[];

    const submitSelectedContacts = () => {
        
        if (checkedContacts.length > 0) {
            checkedContacts.map(contact => {
                toContacts.push(contact.contactPhoneNumber)
            })
            
            let values = { "campaignName": campaignData.campaignName, "scheduleTime": campaignData.scheduleTime, "templateId": campaignData.templateId, "templateName": campaignData.templateName,"language":campaignData.language,"whatsAppBusinessId":campaignData.whatsAppBusinessId, "toContacts": toContacts }
            dispatch(getCampaignName(values));
        }
        if (arrayContacts.length > 0) {
            arrayContacts.map(contact => {
                toContacts.push(contact.mobileNumber.trim())
            })
            let values = { "campaignName": campaignData.campaignName, "scheduleTime": campaignData.scheduleTime, "templateId": campaignData.templateId, "templateName": campaignData.templateName,"language":campaignData.language,"whatsAppBusinessId":campaignData.whatsAppBusinessId, "toContacts": toContacts }
            dispatch(getCampaignName(values));
        }
        setActiveStep(activeStep + 1)
    }

    const searchContact = async (searchTerm:string) => {
        await dispatch(searchContacts(searchTerm,1,10));
       // setContacts(allContacts);
        //setAddContactFlag(true);
     }
     
    return (
        <Grid sx={{ pt: 4 }} margin="auto"  >
<a href="https://s3.ap-south-1.amazonaws.com/telinfy.greenadsglobal.com/templates/whatsapp/general/campaign-contacts.xlsx" style={{float:"right"}}>Download</a>
            <Grid sx={{ pb: 10 }} margin={'auto'} display="flex" justifyContent="center" mt={5} alignItems="center" flexDirection="row" minHeight={550}>
                <Box>
                    <Button color="primary" style={{
                        padding: 30, width: 200,
                        height: 200,
                        borderRadius: 17
                    }} onClick={showModal} > <Box><PersonAddAlt1Outlined sx={{ width: 70, height: 70 }} /></Box>Select Contact/ Groups</Button>
                </Box>

                <Typography my={2} variant="h6" sx={{ p: 8 }}>OR</Typography>

                <Box>
                    <label htmlFor="contained-button-file">
                        <Input id="contained-button-file" type="file" sx={{ display: 'none' }} />
                        <Button outline style={{
                            padding: 30, width: 200,
                            height: 200,
                            borderRadius: 17
                        }}
                            onClick={toggleAddFileModalModal}
                            color="primary">
                            <Box><UploadFile sx={{ width: 70, height: 70 }} /></Box>
                            Upload File
                        </Button>
                    </label>
                </Box>
            </Grid>
            {arrayContacts.length > 0 &&
            
            <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={3}></Grid>
                    <Grid item xs={12} md={6}>
                        <div className="card dashboard-card-style">
                            <div className="card-body">
                                <Table responsive borderless>
                                    <thead>
                                        <tr>
                                            <th>{fileName}</th>
                                            <th style={{ textAlign: 'right' }}>{arrayContacts.length} Contacts selected</th>
                                        </tr>
                                    </thead>

                                    <tbody>


                                        <tr>
                                            <td> {arrayContacts.slice(0, 5).map((row, index) => (
                                                <tr key={index}><td>{row.mobileNumber}</td></tr>
                                            ))}
                                            </td>
                                            <td style={{ float: 'right' }}>
                                                {arrayContacts.slice(5, 10).map((row, index) => (
                                                    <tr key={index}><td>{row.mobileNumber}</td></tr>
                                                ))}
                                            </td>

                                        </tr>


                                    </tbody>

                                </Table>
                                {arrayContacts.length > 10 ?
                                    <div>
                                        and  {arrayContacts.length - 10} others
                                    </div> :
                                    <div>
                                        {arrayContacts.length} contatcs
                                    </div>}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            }
            {checkedContacts.length > 0 &&
                <Grid container spacing={3} alignItems="center" >
                    <Grid item xs={12} md={3} ></Grid>
                    <Grid item xs={12} md={6} >
                        <div className="card dashboard-card-style">
                            <div className="card-body">
                                <Table responsive borderless>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'right' }}> {checkedContacts.length} Contacts selected</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td> {checkedContacts.slice(0, 5).map((row) => (
                                                <tr key={row.accountId}><td>{row.contactFirstName}</td></tr>
                                            ))}
                                            </td>
                                            <td style={{ float: 'right' }}>
                                                {checkedContacts.slice(5, 10).map((row) => (
                                                    <tr key={row.accountId}><td>{row.contactFirstName}</td></tr>
                                                ))}
                                            </td>
                                        </tr>
                                    </tbody>

                                </Table>
                                {checkedContacts.length > 10 ?
                                    <div>
                                        and  {checkedContacts.length - 10} others
                                    </div> :
                                    <div>
                                        {checkedContacts.length} contatcs
                                    </div>}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            }
            <Divider sx={{ color: '#c2c0c0' }} />
            <Grid marginLeft={'auto'}>
                <Box mt={2} display={"flex"} alignItems="center" justifyContent={"right"}>

                    <Box mr={1} ><Button style={{ padding: '11px 33px', textTransform: "uppercase" }} outline color="primary" onClick={() => setActiveStep(activeStep - 1)}>Back</Button></Box>
                    <Box> <Button style={{ padding: '11px 33px', textTransform: "uppercase" }} color="primary" onClick={() =>checkedContacts.length > 0 || arrayContacts.length > 0 ? submitSelectedContacts() : null}>Next</Button></Box>

                </Box>
            </Grid>
            <Modal toggle={closeModal} isOpen={showContactsModal}>
                <ModalHeader toggle={closeModal}>

                    Select Contacts
                </ModalHeader>
                <ModalBody>
                <input type="text" inputProps={{disableUnderline:true}} className="form-control bg-light  form-control mb-4" placeholder={('Search users..')}  onChange={(e) => searchContact(e.target.value)}/>
                    <Box maxHeight={550} overflow="auto" display={"flex"} flexDirection="column">
                        {
                            allContacts && allContacts.map((contact, index) => {
                                return (
                                    <ContactItem key={index} checkedContacts={checkedContacts} setCheckedContacts={setCheckedContacts} contact={contact} index={index} count={allContacts.length} />
                                )
                            })
                        }
                    </Box>
                    <Box display={"flex"} alignItems="center" justifyContent={"right"} m={3}>
                        <Box mr={1}><Button onClick={clearContacts} outline color="primary">Clear All</Button></Box>
                        <Box><Button color="primary" onClick={closeModal}>Submit</Button></Box>
                    </Box>
                </ModalBody>
            </Modal>

            <Modal isOpen={addFileModal} centered toggle={toggleAddFileModalModal}>
                <ModalHeader tag="h5" className="font-size-16" toggle={toggleAddFileModalModal}>
                    Add Contacts
                </ModalHeader>
                <ModalBody className="p-4">
                    <div style={{ textAlign: "center" }}>
                        <br />
                        <FileUploader handleChange={handleUploadFile} name="file" types={fileTypes} />
                        < br />
                        <Button color="primary" block className=" waves-effect waves-light" onClick={(e) => { handleOnSubmit(e); }}>Upload</Button>

                        <br />

                    </div>
                </ModalBody>
            </Modal>
        </Grid>
    )
}