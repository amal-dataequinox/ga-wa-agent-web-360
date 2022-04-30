import { useState } from "react";
import { useSelector } from "react-redux";
import { GetTemplatesType, Template } from "../../../@types/getTemplatesType"
import { Grid, Box, Divider, Typography } from "@material-ui/core";
import { Modal, ModalHeader, ModalBody, Table, Form, Input, Label, ModalFooter, Button } from "reactstrap";
import MinimalTemplatePreview from "../../../components/Campaigns/AddCampaign/MinimalTemplatePreview";
import { dispatch, store } from "../../../redux-persist/store";
import { getRecentChats } from "../../../redux-persist/slices/chatList";


type TemplateSelectionViewProps = {
    showTemplateModal : boolean;
    closeTemplateModal : () => void;
}
export const TemplateSelectionView = ({showTemplateModal,closeTemplateModal} : TemplateSelectionViewProps) => {
    const { getTemplates } = useSelector(
        (state: RootState) => state.getTemplates 
    );
    const [templateData, setTemplateData] = useState<Template>();
    const [templateCurrData, setTemplateCurrData] = useState<Template>();
    const [activeStep,setActiveStep] = useState(0);
    const [headerVariableValues, setHeaderVariableValues] = useState<any>({});
    const [bodyVariableValues, setBodyVariableValues] = useState<any>({});
    const headerVariableCount = templateData?.components.find((component) => component.type === "HEADER")?.text?.match(/{{[0-9]+}}/g)?.length || 0;
    const bodyVariableCount = templateData?.components.find((component) => component.type === "BODY")?.text?.match(/{{[0-9]+}}/g)?.length || 0;




    const handleHeaderVariables = (evt, num) => {
        const currVal = evt.target.value;
        setHeaderVariableValues({ ...headerVariableValues, [num]: currVal });
        const targetVariable = num;
        const regex = new RegExp(`{{[${targetVariable}]}}`)
        let modifiedText = templateData?.components.find((component) => component.type === "HEADER")?.text?.replace(regex, currVal)

        Object.keys(headerVariableValues).forEach((keyVal: any) => {
            if (keyVal !== targetVariable) {
                const regex = new RegExp(`{{[${keyVal}]}}`)
                modifiedText = modifiedText?.replace(regex, headerVariableValues[keyVal])
            }
        })

        const result = {
            ...templateCurrData, components: templateCurrData?.components.map((component) => {
                if (component.type === "HEADER") {
                    return { ...component, text: modifiedText }
                }
                return component
            })
        }
        setTemplateCurrData(result);
    };
    const handleBodyVariables = (evt, num) => {
        const currVal = evt.target.value;
        setBodyVariableValues({ ...bodyVariableValues, [num]: currVal });
        const targetVariable = num;
        const regex = new RegExp(`{{[${targetVariable}]}}`)
        let modifiedText = templateData?.components.find((component) => component.type === "BODY")?.text?.replace(regex, currVal)

        Object.keys(bodyVariableValues).forEach((keyVal: any) => {
            if (keyVal !== targetVariable) {
                const regex = new RegExp(`{{[${keyVal}]}}`)
                modifiedText = modifiedText?.replace(regex, bodyVariableValues[keyVal])
            }
        })

        const result = {
            ...templateCurrData, components: templateCurrData?.components.map((component) => {
                if (component.type === "BODY") {
                    return { ...component, text: modifiedText }
                }
                return component
            })
        }
        setTemplateCurrData(result);
    }

    const sendTemplate = (message,type) => {
        var messageObj = null;
        let d = new Date();
        var n = d.getSeconds();

        //matches the message type is text, file or image, and create object according to it
        switch (type) {
            case "textMessage":
                messageObj = {
                    messageContent: message,
                    time: "00:" + n,
                    userType: "sender",
                    image: "",
                    isFileMessage: false,
                    isImageMessage: false,
                    isTemplate : true,
                }
                break;

            case "fileMessage":
                messageObj = {
                    messageContent: 'file',
                    fileMessage: message?.name,
                    size: message.size,
                    time: "00:" + n,
                    userType: "sender",
                    image: "",
                    isFileMessage: true,
                    isImageMessage: false,
                    isTemplate : true,
                }
                break;

            case "imageMessage":
                var imageMessage = [
                    { image: message },
                ]

                messageObj = {
                    messageContent: 'image',
                    imageMessage: imageMessage,
                    size: message.size,
                    time: "00:" + n,
                    userType: "sender",
                    image: "",
                    isImageMessage: true,
                    isFileMessage: false,
                    isTemplate : true,
                }
                break;

            default:
                break;
        }

        const {chatList} = store.getState();
        const {tempContact, recentChats, activeUser} = chatList;
        let recentChatList = JSON.parse(localStorage.getItem("recentChatStorage") || '[]') || [];
        let allChatList = [];
      
        if(tempContact && !recentChatList.find((contact) => contact.contactId === tempContact?.contactId) ){
            allChatList.push(tempContact)
        }
        allChatList = [...allChatList,...recentChatList]
        allChatList = allChatList.map((chatInfo) => {
            if(chatInfo.contactId === activeUser){
                return {...chatInfo, isTemplate : true, messages : [...chatInfo.messages, messageObj]}
            }   
            return chatInfo
        })
        localStorage.setItem("recentChatStorage",JSON.stringify(allChatList))
        //dispatch(getRecentChats());
        closeTemplateModal();

    }

   const templateContent = () => {
    switch(activeStep){
        case 0 : return {
            templateHeader : "Select Template",
            templateBody : (<Grid mb={5} mx={'auto'} display="block" mt={5} >
            <Box    maxHeight={550} margin={"auto"} overflow="auto">
                <div className='pt-20'>
                    {getTemplates.length >= 1 && getTemplates.map((row) => (
                        <><h6>{row.displayName}</h6>
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
                                        <tr key={template.id} style={{ cursor: 'pointer' }} onClick={() => { setTemplateData(template); setTemplateCurrData(template); setActiveStep(1) }}>
                                            <td>{template.id}</td>
                                            <td >{template.name} </td>
                                            <td>{template.language} </td>
                                            <td>{template.status}</td>
                                            <td>{template.category}</td>
                                        </tr>))}
                                </tbody>
                            </Table></>))}
                </div>
            </Box>
            </Grid>),
        }
        case 1 : return {
            templateHeader : "Preview Template",
            templateBody : (<>{templateData?.components.map(template =>
                <Form>
                    {template?.type === 'HEADER' &&
                        <div className="mb-4">
                            <Label className="form-label" htmlFor="addcontactemail-input">Header</Label>
                            <Input id='header' disabled type="text" contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" value={template.text} />
                        </div>}
                    {template.type === 'BODY' &&
                        <div className="mb-4">
                            <Label className="form-label" htmlFor="addcontact-invitemessage-input">Body</Label>
                            <textarea id='body' disabled contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" value={template.text} rows={10}></textarea>
                        </div>}
                    {template.type === 'FOOTER' &&
                        <div className="mb-4">
                            <Label className="form-label" htmlFor="addcontact-invitemessage-input">Footer</Label>
                            <Input id='footer' disabled type="text" contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" value={template.text} />
                        </div>}
    
                </Form>
            )}</>),
            templateFooter :  <ModalFooter>
            <Button type="button" color="link" onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
            {/* TODO */}
            <Button type="button" onClick={() => setActiveStep(activeStep + 1)} color="primary">Use template</Button>
        </ModalFooter>
        }
        case 2 : return {
            templateHeader : "Preview Template",
            templateBody : (
                <>
                <Grid mt={5} container minHeight={550}>
                    <Grid lg={9} xs={12} item>
                        {templateCurrData?.components.map(template =>
                            <Form>
                                {template.type == 'HEADER' &&
                                    <div className="mb-4">
                                        <Label className="form-label" htmlFor="addcontactemail-input">Header</Label>
                                        <Input disabled type="text" contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" id="addcontactemail-input" value={template.text} />
            
                                        {new Array(headerVariableCount).fill('x').map((row, key) =>
                                            <div className="mb-4 pt-20">
                                                <Label className="form-label" >Variable {key + 1}</Label>
                                                <Input value={headerVariableValues[key + 1]} type="text" className="form-control" id={key.toString()} onChange={(e) => handleHeaderVariables(e, (key + 1))} />
                                            </div>
                                        )}
                                    </div>}
                                {template.type == 'BODY' &&
                                    <div className="mb-4">
                                        <Label className="form-label" htmlFor="addcontact-invitemessage-input">Body</Label>
                                        <textarea disabled contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" id="addcontact-invitemessage-input" value={template.text} rows={10}></textarea>
                                        {new Array(bodyVariableCount).fill('x').map((row, key) =>
                                            <div className="mb-4 pt-20">
                                                <Label className="form-label" >Variable {key + 1}</Label>
                                                <Input value={bodyVariableValues[key + 1]} type="text" className="form-control" id={key.toString()} onChange={(e) => handleBodyVariables(e, (key + 1))} />
                                            </div>
                                        )}
                                    </div>
                                }
            
            
                                {template.type == 'FOOTER' &&
                                    <div className="mb-4">
                                        <Label className="form-label" htmlFor="addcontact-invitemessage-input">Footer</Label>
                                        <Input disabled type="text" contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" id="addcontactemail-input" value={template.text} />
                                    </div>}
            
            
                            </Form>
            
                        )}
                    </Grid>
                    <Grid lg={3} xs={12} item >
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection="column">
                            <Typography mt={1}>
                                Preview
                            </Typography>
                            <Box>
                                {templateCurrData && <MinimalTemplatePreview template={templateCurrData} />}    </Box>       </Box>
                    </Grid>
                   
                </Grid>
            </>
            ),
            templateFooter : (               <ModalFooter>
                <Button type="button" color="link" onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
                {/* TODO */}
                <Button type="button" onClick={() => sendTemplate(templateCurrData,"textMessage")} color="primary">Send</Button>
            </ModalFooter>)
        }
    }
   }
    
    const templateDetails = templateContent();

  return(<>
        <Modal isOpen={showTemplateModal} centered toggle={closeTemplateModal} style={{ maxWidth: '1000px' }}>
    <ModalHeader tag="h5" className="font-size-16" toggle={closeTemplateModal}>
       {templateDetails?.templateHeader}
    </ModalHeader>
    <ModalBody className="p-4">
        {templateDetails?.templateBody}
    </ModalBody>
    {templateDetails?.templateFooter}
</Modal>
   </>)
}

