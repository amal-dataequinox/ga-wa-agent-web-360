import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Card, Button, UncontrolledDropdown, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalHeader, ModalBody, Form, ModalFooter, InputGroup, FormFeedback, CardBody, Alert, Table, UncontrolledTooltip, Badge } from "reactstrap";
import { Link } from "react-router-dom";

import SimpleBar from "simplebar-react";

//Import components
import CustomCollapse from "../../../components/CustomCollapse";

//Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//i18n
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { RootState, useDispatch, useSelector } from '../../../redux-persist/store';
import { getCustomer } from '../../../redux-persist/slices/customer';
import { getAllUser } from '../../../redux-persist/slices/allUser';
import { createNewUser } from '../../../redux-persist/slices/createUser';
import team from "../../../assets/images/team.svg"
import addUser from "../../../assets/images/addUser.svg"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from "../../../assets/images/api.svg"
import Multiselect from 'multiselect-react-dropdown';
import { createNewWBAccount, updateWBAccountDetails } from '../../../redux-persist/slices/createWBAccount';
import { getAllTeam } from '../../../redux-persist/slices/teamsOfAccount';
import { createNewTeam } from '../../../redux-persist/slices/createTeam';
import { getAllUserOfATeam } from '../../../redux-persist/slices/usersOfTeam';
import { addNewUserToTeam } from '../../../redux-persist/slices/addUserToTeam';
import { getAllWBAccount } from '../../../redux-persist/slices/getWBAccounts';
import 'react-phone-input-2/lib/material.css';
import PhoneInput from "react-phone-input-2";
import parsePhoneNumber from 'libphonenumber-js';
import {CountryCode} from "libphonenumber-js/types"
import { useSnackbar } from "notistack";
function Settings(props: any) {

    const [addUserModal, setAddUserModal] = useState(false);
    const [addTeamModal, setAddTeamModal] = useState(false);
    const [configModal, setConfigModal] = useState(false);
    const [userOfTeamModal, setUsersOfTeamModal] = useState(false);
    const [addUserToTeamModal, setAddUserToTeamModal] = useState(false);
    const [addUserFlag, setAddUserFlag] = useState(false);
    const [webhookModal, setWebhookModal] = useState(false);
    const [updateWBAModal, setUpdateWBAModal] = useState(false);
    const [whatsAppBusinessId,setWhatsAppBusinessId] = useState("");
 

    const dispatch = useDispatch();
    //API data for getting customer
    const { customer } = useSelector(
        (state: RootState) => state.customer
    );

    const { allUser } = useSelector(
        (state: RootState) => state.allUser
    );

    const { createUser } = useSelector(
        (state: RootState) => state.createUser
    );

    const { createWBAccount } = useSelector(
        (state: RootState) => state.createWBAccount
    );

    const { teamsOfAccount } = useSelector(
        (state: RootState) => state.teamsOfAccount
    );

    const { createTeam } = useSelector(
        (state: RootState) => state.createTeam
    );

    const { usersOfTeam } = useSelector(
        (state: RootState) => state.usersOfTeam
    );

    const { addUserToTeam } = useSelector(
        (state: RootState) => state.addUserToTeam
    );

    const { getTemplates } = useSelector(
        (state: RootState) => state.getTemplates
    );

    const { getWBAccount } = useSelector(
        (state: RootState) => state.getWBAccount
    );

    useEffect(() => {
        dispatch(getCustomer());
        dispatch(getAllUser());
        dispatch(getAllWBAccount());

        dispatch(getAllTeam());
        if (allUser.length > 0) {
            setAddUserFlag(true);
            dispatch(getAllUser());
        }
    }, [dispatch]);

    const teamsListAll = [
        { teamId: teamsOfAccount[0].teamId, teamName: teamsOfAccount[0].teamName },
    ]

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(true);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    const [currentActiveTab, setCurrentActiveTab] = useState('1');
    const [campaignModal, setCampaignModal] = useState(false);
    const [hidePlaceholder, setHidePlaceholder] = useState(true);
    const [allSelected, setAllSelected] = useState(false);
    const [all, setAll] = useState([{ teamId: teamsOfAccount[0]?.teamId, teamName: teamsOfAccount[0]?.teamName }]);
    const [selectionLimit, setSelectionLimit] = useState(1);
    const [webhookUrl, setWebhookUrl] = useState('');
    const [verifyToken, setVerifyToken] = useState('');




    // Toggle active state for Tab
    const toggleTab = (tab: any) => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    }

    const toggleAddUser = () => {
        setAddUserModal(!addUserModal);
        formik.values.firstName=""
        formik.values.lastName=""
        formik.values.email=""
        formik.values.contactNumber=""
        formik.values.password=""
        formik.values.role=""
        formik.values.userName=""
        setPhone("")
    }
    
    const toggleUpdateWBA = () => {
        setUpdateWBAModal(!updateWBAModal)
    }

    const getWAId = (value:any) => {
        formikUpdateApiSettings.values.displayName=value.displayName;
        formikUpdateApiSettings.values.nameSpace=value.nameSpace;
        formikUpdateApiSettings.values.serverKey=value.apiKey;
        setWhatsAppBusinessId(value.whatsAppBusinessId);
    }

    const toggleWebhook = (value:any) => {
        setWebhookModal(!webhookModal);
        setWebhookUrl(value.webhookCallbackURL);
        setVerifyToken(value.verifyToken);
    }
    const toggleAddTeam = () => {
        setAddTeamModal(!addTeamModal);
        formikAddTeam.values.teamName="";
    }
    const toggleConfig = () => {
        setAll([{ teamId: teamsOfAccount[0].teamId, teamName: teamsOfAccount[0].teamName }]);
        selectTeam([{ teamId: teamsOfAccount[0].teamId, teamName: teamsOfAccount[0].teamName }])
        setConfigModal(!configModal);
        formikApiSettings.values.displayName="";
        formikApiSettings.values.serverKey="";
        formikApiSettings.values.teams=[];
        formikApiSettings.values.nameSpace="";
    }

    const toggleUserOfTeam = () => {
        setUsersOfTeamModal(!userOfTeamModal);
    }

    const toggleAddUsersToTeam = () => {
        setAddUserToTeamModal(!addUserToTeamModal);
    }

    const toggleCollapse1 = () => {
        setIsOpen1(!isOpen1);
        setIsOpen2(false);
        setIsOpen3(false);
        setIsOpen4(false);
        setIsOpen5(false);
    };

    const toggleCollapse2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen1(false);
        setIsOpen3(false);
        setIsOpen4(false);
        setIsOpen5(false);
    };

    const toggleCollapse3 = () => {
        setIsOpen3(!isOpen3);
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen4(false);
        setIsOpen5(false);
    };

    const toggleCollapse4 = () => {
        setIsOpen4(!isOpen4);
        setIsOpen1(false);
        setIsOpen3(false);
        setIsOpen2(false);
        setIsOpen5(false);
    };

    const toggleCollapse5 = () => {
        setIsOpen4(!isOpen5);
        setIsOpen1(false);
        setIsOpen3(false);
        setIsOpen2(false);
        setIsOpen4(false);
    };
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const { enqueueSnackbar } = useSnackbar();
    const submitUser = async (values: any) => {
        const res = await dispatch(createNewUser(
            values.firstName,
            values.lastName,
            values.userName,
            values.password,
            values.email,
            values.contactNumber,
            values.role,
        ))
        if(res?.hasError){
            enqueueSnackbar(res?.message, { variant: "error" })
          }
       
       else{
        toggleAddUser();
        //setAddUserFlag(false);
        updatePeople();
        formik.resetForm();
       }
    }

    const updatePeople = () => {
        dispatch(getAllUser());
        setAddUserFlag(true);
    }
 
    const copyText = (orderId: string) => {
		navigator.clipboard.writeText(orderId);
	};

    if (customer.firstName) {
        localStorage.setItem('firstName', customer.firstName);
    }

    if (customer.lastName) {
        localStorage.setItem('lastName', customer.lastName);
    }

    // validation
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            email: '',
            contactNumber: '',
            role: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name Required'),
            lastName: Yup.string().required('Last name Required'),
            userName: Yup.string().required('Username Required'),
            role: Yup.string().required('Role is required'),
            email: Yup.string().email('Enter proper email'),
            contactNumber: Yup.string(),
            password: Yup.string()
                .required('Password Required')
        }),
        onSubmit: async (values) =>
            submitUser(values),
    });

    const formikApiSettings = useFormik({
        initialValues: {
            displayName: '',
            nameSpace: '',
            serverKey: '',
            teams: [],
        },
        validationSchema: Yup.object({
            displayName: Yup.string().required('Display name required'),
            nameSpace: Yup.string().required('NameSpace required'),
            serverKey: Yup.string().required('Server key Required'),
            teams: Yup.array().required('Teams Required'),
        }),
        onSubmit: async (values) => {
            let res = await dispatch(createNewWBAccount(values));
            if (res?.hasError) {
                enqueueSnackbar(res?.message, { variant: "error" });
            }
            else {
                enqueueSnackbar("New whatsApp business account added", { variant: "success" });
                toggleConfig();
                updateApiSettings();
                formikApiSettings.resetForm();
            }

        }
        
    });

    const formikUpdateApiSettings = useFormik({
        initialValues: {
            displayName: '',
            nameSpace: '',
            serverKey: '',
        },
        validationSchema: Yup.object({
            displayName: Yup.string().required('Display name required'),
            nameSpace: Yup.string().required('NameSpace required'),
            serverKey: Yup.string().required('Server key Required'),
        }),
        onSubmit: async (values) => {
            let res = await dispatch(updateWBAccountDetails(whatsAppBusinessId,values));
            if (res?.hasError) {
                enqueueSnackbar(res?.message, { variant: "error" });
            }
            else {
                enqueueSnackbar("Updated", { variant: "success" });
                setUpdateWBAModal(!updateWBAModal)
                updateApiSettings();
                formikUpdateApiSettings.resetForm();
            }

        }
        
    });

    const onSelectTeam = (selectedList: any, selectedItem: string[]) => {
        setHidePlaceholder(true)

        let isAll = selectedList.map(data => data.teamName == 'All');
        if (isAll[0]) {

            setSelectionLimit(1)
            setAll([{ teamId: teamsOfAccount[0].teamId, teamName: teamsOfAccount[0].teamName }]);
            setAllSelected(true)
        }
        else {
            setSelectionLimit(3)
        }

        selectTeam(selectedList)
    }

    const onRemoveTeam = (selectedList: string[], selectedItem: string[]) => {
        setSelectionLimit(3)
        if (selectedList.length == 0) {
            setAll(teamsListAll);
            setSelectionLimit(1)
            selectTeam(teamsListAll)
        } else {
            selectTeam(selectedList)
        }
        selectTeam(selectedList)
    }

    const selectTeam = (selectedList: any) => {
        formikApiSettings.values.teams = selectedList
    }


    const updateApiSettings = () => {
        dispatch(getAllWBAccount());
    }

    const formikAddTeam = useFormik({
        initialValues: {
            teamName: ''
        },
        validationSchema: Yup.object({
            teamName: Yup.string().required('Team name Required'),
        }),
        onSubmit: async (values) =>
            submitAddTeam(values),
    });

    const submitAddTeam = async (values: any) => {
        await dispatch(createNewTeam(
            values,
        ));
        toggleAddTeam();
        updateTeam();
        formikAddTeam.resetForm();
    }

    const updateTeam = () => {
        dispatch(getAllTeam());
      
    }
    const displayUsersOfTeam = (teamId: string) => {
        localStorage.setItem('teamId', teamId);
        dispatch(getAllUserOfATeam(teamId));
        toggleUserOfTeam()
    }
  

    let difference = allUser.filter(x => !usersOfTeam.includes(x));

    const formikNewUsers = useFormik({
        initialValues: {
            users: ['']
        },
        validationSchema: Yup.object({
            users: Yup.string().required('Users Required'),

        }),
        onSubmit: async (values) =>
            submitNewUser(values),
    });

    const submitNewUser = (values: any) => {
        console.log(values);
    }
    const onSelectNewUsers = (selectedList: any, selectedItem: string[]) => {
        setHidePlaceholder(true)
        formikNewUsers.values.users = selectedList
    }

    const onRemoveNewUsers = (selectedList: string[], selectedItem: string[]) => {
        formikNewUsers.values.users = selectedList
    }
    const submitAddNewUserToTeam = () => {
        let newUserTemp = formikNewUsers.values.users.map((data: any) => { return { userId: data.userId } });

        dispatch(addNewUserToTeam(newUserTemp))
        toggleUserOfTeam()
        toggleAddUsersToTeam()
    }
    const [phoneValue, setPhone] = React.useState('');
    const [countryCode,setCountryCode ] = React.useState('in');
    const handlePhone = (phoneNumber :string, data :any, event:any, formatedText:string) => {
        const {countryCode} = data;
        setPhone(phoneNumber);
        setCountryCode(countryCode)
        formik.values.contactNumber = '+'+phoneNumber 
      }
    const phoneNumber = parsePhoneNumber(`+${phoneValue}`, countryCode.toUpperCase() as CountryCode)
    const isPhoneNumberValid = phoneNumber?.isValid();
    return (
        <React.Fragment>
            <div>
                <div className="p-4">
                    <h4 className="mb-4">{t('Settings')}</h4>

                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active:
                                        currentActiveTab === '1'
                                })}
                                onClick={() => { toggleTab('1'); }}
                            >
                                Profile
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
                                Users
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active:
                                        currentActiveTab === '3'
                                })}
                                onClick={() => { toggleTab('3'); }}
                            >
                                Teams
                            </NavLink>
                        </NavItem>
                        {customer.userRoles[0].role.roleName == 'ACCOUNT_ADMIN' ?
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active:
                                            currentActiveTab === '4'
                                    })}
                                    onClick={() => { toggleTab('4'); }}
                                >
                                    API Settings
                                </NavLink>
                            </NavItem> : null}
                        {customer.userRoles[0].role.roleName == 'ACCOUNT_ADMIN' ?
                            <NavItem>
                                <NavLink
                                    className={classnames({
                                        active:
                                            currentActiveTab === '5'
                                    })}
                                    onClick={() => { toggleTab('5'); }}
                                >
                                    Billing & Subscription
                                </NavLink>
                            </NavItem> : null}
                    </Nav>
                    <TabContent activeTab={currentActiveTab}className="height-100vh">
                        <TabPane tabId="1">

                            <div className="text-center border-bottom p-4">
                                <div className="mb-4 profile-user">
                                    {/* <img src={customer.firstName.slice(0)} className="rounded-circle avatar-lg img-thumbnail" alt="chatvia" /> */}
                                    <h2 className="rounded-circle  p-4 img-thumbnail"> {customer.firstName.slice(0, 1).toUpperCase()}{customer.lastName.slice(0, 1).toUpperCase()} </h2>
                                    {/* <Button type="button" color="light" className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                        <i className="ri-pencil-fill"></i>
                                    </Button> */}

                                </div>

                                <h5 className="font-size-16 mb-1 text-truncate">{customer.firstName} {customer.lastName}</h5>
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="d-inline-block mb-1">
                                    <DropdownToggle tag="a" className="text-muted pb-1 d-block" >
                                        {t('Available')} <i className="mdi mdi-chevron-down"></i>
                                    </DropdownToggle>

                                    <DropdownMenu>
                                        <DropdownItem>{t('Available')}</DropdownItem>
                                        <DropdownItem>{t('Busy')}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            {/* End profile user */}

                            {/* Start User profile description */}
                            <SimpleBar style={{ maxHeight: "100%" }} className="p-4 user-profile-desc">

                                <div id="profile-setting-accordion" className="custom-accordion">
                                    <Card className="shadow-none border mb-2">
                                        <CustomCollapse
                                            title="Personal Info"
                                            isOpen={isOpen1}
                                            toggleCollapse={toggleCollapse1}
                                        >

                                            <div className="float-end">
                                                <Button color="light" size="sm" type="button" ><i className="ri-edit-fill me-1 align-middle"></i> {t('Edit')}</Button>
                                            </div>

                                            <div>
                                                <p className="text-muted mb-1">{t('Name')}</p>
                                                <h5 className="font-size-14">{customer.firstName} {customer.lastName}</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">{t('Email')}</p>
                                                <h5 className="font-size-14">{customer.email}</h5>
                                            </div>


                                            <div className="mt-4">
                                                <p className="text-muted mb-1">{t('Contact Number')}</p>
                                                <h5 className="font-size-14">{customer.contactNumber}</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">{t('Role name')}</p>
                                                <h5 className="font-size-14">{customer.userRoles[0].role.description}</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">{t('Account name')}</p>
                                                <h5 className="font-size-14">{customer.account.accountName}</h5>
                                            </div>
                                            {/* 
                                            <div className="mt-4">
                                                <p className="text-muted mb-1">{t('Time')}</p>
                                                <h5 className="font-size-14">{customer.userName}</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">{t('Location')}</p>
                                                <h5 className="font-size-14 mb-0">{t('California, USA')}</h5>
                                            </div> */}
                                        </CustomCollapse>
                                    </Card>
                                    {/* end profile card */}

                                    <Card className="shadow-none border mb-2">
                                        <CustomCollapse
                                            title="Privacy"
                                            isOpen={isOpen2}
                                            toggleCollapse={toggleCollapse2}
                                        >

                                            <div className="py-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-1 overflow-hidden">
                                                        <h5 className="font-size-13 mb-0 text-truncate">{t('Profile photo')}</h5>
                                                    </div>
                                                    <UncontrolledDropdown className="ms-2">
                                                        <DropdownToggle className="btn btn-light btn-sm w-sm" tag="button">
                                                            {t('Everyone')} <i className="mdi mdi-chevron-down"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu right>
                                                            <DropdownItem>{t('Everyone')}</DropdownItem>
                                                            <DropdownItem>{t('selected')}</DropdownItem>
                                                            <DropdownItem>{t('Nobody')}</DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                            </div>
                                            <div className="py-3 border-top">
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-1 overflow-hidden">
                                                        <h5 className="font-size-13 mb-0 text-truncate">{t('Last seen')}</h5>

                                                    </div>
                                                    <div className="ms-2">
                                                        <div className="form-check form-switch">
                                                            <Input type="checkbox" className="form-check-input" id="privacy-lastseenSwitch" defaultChecked />
                                                            <Label className="form-check-label" htmlFor="privacy-lastseenSwitch"></Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="py-3 border-top">
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-1 overflow-hidden">
                                                        <h5 className="font-size-13 mb-0 text-truncate">{t('Status')}</h5>

                                                    </div>
                                                    <UncontrolledDropdown className="ms-2">
                                                        <DropdownToggle className="btn btn-light btn-sm w-sm" tag="button">
                                                            {t('Everyone')} <i className="mdi mdi-chevron-down"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu right>
                                                            <DropdownItem>{t('Everyone')}</DropdownItem>
                                                            <DropdownItem>{t('selected')}</DropdownItem>
                                                            <DropdownItem>{t('Nobody')}</DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                            </div>

                                            <div className="py-3 border-top">
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-1 overflow-hidden">
                                                        <h5 className="font-size-13 mb-0 text-truncate">{t('Read receipts')}</h5>

                                                    </div>
                                                    <div className="ms-2">
                                                        <div className="form-check form-switch">
                                                            <Input type="checkbox" className="form-check-input" id="privacy-readreceiptSwitch" defaultChecked />
                                                            <Label className="form-check-label" htmlFor="privacy-readreceiptSwitch"></Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="py-3 border-top">
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-1 overflow-hidden">
                                                        <h5 className="font-size-13 mb-0 text-truncate">{t('Groups')}</h5>

                                                    </div>
                                                    <UncontrolledDropdown className="ms-2">
                                                        <DropdownToggle className="btn btn-light btn-sm w-sm" tag="button">
                                                            {t('Everyone')} <i className="mdi mdi-chevron-down"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu right>
                                                            <DropdownItem>{t('Everyone')}</DropdownItem>
                                                            <DropdownItem>{t('selected')}</DropdownItem>
                                                            <DropdownItem>{t('Nobody')}</DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                            </div>
                                        </CustomCollapse>
                                    </Card>
                                    {/* end Privacy card */}

                                    <Card className="accordion-item border mb-2">
                                        <CustomCollapse
                                            title="Security"
                                            isOpen={isOpen3}
                                            toggleCollapse={toggleCollapse3}
                                        >

                                            <div>
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-1 overflow-hidden">
                                                        <h5 className="font-size-13 mb-0 text-truncate">{t('Show security notification')}</h5>

                                                    </div>
                                                    <div className="ms-2 me-0">
                                                        <div className="form-check form-switch">
                                                            <Input type="checkbox" className="form-check-input" id="security-notificationswitch" />
                                                            <Label className="form-check-label" htmlFor="security-notificationswitch"></Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CustomCollapse>
                                    </Card>
                                    {/* end Security card */}

                                    <Card className="shadow-none border mb-2">
                                        <CustomCollapse
                                            title="Help"
                                            isOpen={isOpen4}
                                            toggleCollapse={toggleCollapse4}
                                        >

                                            <div>
                                                <div className="py-3">
                                                    <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">{t('FAQs')}</Link></h5>
                                                </div>
                                                <div className="py-3 border-top">
                                                    <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">{t('Contact')}</Link></h5>
                                                </div>
                                                <div className="py-3 border-top">
                                                    <h5 className="font-size-13 mb-0"><Link to="#" className="text-body d-block">{t('Terms & Privacy policy')}</Link></h5>
                                                </div>
                                            </div>
                                        </CustomCollapse>
                                    </Card>
                                    {/* end Help card */}
                                </div>
                                {/* end profile-setting-accordion */}
                            </SimpleBar>
                            {/* End User profile description */}
                        </TabPane>
                        <TabPane tabId="2">
                            {allUser.length == 1 ?
                                <div className='row'>
                                    <div className='col-lg-3'>
                                    </div>
                                    <div className='col-lg-6 center pt-100'>
                                        <img src={addUser} alt="" className='add-team-image' />
                                        <div className="">
                                            <Button color="primary" onClick={toggleAddUser} block className=" waves-effect waves-light" >{t('Add User')}</Button>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                    </div>
                                </div> :

                                <>
                                    {addUserFlag == true &&
                                        <div className='row'>
                                            <div className='col-lg-0'>
                                            </div>
                                            <div className='col-lg-12 center '>

                                                {customer.userRoles[0].role.roleName == 'MANAGER' || customer.userRoles[0].role.roleName == 'ACCOUNT_ADMIN' ?
                                                    <div className='row pt-20'>
                                                        <div className='col-lg-10'>
                                                        </div>
                                                        <div className='col-lg-2'>
                                                            <Button color="primary" onClick={toggleAddUser} block className="float-right waves-effect waves-light" >{t('Add User')}</Button>
                                                        </div>

                                                    </div> : null}
                                                <div className='pt-20'>
                                                    <Table responsive striped bordered hover>
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>User Name</th>
                                                                <th>Email</th>
                                                                <th>Contact Number</th>
                                                                <th>Role</th>
                                                                <th>Action</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {allUser.map((row) => (
                                                                <tr key={row.userId}>
                                                                    <td>{row.firstName} {row.lastName}</td>
                                                                    <td>{row.userName}</td>
                                                                    <td>{row.email}</td>
                                                                    <td>{row.contactNumber}</td>
                                                                    <td>{row.userRoles[0].role.description}</td>
                                                                    <td> <i className='ri-edit-box-line'> </i> </td>
                                                                </tr>))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                            <div className='col-lg-0'>
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                        </TabPane>
                        <TabPane tabId="3">
                            {teamsOfAccount.length > 0 ?

                                <>
                                   <div className='row'>
                                            <div className='col-lg-10'></div>
                                            <div className='col-lg-2  pt-20 right'>
                                                <Button color="primary" block className=" waves-effect waves-light" onClick={toggleAddTeam}>Add Team</Button>
                                            </div>
                                        </div>
                                        <div className='row pt-20'>
                                                <div className='col-lg-0'>
                                                </div>
                                                <div className='col-lg-12 center '>

                                                    <div className='pt-20'>

                                                        <SimpleBar style={{ maxHeight: "100%" }} className="p-4 chat-message-list chat-group-list">


                                                            <ul className="list-unstyled chat-list">
                                                                {teamsOfAccount.map((group) => <li key={group.teamId}>
                                                                    <Link to="#" onClick={() => displayUsersOfTeam(group.teamId)}>
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="chat-user-img me-3 ms-0">
                                                                                <div className="avatar-xs">
                                                                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                        {group.teamName.charAt(0)}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className=" overflow-hidden">
                                                                                <h5 className="text-truncate font-size-14 mb-0">
                                                                                    {group.teamName}
                                                                                    {/* {
            group.unRead !== 0
                ? <Badge color="none" pill className="badge-soft-danger float-end">
                    {
                        group.unRead >= 20 ? group.unRead + "+" : group.unRead
                    }
                </Badge>
                : null
        }

        {
            group.isNew && <Badge color="none" pill className="badge-soft-danger float-end">New</Badge>
        } */}

                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </li>
                                                                )}
                                                            </ul>
                                                        </SimpleBar>


                                                        {/* <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Role</th>
                    <th>Action</th>

                </tr>
            </thead>
            <tbody>
                {allUser.map((row) => (
                    <tr key={row.userId}>
                        <td>{row.firstName} {row.lastName}</td>
                        <td>{row.userName}</td>
                        <td>{row.email}</td>
                        <td>{row.contactNumber}</td>
                        <td>{row.userRoles[0].role.description}</td>
                        <td> <i className='ri-edit-box-line'> </i> </td>
                    </tr>))}
            </tbody>
        </Table> */}
                                                    </div>
                                                </div>
                                                <div className='col-lg-0'>
                                                </div>
                                            </div>
                                </>


                                :

                                <div className='row'>
                                    <div className='col-lg-3'>
                                    </div>
                                    <div className='col-lg-6 center pt-100'>
                                        <img src={team} alt="" className='add-team-image' />
                                        <div className="">
                                            <Button color="primary" onClick={toggleAddTeam} block className=" waves-effect waves-light" >{t('Add Team')}</Button>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                    </div>
                                </div>
                            }
                        </TabPane>
                        <TabPane tabId="4">
                            {getWBAccount.length > 0 ?

                                <>
                                    <div className='row'>
                                        <div className='col-lg-10'></div>
                                        <div className='col-lg-2  pt-20 right'>
                                            <Button color="primary" block className=" waves-effect waves-light" onClick={toggleConfig}>Add Configuration</Button>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-3'>
                                        </div>
                                        <div className='col-lg-6 center '>

                                            <div className='pt-20'>
                                                <Table responsive bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th> Whatsapp Business Id</th>
                                                            <th>Display Name</th>
                                                            <th>Webhook</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {getWBAccount.map((row) => (
                                                            <tr key={row.whatsAppBusinessId}>
                                                                <td><i onClick={()=>(toggleUpdateWBA(),getWAId(row))} className="ri-edit-box-line pointer"></i></td>
                                                                <td style={{verticalAlign:"middle"}}>{row.whatsAppBusinessId}</td>
                                                                <td style={{verticalAlign:"middle"}}>{row.displayName}</td>
                                                                <td> <Button color="light" onClick={()=>toggleWebhook(row)} block outline className="waves-effect waves-light" >{t('Configure')}</Button></td>
                                                            </tr>))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                        <div className='col-lg-3'>
                                        </div>
                                    </div></>
                                :

                                <div className='row'>
                                    <div className='col-lg-3'>
                                    </div>
                                    <div className='col-lg-6 center pt-100'>
                                        <img src={api} alt="" className='api-setting-image' />
                                        <div className='pt-20'>
                                            <Button color="primary" onClick={toggleConfig} block className=" waves-effect waves-light" type="submit">Configure</Button>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                    </div>
                                </div>
                            }


                        </TabPane>

                        <TabPane tabId="5">
                            <div className='row'>

                            </div>
                        </TabPane>
                    </TabContent>


                </div>
            </div>
            {/* Start Add contact Modal */}
            <Modal  isOpen={addUserModal} centered toggle={toggleAddUser}>
                <ModalHeader tag="h5" className="font-size-16" toggle={toggleAddUser}>
                    {t('Add User')}
                </ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-4">
                            {
                                props.error && <Alert variant="danger">{props.error}</Alert>
                            }
                            {
                                props.user && <Alert variant="success">Added!</Alert>
                            }
                            <div className="p-3">

                                <Form onSubmit={formik.handleSubmit}>

                                    <div className="row mb-3">
                                        <div className='col-lg-6'>
                                            <Label className="form-label">{t('First name')}</Label>
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <span className="input-group-text text-muted">
                                                    <i className="ri-user-2-line"></i>
                                                </span>
                                                <Input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    className="form-control form-control-lg bg-soft-light border-light"
                                                    placeholder="Enter your First name"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.firstName}
                                                    invalid={formik.touched.firstName && formik.errors.firstName ? true : false}
                                                />
                                                {formik.touched.firstName && formik.errors.firstName ? (
                                                    <FormFeedback type="invalid">{formik.errors.firstName}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                        <div className='col-lg-6'>
                                            <Label className="form-label">{t('Last name')}</Label>
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <span className="input-group-text text-muted">
                                                    <i className="ri-user-2-line"></i>
                                                </span>
                                                <Input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    className="form-control form-control-lg bg-soft-light border-light"
                                                    placeholder="Enter your Last name"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.lastName}
                                                    invalid={formik.touched.lastName && formik.errors.lastName ? true : false}
                                                />
                                                {formik.touched.lastName && formik.errors.lastName ? (
                                                    <FormFeedback type="invalid">{formik.errors.lastName}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <Label className="form-label">{t('Role')}</Label>
                                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                            <span className="input-group-text text-muted">
                                                <i className="ri-user-2-line"></i>
                                            </span>
                                            <Input
                                                type="text"
                                                id="role"
                                                name="role"
                                                className="form-control form-control-lg bg-soft-light border-light"
                                                placeholder="Enter role"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.role}
                                                invalid={formik.touched.role && formik.errors.role ? true : false}
                                                list='list'
                                            />
                                            <datalist id="list">
                                                <option value="ACCOUNT_ADMIN">ACCOUNT_ADMIN</option>
                                                <option value="MANAGER">MANAGER</option>
                                                <option value="AGENT">AGENT</option>
                                            </datalist>


                                            {formik.touched.role && formik.errors.role ? (
                                                <FormFeedback type="invalid">{formik.errors.role}</FormFeedback>
                                            ) : null}
                                        </InputGroup>
                                    </div>

                                    <div className="row mb-3">
                                        <div className='col-lg-6'>
                                            <Label className="form-label">{t('Username')}</Label>
                                            <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                <span className="input-group-text border-light text-muted">
                                                    <i className="ri-user-2-line"></i>
                                                </span>
                                                <Input
                                                    type="text"
                                                    id="userName"
                                                    name="userName"
                                                    className="form-control form-control-lg bg-soft-light border-light"
                                                    placeholder="Enter Username"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.userName}
                                                    invalid={formik.touched.userName && formik.errors.userName ? true : false}
                                                />
                                                {formik.touched.userName && formik.errors.userName ? (
                                                    <FormFeedback type="invalid">{formik.errors.userName}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                        <div className='col-lg-6'>
                                            <Label className="form-label">{t('Password')}</Label>
                                            <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                <span className="input-group-text border-light text-muted">
                                                    <i className="ri-lock-2-line"></i>
                                                </span>
                                                <Input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control form-control-lg bg-soft-light border-light"
                                                    placeholder="Enter Password"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.password}
                                                    invalid={formik.touched.password && formik.errors.password ? true : false}
                                                />
                                                {formik.touched.password && formik.errors.password ? (
                                                    <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                                ) : null}

                                            </InputGroup>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className='col-lg-6'>
                                            <Label className="form-label">{t('Email')}</Label>
                                            <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                <span className="input-group-text text-muted">
                                                    <i className="ri-mail-line"></i>
                                                </span>
                                                <Input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    className="form-control form-control-lg bg-soft-light border-light"
                                                    placeholder="Enter Email"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.email}
                                                    invalid={formik.touched.email && formik.errors.email ? true : false}
                                                />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                                                ) : null}
                                            </InputGroup>
                                        </div>
                                        <div className='col-lg-6'>
                                            <Label className="form-label">{t('Mobile number')}</Label>
                                            
                                               {/*  <Input
                                                    type="text"
                                                    id="contactNumber"
                                                    name="contactNumber"
                                                    className="form-control form-control-lg bg-soft-light border-light"
                                                    placeholder="Enter mobile number"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.contactNumber}
                                                    invalid={formik.touched.contactNumber && formik.errors.contactNumber ? true : false}
                                                /> */}
                                                 <PhoneInput inputStyle={{
                                                    width : `100%`,
                                                    padding: `0.5rem 3rem`,
                                                    borderColor : `#e6ebf5`,
                                                    backgroundColor : `rgba(230, 235, 245, 0.25)`
                                                }}
                                                dropdownStyle={{
                                                    width : 274
                                                }}
                                                    specialLabel=''
                                                    placeholder=''
                                                    inputProps={{
                                                    name: "contactNumber",
                                                    required: true,                            
                                                    }}     
                                                    country={'in'}
                                                    value={phoneValue}
                                                    onChange={handlePhone }
                                                    isValid={Boolean(!(formik.touched.contactNumber && !isPhoneNumberValid ))}         
                                                 />
                                                {formik.touched.contactNumber && !isPhoneNumberValid ? (
                                                    <FormFeedback type="invalid">{formik.errors.contactNumber}</FormFeedback>
                                                ) : null}
                                           
                                        </div>
                                    </div>


                                    <div className="d-grid pt-20" >
                                        <Button color="primary" block className=" waves-effect waves-light" type="submit">Add User</Button>
                                    </div>

                                </Form>
                            </div>
                        </CardBody>
                    </Card>
                </ModalBody>
                {/* <ModalFooter>
                    <Button type="button" color="link" onClick={toggleAddUser}>Close</Button>
                    <Button  color="primary"  type="submit" onClick={={}}>Add User</Button>
                </ModalFooter> */}
            </Modal>

            {/* Start Config Modal */}
            <Modal  isOpen={configModal} centered toggle={toggleConfig}>
                <ModalHeader tag="h5" className="font-size-16" toggle={toggleConfig}>
                    {t('Add Configuration')}
                </ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-4">
                            <div className="p-3">
                                <Form onSubmit={formikApiSettings.handleSubmit}>
                                    <div className="mb-3">

                                        <Label className="form-label">{t('Display Name')}</Label>
                                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                            <span className="input-group-text text-muted">
                                                <i className="ri-user-2-line"></i>
                                            </span>
                                            <Input
                                                type="text"
                                                id="displayName"
                                                name="displayName"
                                                className="form-control form-control-lg bg-soft-light border-light"
                                                placeholder="Enter Display Name"
                                                onChange={formikApiSettings.handleChange}
                                                onBlur={formikApiSettings.handleBlur}
                                                value={formikApiSettings.values.displayName}
                                                invalid={formikApiSettings.touched.displayName && formikApiSettings.errors.displayName ? true : false}
                                            />
                                            {formikApiSettings.touched.displayName && formikApiSettings.errors.displayName ? (
                                                <FormFeedback type="invalid">{formikApiSettings.errors.displayName}</FormFeedback>
                                            ) : null}
                                        </InputGroup>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="form-label">{t('Name space')}</Label>
                                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                            <span className="input-group-text text-muted">
                                                <i className="ri-user-2-line"></i>
                                            </span>
                                            <Input
                                                type="text"
                                                id="nameSpace"
                                                name="nameSpace"
                                                className="form-control form-control-lg bg-soft-light border-light"
                                                placeholder="Enter your Name space"
                                                onChange={formikApiSettings.handleChange}
                                                onBlur={formikApiSettings.handleBlur}
                                                value={formikApiSettings.values.nameSpace}
                                                invalid={formikApiSettings.touched.nameSpace && formikApiSettings.errors.nameSpace ? true : false}
                                            />
                                            {formikApiSettings.touched.nameSpace && formikApiSettings.errors.nameSpace ? (
                                                <FormFeedback type="invalid">{formikApiSettings.errors.nameSpace}</FormFeedback>
                                            ) : null}
                                        </InputGroup>
                                    </div>



                                    <div className="mb-3">
                                        <Label className="form-label">{t('Server Key')}</Label>
                                        <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                            <span className="input-group-text border-light text-muted">
                                                <i className="ri-user-2-line"></i>
                                            </span>
                                            <Input
                                                type="text"
                                                id="serverKey"
                                                name="serverKey"
                                                className="form-control form-control-lg bg-soft-light border-light"
                                                placeholder="Enter server key"
                                                onChange={formikApiSettings.handleChange}
                                                onBlur={formikApiSettings.handleBlur}
                                                value={formikApiSettings.values.serverKey}
                                                invalid={formikApiSettings.touched.serverKey && formikApiSettings.errors.serverKey ? true : false}
                                            />
                                            {formikApiSettings.touched.serverKey && formikApiSettings.errors.serverKey ? (
                                                <FormFeedback type="invalid">{formikApiSettings.errors.serverKey}</FormFeedback>
                                            ) : null}
                                        </InputGroup>
                                    </div>

                                    <div className='mb-3'>
                                        <Label className="form-label">{t('Teams')}</Label>
                                        <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                            {/* <span className="input-group-text border-light text-muted">
                                                <i className="ri-lock-2-line"></i>
                                            </span> */}
                                            {/* <Input
                                                    type="select"
                                                    id="teams"
                                                    name="teams"
                                                    multiple={true} 
                                                   
                                                    className="form-control form-control-lg bg-soft-light border-light"
                                                    placeholder="Enter Teams"
                                                    onChange={formikApiSettings.handleChange}
                                                    onBlur={formikApiSettings.handleBlur}
                                                    value={formikApiSettings.values.teams}
                                                    invalid={formikApiSettings.touched.teams && formikApiSettings.errors.teams ? true : false}
                                                >
                                                    {teamsList}
                                                </Input>, */}
                                            <div className='full-width-team'>
                                                <Multiselect options={teamsOfAccount}
                                                    displayValue="teamName"
                                                    showCheckbox={true}
                                                    onSelect={onSelectTeam}
                                                    onRemove={onRemoveTeam}
                                                    selectedValues={all}
                                                    placeholder='Select Team'
                                                    hidePlaceholder={hidePlaceholder}
                                                    closeOnSelect={true}
                                                    // disablePreSelectedValues={true}
                                                    selectionLimit={selectionLimit}
                                                />
                                                      {formikApiSettings.touched.teams && formikApiSettings.errors.teams ? (
                                                <FormFeedback type="invalid">{formikApiSettings.errors.teams}</FormFeedback>
                                            ) : null}
                                            </div>
                                      

                                        </InputGroup>
                                    </div>

                                    <div className="d-grid pt-20" >
                                        <Button color="primary" block className=" waves-effect waves-light" type="submit" >Add</Button>
                                    </div>

                                </Form>
                            </div>
                        </CardBody>
                    </Card>
                </ModalBody>
                {/* <ModalFooter>
                    <Button type="button" color="link" onClick={toggleConfig}>Close</Button>
                    <Button  color="primary"  type="submit" onClick={={}}>Add User</Button>
                </ModalFooter> */}
            </Modal>

            {/* Start Add Team Modal */}
            <Modal  isOpen={addTeamModal} centered toggle={toggleAddTeam}>
                <ModalHeader tag="h5" className="font-size-16" toggle={toggleAddTeam}>
                    {t('Add Team')}
                </ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-4">
                            <div className="p-3">
                                <Form onSubmit={formikAddTeam.handleSubmit}>
                                    <div className="mb-3">
                                        <Label className="form-label">{t('Team name')}</Label>
                                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                            <span className="input-group-text text-muted">
                                                <i className="ri-user-2-line"></i>
                                            </span>
                                            <Input
                                                type="text"
                                                id="teamName"
                                                name="teamName"
                                                className="form-control form-control-lg bg-soft-light border-light"
                                                placeholder="Enter your First name"
                                                onChange={formikAddTeam.handleChange}
                                                onBlur={formikAddTeam.handleBlur}
                                                value={formikAddTeam.values.teamName}
                                                invalid={formikAddTeam.touched.teamName && formikAddTeam.errors.teamName ? true : false}
                                            />
                                            {formikAddTeam.touched.teamName && formikAddTeam.errors.teamName ? (
                                                <FormFeedback type="invalid">{formikAddTeam.errors.teamName}</FormFeedback>
                                            ) : null}
                                        </InputGroup>
                                    </div>

                                    <div className="d-grid pt-50" >
                                        <Button color="primary" block className=" waves-effect waves-light" type="submit">Add Team</Button>
                                    </div>

                                </Form>
                            </div>
                        </CardBody>
                    </Card>
                </ModalBody>
                {/* <ModalFooter>
                    <Button type="button" color="link" onClick={toggleAddUser}>Close</Button>
                    <Button  color="primary"  type="submit" onClick={={}}>Add User</Button>
                </ModalFooter> */}
            </Modal>

            {/* Start showing Users Of Team Modal */}
            <Modal  isOpen={userOfTeamModal} centered toggle={toggleUserOfTeam} style={{ maxWidth: '1000px' }}>
                <ModalHeader tag="h5" className="font-size-16" toggle={toggleUserOfTeam}>
                    {t('Add Users')}

                </ModalHeader>
                <ModalBody className="p-4 ">
                    <div className='row '>
                        <div className="user-chat-nav right">
                            <div id="add-users">
                                {/* Button trigger modal */}
                                <Button type="button" color="link" onClick={toggleAddUsersToTeam} className="text-decoration-none text-muted font-size-18 py-0">
                                    <i className="ri-user-add-line"></i>
                                </Button>
                            </div>
                            <UncontrolledTooltip target="add-users" placement="bottom">
                                Add Users
                            </UncontrolledTooltip>
                        </div>
                    </div>

                    <div className='pt-20'>
                        <Table responsive striped bordered hover style={{ minHeight: '500px' }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Contact Number</th>
                                    <th>Role</th>

                                </tr>
                            </thead>
                            <tbody>
                                {usersOfTeam !== null && usersOfTeam.map((row) => (
                                    <tr key={row.userId}>
                                        <td>{row.firstName} {row.lastName}</td>
                                        <td>{row.userName}</td>
                                        <td>{row.email}</td>
                                        <td>{row.contactNumber}</td>
                                        <td>{row.userRoles[0].role.description}</td>

                                    </tr>))}
                            </tbody>
                        </Table>
                    </div>

                </ModalBody>
                {/* <ModalFooter>
                    <Button type="button" color="link" onClick={toggleAddUser}>Close</Button>
                    <Button  color="primary"  type="submit" onClick={={}}>Add User</Button>
                </ModalFooter> */}
            </Modal>

            {/* Start Add Users to Team Modal */}
            <Modal  isOpen={addUserToTeamModal} centered toggle={toggleAddUsersToTeam} style={{ maxWidth: '1000px' }}>
                <ModalHeader tag="h5" className="font-size-16" toggle={toggleAddUsersToTeam}>
                    {t('Add users to team')}

                </ModalHeader>
                <ModalBody className="p-4 ">
                    <div className='pt-20'>
                        <Form>
                            <Table responsive striped bordered hover style={{ minHeight: '500px' }}>
                                <thead>
                                    <tr>
                                        {/* <th>Name</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Contact Number</th>
                                    <th>Role</th> */}
                                        <th>Select</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* <td>{row.firstName} {row.lastName}</td>
                                        <td>{row.userName}</td>
                                        <td>{row.email}</td>
                                        <td>{row.contactNumber}</td>
                                        <td>{row.userRoles[0].role.description}</td> */}
                                        <td>
                                            <Multiselect 
                                             options={difference}
                                                displayValue="userName"
                                                showCheckbox={true}
                                                onSelect={onSelectNewUsers}
                                                onRemove={onRemoveNewUsers}
                                                id='users'
                                                placeholder='Select Users'
                                                hidePlaceholder={hidePlaceholder}
                                                closeOnSelect={true}
                                                // disablePreSelectedValues={true}
                                                disablePreSelectedValues={true}
                                            />
                                        </td>

                                    </tr>
                                </tbody>
                            </Table>

                            <div className=" pt-20" >
                                <div className='row'>
                                    <div className='col-lg-4'></div>
                                    <div className='col-lg-4 d-grid'>
                                        <Button color="primary" block className=" waves-effect waves-light" onClick={() => submitAddNewUserToTeam()}>Add Users</Button>
                                    </div>
                                    <div className='col-lg-4'></div>
                                </div>
                            </div>
                        </Form>
                    </div>

                </ModalBody>
                {/* <ModalFooter>
                    <Button type="button" color="link" onClick={toggleAddUser}>Close</Button>
                    <Button  color="primary"  type="submit" onClick={={}}>Add User</Button>
                </ModalFooter> */}
            </Modal>

            {/* Start webhook modal */}
            <Modal isOpen={webhookModal} centered toggle={toggleWebhook}>
                <ModalHeader tag="h5" className="font-size-16" toggle={toggleWebhook}>
                    {t('Webhook configuration')}
                </ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-4">
                            <div className="p-3">
                                <Form>
                                    <div className="mb-3">
                                        <Label className="form-label">{t('Webhook URL')}</Label>
                                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                            <Input
                                                type="text"
                                                id="verifyToken"
                                                name="verifyToken"
                                                className="form-control form-control-lg bg-soft-light border-light"
                                                value={webhookUrl}
                                            />
                                        </InputGroup>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="form-label">{t('Verify token')}</Label>
                                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                            <Input
                                                type="text"
                                                id="verifyToken"
                                                name="verifyToken"
                                                className="form-control form-control-lg bg-soft-light border-light"
                                                value={verifyToken}
                                            />
                                        </InputGroup>
                                    </div>
                                </Form>
                            </div>
                            <h6 style={{textAlign:"center"}}>Copy this values to configure webhook in Meta app dashboard</h6>
                        </CardBody>
                    </Card>
                </ModalBody>
                {/* <ModalFooter>
                    <Button type="button" color="link" onClick={toggleAddUser}>Close</Button>
                    <Button  color="primary"  type="submit" onClick={={}}>Add User</Button>
                </ModalFooter> */}
            </Modal>

              {/* Start WBA update modal */}
            <Modal isOpen={updateWBAModal} centered toggle={toggleUpdateWBA}>
                <ModalHeader tag="h5" className="font-size-16" toggle={toggleUpdateWBA}>
                    {t('Update Whatsapp business account')}
                </ModalHeader>
                <ModalBody className="p-4">
                    <Card>
                        <CardBody className="p-4">
                            <div className="p-3">
                                <Form onSubmit={formikUpdateApiSettings.handleSubmit}>
                                    <div className="mb-3">

                                        <Label className="form-label">{t('Display Name')}</Label>
                                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                            <span className="input-group-text text-muted">
                                                <i className="ri-user-2-line"></i>
                                            </span>
                                            <Input
                                                type="text"
                                                id="displayName"
                                                name="displayName"
                                                className="form-control form-control-lg bg-soft-light border-light"
                                                placeholder="Enter Display Name"
                                                onChange={formikUpdateApiSettings.handleChange}
                                                onBlur={formikUpdateApiSettings.handleBlur}
                                                value={formikUpdateApiSettings.values.displayName}
                                                invalid={formikUpdateApiSettings.touched.displayName && formikUpdateApiSettings.errors.displayName ? true : false}
                                            />
                                            {formikUpdateApiSettings.touched.displayName && formikUpdateApiSettings.errors.displayName ? (
                                                <FormFeedback type="invalid">{formikUpdateApiSettings.errors.displayName}</FormFeedback>
                                            ) : null}
                                        </InputGroup>
                                    </div>
                                    <div className="mb-3">
                                        <Label className="form-label">{t('Name space')}</Label>
                                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                            <span className="input-group-text text-muted">
                                                <i className="ri-user-2-line"></i>
                                            </span>
                                            <Input
                                                type="text"
                                                id="nameSpace"
                                                name="nameSpace"
                                                className="form-control form-control-lg bg-soft-light border-light"
                                                placeholder="Enter your Name space"
                                                onChange={formikUpdateApiSettings.handleChange}
                                                onBlur={formikUpdateApiSettings.handleBlur}
                                                value={formikUpdateApiSettings.values.nameSpace}
                                                invalid={formikUpdateApiSettings.touched.nameSpace && formikUpdateApiSettings.errors.nameSpace ? true : false}
                                            />
                                            {formikUpdateApiSettings.touched.nameSpace && formikUpdateApiSettings.errors.nameSpace ? (
                                                <FormFeedback type="invalid">{formikUpdateApiSettings.errors.nameSpace}</FormFeedback>
                                            ) : null}
                                        </InputGroup>
                                    </div>



                                    <div className="mb-4">
                                        <Label className="form-label">{t('Server Key')}</Label>
                                        <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                            <span className="input-group-text border-light text-muted">
                                                <i className="ri-user-2-line"></i>
                                            </span>
                                            <Input
                                                type="text"
                                                id="serverKey"
                                                name="serverKey"
                                                className="form-control form-control-lg bg-soft-light border-light"
                                                placeholder="Enter server key"
                                                onChange={formikUpdateApiSettings.handleChange}
                                                onBlur={formikUpdateApiSettings.handleBlur}
                                                value={formikUpdateApiSettings.values.serverKey}
                                                invalid={formikUpdateApiSettings.touched.serverKey && formikUpdateApiSettings.errors.serverKey ? true : false}
                                            />
                                            {formikUpdateApiSettings.touched.serverKey && formikUpdateApiSettings.errors.serverKey ? (
                                                <FormFeedback type="invalid">{formikUpdateApiSettings.errors.serverKey}</FormFeedback>
                                            ) : null}
                                        </InputGroup>
                                    </div>
                                    <div className="center">
                                        <Button color="primary" block className="waves-effect waves-light" type="submit">Update</Button>
                                    </div>

                                </Form>
                            </div>
                        </CardBody>
                    </Card>
                </ModalBody>
                {/* <ModalFooter>
                    <Button type="button" color="link" onClick={toggleAddUser}>Close</Button>
                    <Button  color="primary"  type="submit" onClick={={}}>Add User</Button>
                </ModalFooter> */}
            </Modal>
        </React.Fragment>
    );
}


{/* End Add contact Modal */ }
export default Settings;