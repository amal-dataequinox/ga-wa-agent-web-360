import React, { Component, useState, useEffect, useRef } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, UncontrolledTooltip, Modal, ModalHeader, ModalBody, ModalFooter, Table, Alert, Form, Label, Input, FormFeedback } from 'reactstrap';
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { withTranslation } from 'react-i18next';
import classnames from 'classnames';
import campaigns from "../../../assets/images/campaigns.svg"
import templates from "../../../assets/images/templates.svg"
import { RootState, useDispatch, useSelector } from '../../../redux-persist/store';
import { getAllTemplates } from '../../../redux-persist/slices/getAllTemplates';
import Multiselect from 'multiselect-react-dropdown';


import { createGroup } from "../../../redux/actions";
import { WabaTemplate } from '../../../@types/getTemplatesType';
import { getAllContacts } from '../../../redux-persist/slices/allContacts';
import { AllContacts } from '../../../@types/allContacts';
import { sendNewMessage } from '../../../redux-persist/slices/sendMessage';
import Scrollbar from "simplebar-react";
import {AddCampaign} from '../../../components/Campaigns/AddCampaign';
import { CampaignHistoryItem , CampaignHistory} from '../../../components/Campaigns/ShowCampaign';
import { getCampaignList } from '../../../redux-persist/slices/campaignList';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { mediaFileSave } from '../../../redux-persist/slices/mediaSave';
import { getAllWBAccount } from '../../../redux-persist/slices/getWBAccounts';

const Broadcast = (props: any) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const { getWBAccount } = useSelector(
        (state: RootState) => state.getWBAccount
    );
    const { getTemplates } = useSelector(
        (state: RootState) => state.getTemplates
    );

    const { allContacts } = useSelector(
        (state: RootState) => state.allContacts
    );

    const { sendMessage } = useSelector(
        (state: RootState) => state.sendMessage
    );

    const { campaignList } = useSelector(
        (state: RootState) => state.campaignList
    );

  
    const { customer } = useSelector(
        (state: RootState) => state.customer
    );

    const { mediaSave } = useSelector(
        (state: RootState) => state.mediaSave
    );

    useEffect(() => {
        dispatch(getAllWBAccount());
        dispatch(getAllContacts(1));
        dispatch(getCampaignList(1,10));
    }, [dispatch]);

    useEffect(() => {
        if (getWBAccount[0].whatsAppBusinessId) {
            setWhatsAppBusinessId(getWBAccount[0].whatsAppBusinessId)
            dispatch(getAllTemplates(getWBAccount[0].whatsAppBusinessId));
        }
    }, [getWBAccount[0].whatsAppBusinessId]);

    // State for current active Tab
    const [currentActiveTab, setCurrentActiveTab] = useState('1');
    const [campaignModal, setCampaignModal] = useState(false);
    const [templatesModal, setTemplatesModal] = useState(false);
    const [templateDetailsModal, setTemplateDetailsModal] = useState(false);
    const [templateVariableModal, setTemplateVariableModal] = useState(false);
    const [alert, setAlert] = useState(true);
    const [templateData, setTemplateData] = useState<WabaTemplate>();
    const [bodyText, setBodyText] = useState<string>();
    const [bodyVariable1, setBodyVariable1] = useState('');
    const [bodyVariable2, setBodyVariable2] = useState('');
    const [bodyVariable3, setBodyVariable3] = useState('');
    const [bodyVariable4, setBodyVariable4] = useState('');
    const [bodyVariable5, setBodyVariable5] = useState('');
    const [bodyVariable6, setBodyVariable6] = useState('');
    const [headerVariable1, setHeaderVariable1] = useState('');
    const [headerVariable2, setHeaderVariable2] = useState('');
    const [headerVariable3, setHeaderVariable3] = useState('');
    const [headerVariable4, setHeaderVariable4] = useState('');
    const [headerVariable5, setHeaderVariable5] = useState('');
 


    const [hidePlaceholder, setHidePlaceholder] = useState(true);
    const [contact, setContact] = useState<AllContacts>();
    const [showCampaignSection , setShowCampaignSection] = useState(false);
    const [createdCampaign,setCreatedCampaigns] = useState();
    const [whatsAppBusinessId,setWhatsAppBusinessId] = useState("");
    
    const headerData = templateData?.components.find(( type ) => type.type === "HEADER");


    // Toggle active state for Tab
    const toggleTab = tab => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    }

    const toggleCampaign = () => {
        setCampaignModal(!campaignModal);
     
    }

    const toggleTemplates = () => {
        setTemplatesModal(!templatesModal);
    }

    const toggleTemplatesDetails = () => {
        setTemplateDetailsModal(!templateDetailsModal);

    }
    const setTemplateDetails = (template: WabaTemplate) => {
        setTemplateData(template);
    }

    const toggleTemplatesVariable = () => {
        setTemplateVariableModal(!templateVariableModal);

    }


    const headerVariableCount = templateData?.components.find((component) => component.type === "HEADER")?.text?.match(/{{[0-9]+}}/g)?.length || 0;
    const bodyVariableCount = templateData?.components.find((component) => component.type === "BODY")?.text?.match(/{{[0-9]+}}/g)?.length || 0;
   
    const onSelectNewUsers = (selectedList: any, selectedItem: string[]) => {
        formik.values.to=selectedList;
        setHidePlaceholder(true);
        setContact(selectedList);
    }

    const onRemoveNewUsers = (selectedList: any, selectedItem: string[]) => {
        setContact(selectedList);
    }

    const { t } = props;


    const onDismissAlert = () => {
        setAlert(false);
    }

    const handleBodyVariables = (e: any, key: number) => {
        formik.handleChange(e)
        let variableValue = e.target.value;
        if (key == 1) {
            setBodyVariable1(variableValue)
        }
        if (key == 2) {
            setBodyVariable2(variableValue)
        }

        if (key == 3) {
            setBodyVariable3(variableValue)
        }
        if (key == 4) {
            setBodyVariable4(variableValue)
        }
        if (key == 5) {
            setBodyVariable5(variableValue)
        }
        if (key == 6) {
            setBodyVariable6(variableValue)
        }

    }

    const handleHeaderVariables = (e: any, key: number) => {
        formik.handleChange(e)
        let variableValue = e.target.value;
        if (key == 1) {
            setHeaderVariable1(variableValue)
        }
        if (key == 2) {
            setHeaderVariable2(variableValue)
        }

        if (key == 3) {
            setHeaderVariable3(variableValue)
        }
        if (key == 4) {
            setHeaderVariable4(variableValue)
        }
        if (key == 5) {
            setHeaderVariable5(variableValue)
        }
    }
 
    let bodyVariable1Data
    let bodyVariable2Data
    let bodyVariable3Data
    let bodyVariable4Data
    let bodyVariable5Data
    let bodyVariable6Data
    let headerVariable1Data
    let headerVariable2Data
    let headerVariable3Data
    let headerVariable4Data
    let headerVariable5Data

    if (headerVariable1 !== '') {
        headerVariable1Data = {
            type: 'text',
            text: headerVariable1
        }
    }

    if (headerVariable2 !== '') {
        headerVariable2Data = {
            type: 'text',
            text: headerVariable2
        }
    }

    if (headerVariable3 !== '') {
        headerVariable3Data = {
            type: 'text',
            text: headerVariable3
        }
    }

    if (headerVariable4 !== '') {
        headerVariable4Data = {
            type: 'text',
            text: headerVariable4
        }
    }

    if (headerVariable5 !== '') {
        headerVariable5Data = {
            type: 'text',
            text: headerVariable5
        }
    }

    if (bodyVariable1 !== '') {
        bodyVariable1Data = {
            type: 'text',
            text: bodyVariable1
        }
    }

    if (bodyVariable2 !== '') {
        bodyVariable2Data = {
            type: 'text',
            text: bodyVariable2
        }
    }

    if (bodyVariable3 !== '') {
        bodyVariable3Data = {
            type: 'text',
            text: bodyVariable3
        }
    }


    if (bodyVariable4 !== '') {
        bodyVariable4Data = {
            type: 'text',
            text: bodyVariable4
        }
    }

    if (bodyVariable5 !== '') {
        bodyVariable5Data = {
            type: 'text',
            text: bodyVariable5
        }
    }

    if (bodyVariable6 !== '') {
        bodyVariable6Data = {
            type: 'text',
            text: bodyVariable6
        }
    }
    let header = {};
    let body = {};
    let headerParameters = [];
    let bodyParameters = [];

    if (headerVariable1Data) {
        headerParameters.push(headerVariable1Data)
    }

    if (headerVariable2Data) {
        headerParameters.push(headerVariable2Data)
    }
    if (headerVariable3Data) {
        headerParameters.push(headerVariable3Data)
    }
    if (headerVariable4Data) {
        headerParameters.push(headerVariable4Data)
    }
    if (headerVariable5Data) {
        headerParameters.push(headerVariable5Data)
    }

    if (bodyVariable1Data) {
        bodyParameters.push(bodyVariable1Data)
    }
    if (bodyVariable2Data) {
        bodyParameters.push(bodyVariable2Data)
    }
    if (bodyVariable3Data) {
        bodyParameters.push(bodyVariable3Data)
    }
    if (bodyVariable4Data) {
        bodyParameters.push(bodyVariable4Data)
    }
    if (bodyVariable5Data) {
        bodyParameters.push(bodyVariable5Data)
    }
    if (bodyVariable6Data) {
        bodyParameters.push(bodyVariable6Data)
    }
 
    const submitSendMessage = () => {
        formik.handleSubmit()
    }
    const redirectToCreateCampaign =  () => {
        setShowCampaignSection(true)
    }
    const showBroadcastSection =  () => {
        setShowCampaignSection(false)
    }

    const res = [headerVariableCount, bodyVariableCount].map((count, index) => Array(count).fill("").map((item, idx) => index === 0 ? { ['header' + idx]: "" } : { ['body' + idx]: "" })).flat().reduce((item, accumulator) => ({ ...item, ...accumulator }), {})

    const resValid = [headerVariableCount, bodyVariableCount].map((count, index) => Array(count).fill("").map((item, idx) => index === 0 ? { ['header' + idx]: Yup.string().required('Required') } : { ['body' + idx]: Yup.string().required('Required') })).flat().reduce((item, accumulator) => ({ ...item, ...accumulator }), {})

    
    useEffect(() => {
        if (headerData?.format === "IMAGE") {
            let publicUrl = headerData?.example?.header_handle[0];
            let fileName = templateData?.name;
            dispatch(mediaFileSave(whatsAppBusinessId, fileName, publicUrl));
        }
    }, [whatsAppBusinessId]);
    const formik = useFormik({
        initialValues: {
            to: '',
            ...res
        },
        validationSchema: Yup.object({
            to: Yup.array().required('Required'),
            ...resValid
        }),
        onSubmit: async (formValues) => {
            let phoneNumberId ="";

                if (headerVariableCount == 0) {
                    Object.assign(header, null)
                }
                else {
                        Object.assign(header, { "parameters": headerParameters })
                    
                }
        
                if (bodyVariableCount == 0) {
                    Object.assign({ body: null })
                }
                else {
                    Object.assign(body, { "parameters": bodyParameters })
                }
           
                if(headerData?.format === "IMAGE"){
                    let headerImageLink = [{
                         type: 'image',
                         image:{
                             "link":mediaSave?.url
                         } 
                     }]
                     Object.assign(header, { "parameters": headerImageLink })
                 }
                let to;
                if (contact) {
                    to = contact
                }
                let type = "template";
                let templateName = templateData?.name;
                let language = templateData?.language;
        
                const res =   await  dispatch(sendNewMessage(to,"", type, templateName,whatsAppBusinessId,"", language, body, header));
                if(res?.hasError){
                    enqueueSnackbar(res?.message, { variant: "error" })
                  }
                  else{
                    enqueueSnackbar("Created", { variant: "success" })  
                  }
                toggleTemplatesVariable();
                toggleTemplatesDetails();
    
        }
    });
    return (
        <React.Fragment>
            <Scrollbar style={{minHeight : "100vh"}}>
            <div>
                <div className="p-4">
              {showCampaignSection && <div className="user-chat-nav float-end">
                        <div id="logout">
                            {/* Button trigger addContactModal */}
                            <Button
                                type="button"
                                color="primary" 
                                onClick={showBroadcastSection}
                                block className=" waves-effect waves-light"
                            >
                                <i className="ri-arrow-go-back-line"></i> Back
                            </Button>
                        </div>
                        <UncontrolledTooltip target="logout" placement="bottom">
                           Back to broadcast home
                        </UncontrolledTooltip>
                    </div>}
                    <h4 className="mb-4">{t('Broadcast')}</h4>
                  
                    <Modal isOpen={campaignModal} centered toggle={toggleCampaign}>
                        <ModalHeader tag="h5" className="font-size-16" toggle={toggleCampaign}>
                            {t('Create New Campaign')}
                        </ModalHeader>
                        <ModalBody className="p-4">
                            {/* <Form>
                                <div className="mb-4">
                                    <Label className="form-label" htmlFor="addcontactemail-input">{t('Email')}</Label>
                                    <Input type="email" className="form-control" id="addcontactemail-input" placeholder="Enter Email" />
                                </div>
                                <div>
                                    <Label className="form-label" htmlFor="addcontact-invitemessage-input">{t('Invatation Message')}</Label>
                                    <textarea className="form-control" id="addcontact-invitemessage-input" rows={3} placeholder="Enter Message"></textarea>
                                </div>
                            </Form> */}
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="link" onClick={toggleCampaign}>Close</Button>
                            <Button type="button" color="primary">Next</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={templatesModal} centered toggle={toggleTemplates}>
                        <ModalHeader tag="h5" className="font-size-16" toggle={toggleTemplates}>
                            {t('Create New Template')}
                        </ModalHeader>
                        <ModalBody className="p-4">
                            {/* <Form>
                                <div className="mb-4">
                                    <Label className="form-label" htmlFor="addcontactemail-input">{t('Email')}</Label>
                                    <Input type="email" className="form-control" id="addcontactemail-input" placeholder="Enter Email" />
                                </div>
                                <div>
                                    <Label className="form-label" htmlFor="addcontact-invitemessage-input">{t('Invatation Message')}</Label>
                                    <textarea className="form-control" id="addcontact-invitemessage-input" rows={3} placeholder="Enter Message"></textarea>
                                </div>
                            </Form> */}
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="link" onClick={toggleTemplates}>Close</Button>
                            <Button type="button" color="primary">Next</Button>
                        </ModalFooter>
                    </Modal>

                    {!showCampaignSection ? <>
                        <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active:
                                        currentActiveTab === '1'
                                })}
                                onClick={() => { toggleTab('1'); }}
                            >
                                Campaigns
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active:
                                        currentActiveTab === '2'
                                })}
                                onClick={() => { toggleTab('2'); }}
                            >
                                Templates
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={currentActiveTab}>
                        <TabPane tabId="1">
                            {/* <Row>
                        <Col sm="3">
                        </Col>
                        <Col sm="6" >
                           <img src={campaigns} alt="" height="500"/>
                        </Col>
                        <Col sm="3">
                        </Col>
                    </Row> */}
                   <Row>
            
                   {customer?.userRoles[0]?.role?.roleName == 'MANAGER' || customer?.userRoles[0]?.role?.roleName == 'ACCOUNT_ADMIN' ?
                                  <><div className='col-lg-10'>
                                                <div className='pt-20 mb-5 text-grey'>
                                                    Click add campaign to send a broadcast message to a group of recipients at once.
                                                </div>
                                            </div><div className='col-lg-2  pt-20 right'>
                                                    <Button color="primary" block className=" waves-effect waves-light" onClick={() => redirectToCreateCampaign()}>Add Campaign</Button>
                                                </div></>
                            : <div className='mb-5'></div> }
                   </Row>
                            {campaignList.length>0 ? <CampaignHistoryItem campaignList={campaignList} /> :
                             
                             <div className='row'>
                              <div className='col-lg-3'>
                              </div>
                              <div className='col-lg-6 center pt-100'>
                                 {
                                 <img src={campaigns} alt="" className='broadcast-image' />
                                 }
                              </div>
                              <div className='col-lg-3'>
                              </div>
                          </div> 
                            }   
                           
                           
                           {/* 
                            <CampaignHistory/> */}
                        </TabPane>
                        <TabPane tabId="2">

                            {getTemplates?.waba_templates?.length==0 ?
                                <div className='row'>
                                    <div className='col-lg-3'>
                                    </div>
                                    <div className='col-lg-6 center pt-100'>
                                        <img src={templates} alt="" className='broadcast-image' />
                                        {/* <Alert color="danger" severity="error" isOpen={alert} toggle={onDismissAlert}>Please create Whatsapp Business Account</Alert> */}

                                        <Alert color="danger" severity="error" >Please create Whatsapp Business Account</Alert> 
                                        <div >
                                            {/* <Button color="primary"  block className=" waves-effect waves-light">Add</Button> */}
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                    </div>
                                </div>
                                :
                                <>


                                    {/* <div className='row'>
                                        <div className='col-lg-10'></div>
                                        <div className='col-lg-2  pt-20 right'>
                                            <Button color="primary" block className=" waves-effect waves-light" onClick={toggleTemplates}>Add Templates</Button>
                                        </div>
                                    </div> */}
                                    <div className='pt-20 pt-30'>
                                    {customer?.userRoles[0]?.role?.roleName == 'MANAGER' || customer?.userRoles[0]?.role?.roleName == 'ACCOUNT_ADMIN' ?
                                                <div className='text-grey'>
                                                        Click any template below to quickly send a message to any one of your contacts
                                                </div>
                                                : null
                                }
                                            
                                      
                                            <div className='pt-20'>
                                      {/* <h6>{row.displayName}</h6> */}
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
                                                       
                                                            <tbody >
                                                            {getTemplates?.waba_templates?.map((row, index) => (
                                                                <tr key={index} onClick={() => (toggleTemplatesDetails(), setTemplateDetails(row))} style={{ cursor: 'pointer' }}>
                                                                    <td>{index}</td>
                                                                    <td >{row.name} </td>
                                                                    <td>{row.language} </td>
                                                                    <td>{row.status}</td>
                                                                    <td>{row.category}</td>
                                                                </tr>
                                                                    ))}
                                                            </tbody>
                                                    
                                                    </Table>
                                                </div>
                                    </div>

                                </>

                            }
                        </TabPane>

                    </TabContent></> : <AddCampaign templates={getTemplates} showBroadcastSection={showBroadcastSection}/>}
                </div>
            </div>
            </Scrollbar>
            {/* Displaying template details */}
            <Modal isOpen={templateDetailsModal} centered toggle={toggleTemplatesDetails} style={{ maxWidth: '1000px' }}>
                <ModalHeader tag="h5" className="font-size-16" toggle={toggleTemplatesDetails}>
                    {t('Template')}
                </ModalHeader>
                <ModalBody className="p-4">
                    {templateData?.components.map(template =>
                        <Form key={template.text}>
                            {template.type == 'HEADER' &&
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
                    <Button type="button" onClick={toggleTemplatesVariable} color="primary">Use template</Button>
                </ModalFooter>
            </Modal>

            {/* Editing template variables */}
            <Modal isOpen={templateVariableModal} centered toggle={toggleTemplatesVariable} style={{ maxWidth: '1000px' }}>
                <ModalHeader tag="h5" className="font-size-16" toggle={toggleTemplatesVariable}>
                    {t('Edit variables')}
                </ModalHeader>
                <ModalBody className="p-4">

              
                <Form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                        <Label className="form-label" htmlFor="addcontact-invitemessage-input">To</Label>
                        <Multiselect options={allContacts}
                            displayValue="contactFirstName"
                            showCheckbox={true}
                            showArrow ={true}
                            onSelect={onSelectNewUsers}
                            onRemove={onRemoveNewUsers}
                            id='to'
                            placeholder='Select Contact'
                            hidePlaceholder={hidePlaceholder}
                            closeOnSelect
                            // disablePreSelectedValues={true}
                            disablePreSelectedValues={true}
                            name="to"
                            selectionLimit={1}
                        />
                             {formik.touched.to && formik.errors.to ? (
                                <FormFeedback type="invalid">{formik.errors.to}</FormFeedback>
                            ) : null}
                    </div>
                        {templateData?.components.map(template =>
                        <div>
                            {template.type == 'HEADER' &&
                                <div className="mb-4">
                                    <Label className="form-label" htmlFor="addcontactemail-input">Header</Label>
                                    <Input disabled type="text" contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" id="addcontactemail-input" value={template.text} />

                                    {new Array(headerVariableCount).fill('x').map((row, key) =>
                                        <div className="mb-4 pt-20">
                                            <Label className="form-label" >Variable {key + 1}</Label>
                                            <Input type="text"  className="form-control" id={key.toString()} name={"header" + key} onChange={(e) => handleHeaderVariables(e, (key + 1))} 
                                            invalid={formik.touched['header' + key] && formik.errors['header' + key] ? true : false}
                                            />
                                            {formik.touched['header' + key] && formik.errors['header' + key] ? (
                                                <FormFeedback type="invalid">{formik.errors['header' + key]}</FormFeedback>
                                            ) : null}
                                        </div>
                                        
                                    )}
                                </div>}
                                {template.type == 'BODY' &&
                                <div className="mb-4">
                                    <Label className="form-label" htmlFor="addcontact-invitemessage-input">Body</Label>
                                    <textarea disabled contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" id="addcontact-invitemessage-input" value={template.text} rows={10}></textarea>
                                    {new Array(bodyVariableCount).fill('x').map((row, key) =>
                                        <div key={key} className="mb-4 pt-20">
                                            <Label className="form-label" >Variable {key + 1}</Label>
                                            <Input  type="text"  name={"body" + key} className="form-control" id={key.toString()} onChange={(e) => handleBodyVariables(e, (key + 1))}
                                                invalid={formik.touched['body' + key] && formik.errors['body' + key] ? true : false}
                                            />
                                            {formik.touched['body' + key] && formik.errors['body' + key] ? (
                                                <FormFeedback type="invalid">{formik.errors['body' + key]}</FormFeedback>
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            }


                            {template.type == 'FOOTER' &&
                                <div className="mb-4">
                                    <Label className="form-label" htmlFor="addcontact-invitemessage-input">Footer</Label>
                                    <Input disabled type="text" contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" id="addcontactemail-input" value={template.text} />
                                </div>}

                                </div>
                                 )}
                        </Form>

                   
                 
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="link" onClick={toggleTemplatesVariable}>Close</Button>
                    <Button type="button" onClick={submitSendMessage} color="primary">Send</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}


export default (connect()(withTranslation()(Broadcast)));