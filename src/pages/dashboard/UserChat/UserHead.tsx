import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Input, Row, Col, Modal, ModalBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { openUserSidebar, setFullUser } from "../../../redux/actions";

//import images
import user from '../../../assets/images/users/avatar-4.jpg'
import ContactDetailsSidebar from '../../../components/Campaigns/AddCampaign/ContactDetailsSidebar';
import UserProfileSidebar from '../../../components/UserProfileSidebar';
import { dispatch, RootState, useSelector } from '../../../redux-persist/store';
import allUser from '../../../redux-persist/slices/allUser';
import { AllUser } from '../../../@types/allUser';
import { updateConversationAssign } from '../../../redux-persist/slices/updateConversation';

function UserHead(props:any) {
console.log(props);

const { allUser } = useSelector(
    (state: RootState) => state.allUser
);

const { updateConversation } = useSelector(
    (state: RootState) => state.updateConversation
);

console.log(allUser);

    const {chatDetails,activeUser} = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [Callmodal, setCallModal] = useState(false);
    const [Videomodal, setVideoModal] = useState(false);
    // const [userDetails, setUserDetails] = useState(false);


    const toggle = () => setDropdownOpen(!dropdownOpen);
    const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
    const toggleCallModal = () => setCallModal(!Callmodal);
    const toggleVideoModal = () => setVideoModal(!Videomodal);
    const toggleUserDetails = () => props.setUserDetails(!props.userDetails);
    const dropdownValues  =allUser.map(({userId,userName,...rest})=> {return ({userId,userName})})
  
    
    const [dropdownItem, setDropdownItem] = useState("")

    const openUserSidebar = (e) => {
         e.preventDefault();
         toggleUserDetails()
    }

    const closeUserChat =(e) => {
        e.preventDefault();
        toggleUserDetails();
        // var userChat = document.getElementsByClassName("user-chat");
        // if (userChat) {
        //     userChat[0].classList.remove("user-chat-show");
        // }
    }

    function deleteMessage() {
        let allUsers = props.recentChats;
        let copyallUsers = allUsers;
        copyallUsers[props.activeUser].messages = [];

        props.setFullUser(copyallUsers);
    }

    useEffect(()=>{
        if(chatDetails?.assignedAgentName){
            setDropdownItem(chatDetails?.assignedAgentName)
        }
        else{
            setDropdownItem("")
        }
    },[activeUser])

    const handleDropdownValue = async (val:any) => {
        setDropdownItem(val.userName)
        console.log(val);
      await  dispatch(updateConversationAssign(chatDetails?.conversationId,val?.userId,val?.userName));
    }

    return (
        <React.Fragment>
            <div className="p-3 p-lg-4 border-bottom">
                <Row className="align-items-center">
                    <Col sm={4} xs={8}>
                        <div className="d-flex align-items-center">
                            <div className="d-block d-lg-none me-2 ms-0">
                                <Link to="#" onClick={(e) => openUserSidebar(e)} className="user-chat-remove text-muted font-size-16 p-2">
                                    <i className="ri-arrow-left-s-line"></i></Link>
                            </div>
                            {
                              
                                    <div className="chat-user-img align-self-center me-3">
                                        <div className="avatar-xs">
                                        <Link to="#" onClick={(e) => openUserSidebar(e)} >
                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                {chatDetails?.displayProfileName?.charAt(0)?.toUpperCase()}
                                            </span>
                                            </Link>
                                        </div>
                                    </div>
                            }

                            <div className="flex-1 overflow-hidden">
                                <h5 className="font-size-16 mb-0 text-truncate">
                                    <Link to="#" onClick={(e) => openUserSidebar(e)} className="text-reset user-profile-show">
                                        {chatDetails?.displayProfileName}
                                    </Link>
                                    {(() => {
                                        switch (chatDetails?.status) {
                                            case "online":
                                                return (
                                                    <>
                                                        <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ms-1"></i>
                                                    </>
                                                )

                                            case "away":
                                                return (
                                                    <>
                                                        <i className="ri-record-circle-fill font-size-10 text-warning d-inline-block ms-1"></i>
                                                    </>
                                                )

                                            case "offline":
                                                return (
                                                    <>
                                                        <i className="ri-record-circle-fill font-size-10 text-secondary d-inline-block ms-1"></i>
                                                    </>
                                                )

                                            default:
                                                return;
                                        }
                                    })()}

                                </h5>
                            </div>
                        </div>
                    </Col>
                    <Col sm={8} xs={4} >
                    {allUser.length>0 ?
                     <ul className="list-inline user-chat-nav text-end mb-0">

                            {/* <li className="list-inline-item">
                                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle color="none" className="btn nav-btn " type="button">
                                        <i className="ri-search-line"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-md">
                                        <div className="search-box p-2">
                                            <Input type="text" className="form-control bg-light border-0" placeholder="Search.." />
                                        </div>
                                    </DropdownMenu>
                                </Dropdown>
                            </li> */}
                            {/* <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                                <button type="button" onClick={toggleCallModal} className="btn nav-btn" >
                                    <i className="ri-phone-line"></i>
                                </button>
                            </li>
                            <li className="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                                <button type="button" onClick={toggleVideoModal} className="btn nav-btn">
                                    <i className="ri-vidicon-line"></i>
                                </button>
                            </li> */}
                                {dropdownItem !== "" ?
                                    <li className="list-inline-item d-none d-lg-inline-block">
                                     {dropdownItem}
                                    </li>:
                                  null}
                         
                                <li className="list-inline-item" id='assign'>
                                    <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                                        <DropdownToggle className="btn nav-btn " color="none" type="button" caret>
                                             <i className="ri-arrow-down-s-line"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end">
                                            {
                                                dropdownValues?.map((val) => <DropdownItem onClick={() => handleDropdownValue(val)} >{val.userName}</DropdownItem>)
                                            }
                                        </DropdownMenu>
                                    </Dropdown>
                                    <UncontrolledTooltip target="assign" placement="bottom">
                                       Select user to assign
                                    </UncontrolledTooltip>
                                </li>
                            
                        </ul>: null}
                    </Col>
                </Row>
            </div>

            {/* Start Audiocall Modal */}
            <Modal tabIndex="-1" isOpen={Callmodal} toggle={toggleCallModal} centered>
                <ModalBody>
                    <div className="text-center p-4">
                        <div className="avatar-lg mx-auto mb-4">
                            <img src={user} alt="" className="img-thumbnail rounded-circle" />
                        </div>

                        <h5 className="text-truncate">Doris Brown</h5>
                        <p className="text-muted">Start Audio Call</p>

                        <div className="mt-5">
                            <ul className="list-inline mb-1">
                                <li className="list-inline-item px-2 me-2 ms-0">
                                    <button type="button" className="btn btn-danger avatar-sm rounded-circle" onClick={toggleCallModal}>
                                        <span className="avatar-title bg-transparent font-size-20">
                                            <i className="ri-close-fill"></i>
                                        </span>
                                    </button>
                                </li>
                                <li className="list-inline-item px-2">
                                    <button type="button" className="btn btn-success avatar-sm rounded-circle">
                                        <span className="avatar-title bg-transparent font-size-20">
                                            <i className="ri-phone-fill"></i>
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Start VideoCall Modal */}
            <Modal tabIndex="-1" isOpen={Videomodal} toggle={toggleVideoModal} centered>
                <ModalBody>
                    <div className="text-center p-4">
                        <div className="avatar-lg mx-auto mb-4">
                            <img src={user} alt="" className="img-thumbnail rounded-circle" />
                        </div>

                        <h5 className="text-truncate">Doris Brown</h5>
                        <p className="text-muted">Start Video Call</p>

                        <div className="mt-5">
                            <ul className="list-inline mb-1">
                                <li className="list-inline-item px-2 me-2 ms-0">
                                    <button type="button" className="btn btn-danger avatar-sm rounded-circle" onClick={toggleVideoModal}>
                                        <span className="avatar-title bg-transparent font-size-20">
                                            <i className="ri-close-fill"></i>
                                        </span>
                                    </button>
                                </li>
                                <li className="list-inline-item px-2">
                                    <button type="button" className="btn btn-success avatar-sm rounded-circle">
                                        <span className="avatar-title bg-transparent font-size-20">
                                            <i className="ri-vidicon-fill"></i>
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* {userDetails && <UserProfileSidebar  userSidebar={true}/>} */}
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    const { recentChats, tempContact, activeUser } = state.chatList;
    return { ...state.Layout, recentChats, activeUser,tempContact };
};

export default connect(mapStateToProps, { openUserSidebar, setFullUser })(UserHead);