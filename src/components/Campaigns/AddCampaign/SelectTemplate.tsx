import { GetTemplatesType, Template } from "../../../@types/getTemplatesType"
import { Grid, Box, Divider } from "@material-ui/core";
import { Modal, ModalHeader, ModalBody, Table, Form, Input, Label, ModalFooter, Button } from "reactstrap";
import { useState } from "react"
import MinimalTemplatePreview from "./MinimalTemplatePreview";
import { RootState, useDispatch, useSelector } from "../../../redux-persist/store";
import { getCampaignName } from "../../../redux-persist/slices/campaignData";
type SelectTemplateProps = {
    templates: GetTemplatesType[];
    templateData: Template | undefined;
    setTemplateData: (data: Template) => void;
    setTemplateCurrData: (data: Template) => void;
    setActiveStep: (num: number) => void;
    activeStep: number;
}
export const SelectTemplate =  ({ templates, templateData, setTemplateData, setActiveStep, setTemplateCurrData, activeStep }: SelectTemplateProps) => {

    
    const dispatch = useDispatch();
    const { campaignData } = useSelector(
        (state: RootState) => state.campaignData
    );
    const selectedTemplateData=(template : Template,whatsAppBusinessId:string)=>{
        let values={"campaignName":campaignData.campaignName,"scheduleTime": campaignData.scheduleTime,"templateId":template.id,"templateName" : template.name,"language":template.language,"whatsAppBusinessId":whatsAppBusinessId}
        dispatch(getCampaignName(values)); 
    }
    
    const [isTemplateOpen, setIsTemplateOpen] = useState(false);

    const toggleTemplatesDetails = () => {
        setIsTemplateOpen(!isTemplateOpen);
    }
    const showModal = () => setIsTemplateOpen(true);
    return (<>
         <Grid mb={5} mx={'auto'} display="block" mt={5} >
        <Box    maxHeight={550} margin={"auto"} overflow="auto">
            <div className='pt-20'>
                {templates.length >= 1 && templates.map((row) => (
                    <div key={row.whatsAppBusinessId}><h6>{row.displayName}</h6>
                        <Table responsive striped bordered hover >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Language</th>
                                    <th>Status</th>
                                    <th>Category</th>


                                </tr>
                            </thead>

                            <tbody>
                                {row.templates.map(template => (
                                    <tr key={template.id} style={{ cursor: 'pointer' }} onClick={() => {selectedTemplateData(template,row.whatsAppBusinessId); setTemplateData(template); setTemplateCurrData(template); showModal() }}>
                                        <td>{template.id}</td>
                                        <td >{template.name} </td>
                                        <td>{template.language} </td>
                                        <td>{template.status}</td>
                                        <td>{template.category}</td>
                                    </tr>))}
                            </tbody>
                        </Table></div>))}
            </div>
        </Box>
        </Grid>
        <Modal isOpen={isTemplateOpen} centered toggle={toggleTemplatesDetails} style={{ maxWidth: '1000px' }}>
            <ModalHeader tag="h5" className="font-size-16" toggle={toggleTemplatesDetails}>
                {'Template Preview'}
            </ModalHeader>
            <ModalBody className="p-4">
                {templateData?.components.map(template =>
                    <Form key={template.text}>
                        {template?.type == 'HEADER' &&
                            <div className="mb-4">
                                <Label className="form-label" htmlFor="addcontactemail-input">Header</Label>
                                <Input id='header' disabled type="text" contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" value={template.text} />
                            </div>}
                        {template.type == 'BODY' &&
                            <div className="mb-4">
                                <Label className="form-label" htmlFor="addcontact-invitemessage-input">Body</Label>
                                <textarea id='body' disabled contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" value={template.text} rows={10}></textarea>
                            </div>}
                        {template.type == 'FOOTER' &&
                            <div className="mb-4">
                                <Label className="form-label" htmlFor="addcontact-invitemessage-input">Footer</Label>
                                <Input id='footer' disabled type="text" contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" value={template.text} />
                            </div>}

                    </Form>
                )}
            </ModalBody>
            <ModalFooter>
                <Button type="button" color="link" onClick={toggleTemplatesDetails}>Close</Button>
                {/* TODO */}
                <Button type="button" onClick={() => setActiveStep(2)} color="primary">Use template</Button>
            </ModalFooter>
        </Modal>
        <Divider sx={{color : '#c2c0c0'}}/>
        <Grid marginLeft={'auto'}>
                    <Box mt={2} display={"flex"} alignItems="center" justifyContent={"right"}>

                        <Box mr={1} ><Button  style={{padding: '11px 33px', textTransform : "uppercase"}}  outline color="primary" onClick={() => setActiveStep(activeStep - 1)}>Back</Button></Box>
                       <Box> <Button style={{padding: '11px 33px', textTransform : "uppercase"}}  disabled aria-disabled color="primary" onClick={() => setActiveStep(activeStep + 1)}>Next</Button></Box>

                    </Box>
                </Grid>

    </>)
}