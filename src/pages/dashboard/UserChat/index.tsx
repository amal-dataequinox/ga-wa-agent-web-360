import React, { useState, useEffect, useRef,useCallback } from 'react';
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Modal, ModalHeader, ModalBody, CardBody, Button, ModalFooter,Label } from "reactstrap";
import { connect, Provider, useSelector } from "react-redux";

import SimpleBar from "simplebar-react";

import { withRouter } from 'react-router-dom';

//Import Components
import UserProfileSidebar from "../../../components/UserProfileSidebar";
import SelectContact from "../../../components/SelectContact";
import UserHead from "./UserHead";
import ImageList from "./ImageList";
import ChatInput from "./ChatInput";
import FileList from "./FileList";

//actions
import { openUserSidebar, setFullUser } from "../../../redux/actions";

//i18n
import { useTranslation } from 'react-i18next';
import UsersNotFound from './UsersNotFound';
import {dispatch, RootState, store} from "../../../redux-persist/store"
import {addTempContact, clearTempContact, getRecentChats} from "../../../redux-persist/slices/chatList"
import { Box, Card, Typography } from '@material-ui/core';
import {ErrorRounded} from "@mui/icons-material"
import { TemplateSelectionView } from './ChooseTemplate';
import MinimalTemplatePreview from '../../../components/Campaigns/AddCampaign/MinimalTemplatePreview';
import { getChatMessages, setChatMessages } from '../../../redux-persist/slices/chatMessages';
import { sendDirectMessage } from '../../../redux-persist/slices/directMessage';
import { useSnackbar } from 'notistack';
import { useSocket } from '../../../contexts/SocketContext';
import AudioList from './AudioList';
import LocationList from './LocationList';
import ContactsList from './ContactsList';
import VideoList from './VideoList';
import { getAllTagsOfAConversation } from '../../../redux-persist/slices/ConversationTags';
function UserChat(props) {
    

    const ref = useRef();

    const [modal, setModal] = useState(false);
    const {chatList,chatMessagesList,customer} = store.getState();
    const [seconds, setSeconds] = useState(0);
    const [userDetails, setUserDetails] = useState(false);
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();
    const { recentChats,tempContact,activeUser} = chatList;
    const {chatMessages} = chatMessagesList;

    //demo conversation messages
    //userType must be required
    const [allUsers] = useState(props.recentChatList);
    const socket = useSocket();
    useEffect(() => {
        ref.current && ref.current.recalculate();
        if (ref.current?.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
   
    }, [chatMessages]);
    let whatsAppBusinessId = localStorage.getItem("whatsAppBusinessId") || '';
    let option:string;
    if(customer?.customer?.userRoles[0]?.role?.roleName == 'MANAGER' || customer?.customer?.userRoles[0]?.role?.roleName == 'ACCOUNT_ADMIN'){
     option = localStorage.getItem("dropdownItem") || '';}
     else{
        option ="Assigned"
     }

    // let whatsAppBusinessId = "740e4a67-fb46-44b9-b333-27be1e4b45eb";
    // useEffect(()=>{
    //     debugger
    //     if (activeUser) {
    //         dispatch(getAllTagsOfAConversation(activeUser));
    //     }
    // },[activeUser])

    useEffect(()=>{
        if(whatsAppBusinessId){
            dispatch(getRecentChats(whatsAppBusinessId,option,"","",""));
        }
    },[whatsAppBusinessId])

    const toggle = () => setModal(!modal);
    const [showTemplateModal,setShowTemplateModal] = useState(false);
    const closeTemplateModal = () => setShowTemplateModal(false);
    const { enqueueSnackbar } = useSnackbar();
    let reversedChatMessages =[]
    let  newDirectMessage =[]


    const AddMessage = async (message, type) => {
        let allChatList = [];
        const {chatList} = store.getState();
        const {recentChats,activeUser} = chatList;
        if(tempContact && !recentChats.find((contact) => contact.conversationId === tempContact?.conversationId) ){
            allChatList.push(tempContact)
        }
   
        allChatList = [...allChatList,...recentChats];
        const chatDetails = allChatList.find((chatItem) => chatItem.conversationId === activeUser)
        var messageObj = null;
        let d = new Date();
        var n = d.getSeconds();

        //matches the message type is text, file or image, and create object according to it
        switch (type) {
            case "textMessage":
                messageObj = {
                    whatsAppBusinessId: whatsAppBusinessId,
                    phoneNumberId: chatDetails?.phoneNumberId,
                    from: chatDetails?.displayPhoneNumber,
                    to: chatDetails?.waId,
                    type: "text",
                    text: {
                        "previewUrl": false,
                        "body": message
                    }
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
                    isImageMessage: false
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
                    isFileMessage: false
                }
                break;

            default:
                break;
        }

         let recentChatList = [];  
      
        if(tempContact && !recentChats.find((contact) => contact.conversationId === tempContact?.conversationId) ){
            allChatList.push(tempContact)
        }
        allChatList = [...allChatList,...recentChats]
        let messageTempObject = {
            "conversationMessageId": "",
            "conversationId": "",
            "messageBody": message,
            "messageType": "text",
            "wamId": null,
            "response": null,
            "isInbound":false,
            "status": null,
            "createTime": new Date(),
            "updateTime": new Date(),
        }

     

      if(chatDetails?.whatsAppBusinessId){
     let res= await dispatch(sendDirectMessage(messageObj));
     if(res?.hasError){
        enqueueSnackbar(res?.message, { variant: "error" })
      }

         }

        if(whatsAppBusinessId){
            dispatch(getRecentChats(whatsAppBusinessId,option,"","",""));
        }
        scrolltoBottom();
    }

    function scrolltoBottom() {
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }


    const deleteMessage = (id) => {
        let conversation = chatMessages;

        var filtered = conversation.filter(function (item) {
            return item.id !== id;
        });

        //setchatMessages(filtered);
    }

    const ChooseTemplate = () => {
        return (<Card  sx={{position : "absolute", bottom :0,width : '100%', borderBottom : "none",p:2,mx : 1}}>
            
            <Box textAlign={"center"}>
            <ErrorRounded sx={{color : "#ff0f0f", width : 40, height : 40}}></ErrorRounded>
            <Typography>24 Hours window surpassed</Typography>
            <Button color='primary' onClick={()=> setShowTemplateModal(true)}>Choose Template</Button>
        </Box>
        </Card>)
    }



    const UserChatScreen = () => {
        const {chatList,chatMessagesList} = useSelector(store => store);
    //conversationId is used as activeUser
        const {tempContact, recentChats, activeUser} = chatList;
        const {chatMessages,isLoading} = chatMessagesList;
        let allChatList = [];
        
        if(tempContact && !recentChats.find((contact) => contact.conversationId === tempContact?.conversationId) ){
            allChatList.push(tempContact)
        }
        allChatList = [...allChatList,...recentChats];
        const chatDetails = allChatList.find((chatItem) => chatItem.conversationId === activeUser)
        const contactHasChat = chatMessages?.length > 0 ? true : false
        reversedChatMessages = chatMessages.slice().reverse();
        reversedChatMessages= reversedChatMessages.concat(newDirectMessage);

        useEffect(()=>{
            if(activeUser!=="" ){
                dispatch(getChatMessages(activeUser,1,20));
            }
        },[activeUser])
        
        const fetchNewChats = useCallback((message) => {
            const chatExist = reversedChatMessages.find((prevConversationItem)=> prevConversationItem.conversationId === message.conversationId)
            const newMessage = chatExist ?  [...reversedChatMessages,message] : [message]
            dispatch(setChatMessages(newMessage.reverse()))
            scrolltoBottom();
        },[setChatMessages])
    
        useEffect(()=>{
            if(socket === null) return;
            socket.on(`message-${activeUser}`,fetchNewChats);
            return () => socket.off(`message-${activeUser}`)
    
        },[activeUser])

        return( 
        <SimpleBar
            style={{ maxHeight: "100%" }}
            ref={ref}
            className="chat-conversation p-3 p-lg-4"
            id="messages">
            <ul className="list-unstyled mb-0">
    
    
                {
                    reversedChatMessages && reversedChatMessages.map((chat, key) =>
                        chat.isToday && chat.isToday === true ? <li key={"dayTitle" + key}>
                            <div className="chat-day-title">
                                <span className="title">Today</span>
                            </div>
                        </li> :
                            (props.recentChatList[activeUser]?.isGroup === true) ?
                                <li key={key} className={chat.isInbound === false ? "right" : ""}>
                                    <div className="conversation-list">
    
                                        <div className="chat-avatar">
                                        <div className="chat-user-img align-self-center me-3">
                                                        <div className="avatar-xs">
                                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                {chat.displayProfileName && chat.displayProfileName?.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>
                                        </div>
    
                                        <div className="user-chat-content">
                                            <div className="ctext-wrap">
                                                <div className="ctext-wrap-content">
                                                    {
                                                        chat.messageBody &&
                                                        <p className="mb-0">
                                                            {chat.messageBody}
                                                        </p>
                                                    }
                                                    {
                                                        chat.imageMessage &&
                                                        // image list component
                                                        <ImageList images={chat.imageMessage} />
                                                    }
                                                    {
                                                        chat.fileMessage &&
                                                        //file input component
                                                        <FileList fileName={chat.fileMessage} fileSize={chat.size} />
                                                    }
                                                    {
                                                        chat.isTyping &&
                                                        <p className="mb-0">
                                                            typing
                                                            <span className="animate-typing">
                                                                <span className="dot ms-1"></span>
                                                                <span className="dot ms-1"></span>
                                                                <span className="dot ms-1"></span>
                                                            </span>
                                                        </p>
                                                    }
                                                    {
                                                        !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{chat.time}</span></p>
                                                    }
                                                </div>
                                                {
                                                    !chat.isTyping &&
                                                    <UncontrolledDropdown className="align-self-start">
                                                        <DropdownToggle tag="a">
                                                            <i className="ri-more-2-fill"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                            <DropdownItem>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                            <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>
                                                            <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                }
    
                                            </div>
                                            {
                                                <div className="conversation-name">{chat.userType === "sender" ? "Patricia Smith" : chat.userName}</div>
                                            }
                                        </div>
                                    </div>
                                </li>
                                :
                                ( contactHasChat ?<li key={key} className={chat.isInbound === false ? "right" : ""}>
                                    <div className="conversation-list ">
                                                <div className="chat-avatar">
                                                            <div className="chat-user-img align-self-center me-3">
                                                                <div className="avatar-xs">
                                                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                        {chatDetails?.displayProfileName?.charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                            </div>     
                                                </div>
                                        <div className="user-chat-content">
                                            <div className="ctext-wrap">
                                                <div className="ctext-wrap-content">
                                                    {
                                                        chat.messageType=="text" &&
                                                       ( chat.isTemplate ? ( chat.messageContent && <MinimalTemplatePreview template={chat.messageContent}/>) :<p className="mb-0">
                                                            {chat.messageBody.replace(/"/g, "")}
                                                        </p>)
                                                    }
                                                    {
                                                        chat.messageType=="image" &&
                                                        // image list component
                                                        <ImageList images={JSON.parse(chat.messageBody).url} />
                                                    }
                                                         {
                                                        chat.messageType=="sticker" &&
                                                        // image list component
                                                        <ImageList images={JSON.parse(chat.messageBody).url} />
                                                    }
                                                    {
                                                         chat.messageType=="document" &&
                                                        //file input component
                                                        <FileList fileUrl={JSON.parse(chat.messageBody).url} fileName={JSON.parse(chat.messageBody).originalFileName} fileSize={JSON.parse(chat.messageBody).size} />
                                                    }
                                                       {
                                                         chat.messageType=="audio" &&
                                                        //Audio input component
                                                        <AudioList fileUrl={JSON.parse(chat.messageBody).url} fileName={JSON.parse(chat.messageBody).name} />
                                                    }

{
                                                         chat.messageType=="video" &&
                                                        //Audio input component
                                                        <VideoList fileUrl={JSON.parse(chat.messageBody).url} fileName={JSON.parse(chat.messageBody).name} />
                                                    }

                                                    { //TODO
                                                        chat.messageType == "location" &&
                                                        //Location input component
                                                        <LocationList location={JSON.parse(JSON.parse(chat.messageBody))} />
                                                    }

                                                    {//TODO
                                                        chat.messageType == "contacts" &&
                                                        //Location input component
                                                        <ContactsList contacts={JSON.parse(JSON.parse(chat.messageBody))} />
                                                    }

                                                    {
                                                        chat.isTyping &&
                                                        <p className="mb-0">
                                                            typing
                                                            <span className="animate-typing">
                                                                <span className="dot ms-1"></span>
                                                                <span className="dot ms-1"></span>
                                                                <span className="dot ms-1"></span>
                                                            </span>
                                                        </p>
                                                    }
                                                    {
                                                        !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{new Date(chat.createTime).toLocaleString()}</span></p>
                                                    }
                                                </div>
                                                {
                                                    !chat.isTyping &&
                                                    <UncontrolledDropdown className="align-self-start">
                                                        <DropdownToggle tag="a">
                                                            <i className="ri-more-2-fill"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                                            <DropdownItem>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                                            <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>
                                                            <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                }
    
                                            </div>
                                            {/* {
                                                chatMessages[key + 1] ? chatMessages[key].userType === chatMessages[key + 1].userType ? null : <div className="conversation-name">{chat.userType === "sender" ? "Patricia Smith" : props.recentChatList[props.active_user]?.contactFirstName}</div> : <div className="conversation-name">{chat.userType === "sender" ? "Admin" : props.recentChatList[props.active_user]?.contactFirstName}</div>
                                            } */}
    
                                        </div>
                                    </div>
                                </li> : <></>)
                    )
                }
            </ul>
        </SimpleBar>)
    }




    const ChatInterface = () => {
   

        const {chatList,chatMessagesList} = useSelector(store => store);
    //conversationId is used as activeUser
        const {tempContact, recentChats, activeUser} = chatList;
        const {chatMessages,isLoading} = chatMessagesList;
        let allChatList = [];
        if(tempContact && !recentChats.find((contact) => contact.conversationId === tempContact?.conversationId) ){
            allChatList.push(tempContact)
        }
        allChatList = [...allChatList,...recentChats];
        const chatDetails = allChatList.find((chatItem) => chatItem.conversationId === activeUser)
        const contactHasChat = chatMessages?.length > 0 ? true : false
        const usersExist = allChatList.length > 0 ? true : false;
        const activeUserSelected = activeUser !== '' ? true : false;
        //Change the logic for showChatInput later with 24h time frame expiry logic
        const showChatInput = contactHasChat;
      
        
     return (
          <div className="user-chat w-100">

        <div className='user-chat-container'>
        <div className="d-lg-flex">

{(usersExist &&  activeUserSelected) ? <><div className={props.userSidebar ? "w-70" : "w-100"}>

    {/* render user head */}
    <UserHead chatDetails={chatDetails} userDetails={userDetails} setUserDetails={setUserDetails}/>

        <UserChatScreen/>

        <ChatInput  onaddMessage={AddMessage} />

{/* { showChatInput ?    <ChatInput  onaddMessage={AddMessage} /> : <ChooseTemplate/>} */}
            </div>

<UserProfileSidebar activeUser={activeUser} userSidebar={userDetails} setUserDetails={setUserDetails}  chatDetails={chatDetails} /> </> : <UsersNotFound/>}
<Modal backdrop="static" isOpen={modal} centered toggle={toggle}>
        <ModalHeader toggle={toggle}>Forward to...</ModalHeader>
        <ModalBody>
            <CardBody className="p-2">
                <SimpleBar style={{ maxHeight: "200px" }}>
                    <SelectContact handleCheck={() => { }} />
                </SimpleBar>
                <ModalFooter className="border-0">
                    <Button color="primary">Forward</Button>
                </ModalFooter>
            </CardBody>
        </ModalBody>
    </Modal>
    <TemplateSelectionView showTemplateModal={showTemplateModal} closeTemplateModal={closeTemplateModal}/>
</div>
        </div>
    </div>)
    }

    return (
        <React.Fragment>
            <Provider store={store}>
           <ChatInterface/>
           </Provider>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_user } = state.Chat;
    const { userSidebar } = state.Layout;
    return { active_user, userSidebar };
};

export default withRouter(connect(mapStateToProps, { openUserSidebar, setFullUser })(UserChat));

