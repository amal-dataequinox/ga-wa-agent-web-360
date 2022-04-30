import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Input, InputGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, Form, Label, FormFeedback } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//simplebar
import SimpleBar from "simplebar-react";

//actions
import { setconversationNameInOpenChat } from "../../../redux/actions"
import {recentChatList}from "../../../@types/chatList"
//components
import OnlineUsers from "./OnlineUsers";
import { getRecentChats, setActiveUser } from '../../../redux-persist/slices/chatList';
import { dispatch, RootState, useDispatch, useSelector } from '../../../redux-persist/store';
import { Box } from '@material-ui/core';
import { useSocket } from '../../../contexts/SocketContext';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Select from 'react-select';
import { ConversationTagsType } from '../../../@types/conversationTagsType';
import { getAllTags } from '../../../redux-persist/slices/ConversationTags';

const options = [
    { value: 'OPEN', label: 'Open' },
    { value: 'CLOSE', label: 'Close' },
    { value: 'ALL', label: 'All' },
  ];

const Chats = (props: any) => {
    const [seconds, setSeconds] = useState(0);

    const dispatch = useDispatch();
    const { getWBAccount } = useSelector(
        (state: RootState) => state.getWBAccount
    );

    const { recentChats,tempContact,activeUser } = useSelector(
        (state: RootState) => state.chatList
    );

    const { customer } = useSelector(
        (state: RootState) => state.customer
    );

    const { conversationTag,allTags } = useSelector(
        (state: RootState) => state.conversationTags
    );

    const socket = useSocket();
   

    useEffect(() => {
            if(getWBAccount[0]?.whatsAppBusinessId){
           
                localStorage.setItem("whatsAppBusinessId",getWBAccount[0]?.whatsAppBusinessId);
                if(customer?.userRoles[0]?.role?.roleName == 'MANAGER' || customer?.userRoles[0]?.role?.roleName == 'ACCOUNT_ADMIN'){
                    dispatch(getRecentChats(getWBAccount[0]?.whatsAppBusinessId,dropdownItem,"","",""));
                }
                else{
                    dispatch(getRecentChats(getWBAccount[0]?.whatsAppBusinessId,"Assigned","","",""));
                }
               // dispatch(getRecentChats(getWBAccount[0]?.whatsAppBusinessId,dropdownItem)); 
            }
           
    }, [getWBAccount[0]?.whatsAppBusinessId]);
   
    const [searchChat, setSearchChat] = useState("");
    const [isDropdownOpen,setIsDropdownOpen] = useState(false);
    const isFirstRender = useRef(true);
    //const {tempContact,recentChats,activeUser} = props;
    let allChatList : recentChatList[] = [];
    if(tempContact && !recentChats.find((contact) => contact.conversationId === tempContact?.conversationId) ){
        allChatList.push(tempContact)
    }
    allChatList = [...allChatList,...recentChats]
    const [recentChatList, setRecentChatList] = useState(allChatList);
    const [filterModal, setFilterModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState();
    const [selectedTags, setSelectedTags] = useState<ConversationTagsType[]>();

    useEffect(() => {
        dispatch(getAllTags());
    }, [dispatch])

    useEffect(() => {
        var li = document.getElementById("conversation" + props.activeUser);
        if (li) {
            li.classList.add("active");
        }
    }, [])

    let allTagArray=[];
    let tagList=[];
    allTagArray=allTagArray.concat(allTags)

    if(allTags){
        tagList= allTagArray.map(tags=>
            ({...tags,label:tags.name, value: tags.name}))
    }
   

    // useEffect(() => {
    //     if (isFirstRender.current) {
    //         isFirstRender.current = false;
    //     } else {
    //         setRecentChatList(allChatList);
    //     }
    // })

    useEffect(() => {
        setRecentChatList(allChatList);
    }, [recentChats])


    const handleChange = async (e: any) => {
        setSearchChat(e.target.value);
        var search = e.target.value?.toLowerCase();

        await  dispatch(getRecentChats(getWBAccount[0]?.whatsAppBusinessId,"","",search,""));


        // let conversation = allChatList;
        // let filteredArray = [];

        // //find conversation name from array
        // for (let i = 0; i < conversation.length; i++) {
        //     if (conversation[i].displayProfileName.toLowerCase().includes(search) || conversation[i].displayProfileName.toUpperCase().includes(search))
        //         filteredArray.push(conversation[i]);
        // }

        // //set filtered items to state
        // setRecentChatList(filteredArray);

        //if input value is blanck then assign whole recent chatlist to array
        if (search === "") { await  dispatch(getRecentChats(getWBAccount[0]?.whatsAppBusinessId,"","","",""));
    }
    }

    const openUserChat = (e: any, chat: any) => {
        e.preventDefault();
        //find index of current chat in array
        var item = allChatList.find((allChatItem) => allChatItem.conversationId === chat.conversationId);
        const index = item?.conversationId
        // set activeUser 
        dispatch(setActiveUser(index || ""))

        var chatList = document.getElementById("chat-list");
        var clickedItem = e.target;
        var currentli = null;

        if (chatList) {
            var li = chatList.getElementsByTagName("li");
            //remove coversation user
            for (var i = 0; i < li.length; ++i) {
                if (li[i].classList.contains('active')) {
                    li[i].classList.remove('active');
                }
            }
            //find clicked coversation user
            for (var k = 0; k < li.length; ++k) {
                if (li[k].contains(clickedItem)) {
                    currentli = li[k];
                    break;
                }
            }
        }

        //activation of clicked coversation user
        if (currentli) {
            currentli.classList.add('active');
        }

        var userChat = document.getElementsByClassName("user-chat");
        if (userChat) {
            userChat[0].classList.add("user-chat-show");
        }

        //removes unread badge if user clicks
        var unread = document.getElementById("unRead" + chat.id);
        if (unread) {
            unread.style.display = "none";
        }
    }



    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
    const dropdownValues  = ["All","Assigned", "Unassigned"];
    const [dropdownItem, setDropdownItem] = useState("All")

    const handleDropdownValue = async (val:string) => {
        setDropdownItem(val)
      await  dispatch(getRecentChats(getWBAccount[0]?.whatsAppBusinessId,val,"","",""));
    }
    localStorage.setItem("dropdownItem",dropdownItem);

    const fetchNewConversations = useCallback((conversation) => {
        setRecentChatList((prevConversations)=>{
            const converationExist = prevConversations.find((prevConversationItem)=> prevConversationItem.conversationId === conversation.conversationId)
            if(!converationExist){
                return [conversation, ...prevConversations]
            }
            const otherConversations = prevConversations.filter((prevConversationItem)=> prevConversationItem.conversationId !== conversation.conversationId)
            return [conversation, ...otherConversations]
        })
    },[setRecentChatList])

    useEffect(()=>{
        if(socket === null) return;
        socket.on(`conversation-${getWBAccount[0]?.whatsAppBusinessId}`,fetchNewConversations);
        return () => socket.off(`conversation-${getWBAccount[0]?.whatsAppBusinessId}`)

    },[getWBAccount[0]?.whatsAppBusinessId])

 
    const toggleFilterModal = () => {
        setFilterModal(!filterModal);
        // formik.values.status="";
        // formik.values.tags=[];
       // setSelectedStatus();
       // setSelectedTags([])
      };

      const formik = useFormik({
        initialValues: {
          tags: [],
          status: "",
        },
        validationSchema: Yup.object({
            tags: Yup.array(),
            status: Yup.string()
        }),
        onSubmit: async (values) => 
        {
            await  dispatch(getRecentChats(getWBAccount[0]?.whatsAppBusinessId,"",values.status,"",values.tags));
            toggleFilterModal();
        }
       
      });
      
      const handleStatusChange =(status:any)=>{
        setSelectedStatus(status);
        formik.values.status=status?.value;
      }

      const handleTagsChange =(tags:any)=>{
          setSelectedTags(tags);
          var result = tags.map(obj => {
            return obj.name
          })
          formik.values.tags=result
      }
      
    return (
        <React.Fragment>
            <div>
                <div className="px-4 pt-4">
                    <Box display={"flex"} justifyContent="space-between">
                        <Box> <h4 className="mb-4 pt-2">Chats</h4></Box>
                        {customer?.userRoles[0]?.role?.roleName == 'MANAGER' || customer?.userRoles[0]?.role?.roleName == 'ACCOUNT_ADMIN' ?<Box>  
                         <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle style={{ minWidth: 100 }} outline color="primary" caret >
                                {dropdownItem} <i className="mdi mdi-chevron-down"></i>
                            </DropdownToggle>
                            <DropdownMenu>
                                {
                                    dropdownValues.map((val) => <DropdownItem onClick={() => handleDropdownValue(val)} >{val}</DropdownItem>)
                                }
                            </DropdownMenu>
                        </Dropdown></Box>:null}
                        <Button outline color="primary" onClick={toggleFilterModal} className='btn btn-outline-primary' style={{height:"40px",  minWidth: 100}}>Filter</Button>
                    </Box>
                     <div className="search-box chat-search-box">
                        <InputGroup size="lg" className="mb-3 rounded-lg">
                            <span className="input-group-text text-muted bg-light pe-1 ps-3" id="basic-addon1">
                                <i className="ri-search-line search-icon font-size-18"></i>
                            </span>
                            <Input type="text" value={searchChat} onChange={(e) => handleChange(e)} className="form-control bg-light" placeholder="Search messages or users" />
                        </InputGroup>
                    </div> 
                    {/* Search Box */}
                </div>

                {/* online users */}
                {/* <OnlineUsers /> */}

                {/* Start chat-message-list  */}
                <div className="px-2">
                    {/* <h5 className="mb-3 px-3 font-size-16">Recent</h5> */}
                    <SimpleBar style={{ maxHeight: "100%" }} className="chat-message-list">

                        <ul className="list-unstyled chat-list chat-user-list" id="chat-list">
                            {
                              recentChatList.length > 0  &&  recentChatList.map((chat: any, key: any) =>
                                    <li key={key} id={"conversation" + key} className={chat.unRead ? "unread" : chat.isTyping ? "typing" : chat.contactId === activeUser ? "active" : ""}>
                                        <Link to="#" onClick={(e) => openUserChat(e, chat)}>
                                            <div className="d-flex">
                                                {
                                                    !chat.profilePicture  ?
                                                        <div className={"chat-user-img " + chat.status + " align-self-center me-3 ms-0"}>
                                                            <div className="avatar-xs">
                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                    {chat?.displayProfileName?.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            {
                                                                chat.status && <span className="user-status"></span>
                                                            }
                                                        </div>
                                                        :
                                                        <div className={"chat-user-img " + chat.status + " align-self-center me-3 ms-0"}>
                                                            <img src={chat.profilePicture} className="rounded-circle avatar-xs" alt="chatvia" />
                                                            {
                                                                chat.status && <span className="user-status"></span>
                                                            }
                                                        </div>
                                                }

                                                <div className="flex-1 overflow-hidden">
                                                    <h5 className="text-truncate font-size-15 mb-1">{`${chat?.displayProfileName}`}</h5>
                                                    <p className="chat-user-message text-truncate mb-0">
                                                        {
                                                            chat.isTyping ?
                                                                <>
                                                                    typing<span className="animate-typing">
                                                                        <span className="dot ms-1"></span>
                                                                        <span className="dot ms-1"></span>
                                                                        <span className="dot ms-1"></span>
                                                                    </span>
                                                                </>
                                                                :
                                                                <>
                                                                    {
                                                                        chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isImageMessage === true) ? <i className="ri-image-fill align-middle me-1"></i> : null
                                                                    }
                                                                    {
                                                                        chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isFileMessage === true) ? <i className="ri-file-text-fill align-middle me-1"></i> : null
                                                                    }
                                                                    {chat.messages && chat.messages.length > 0 ? chat.messages[(chat.messages).length - 1].message : null}
                                                                </>
                                                        }



                                                    </p>
                                                </div>
                                                <div className="font-size-11">{chat.messages && chat.messages.length > 0 ? chat.messages[(chat.messages).length - 1].time : null}</div>
                                                {chat.unRead === 0 ? null :
                                                    <div className="unread-message" id={"unRead" + chat.id}>
                                                        <span className="badge badge-soft-danger rounded-pill">{chat.messages && chat.messages.length > 0 ? chat.unRead >= 20 ? chat.unRead + "+" : chat.unRead : ""}</span>
                                                    </div>
                                                }
                                            </div>
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </SimpleBar>

                </div>
                {/* End chat-message-list */}
            </div>

              {/* Start Add contact Modal */}
          <Modal
            isOpen={filterModal}
            centered
            toggle={toggleFilterModal}
          >
            <ModalHeader
              tag="h5"
              className="font-size-16"
              toggle={toggleFilterModal}
            >
              Filter
            </ModalHeader>
            <ModalBody className="p-4">
                    <Form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">

                            <Label className="form-label">Tags</Label>
                            <Select
                                isMulti
                                onChange={handleTagsChange}
                                options={tagList}
                                value={selectedTags}
                                name="tags"
                                isClearable
                                
                            />
                            {formik.touched.tags && formik.errors.tags ? (
                                <FormFeedback type="invalid">{formik.errors.tags}</FormFeedback>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <Label className="form-label">Status</Label>
                            <Select
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                options={options}
                                name="status"
                                isClearable
                            />
                                {formik.touched.status && formik.errors.status ? (
                                <FormFeedback type="invalid">{formik.errors.status}</FormFeedback>
                            ) : null}
                        </div>


                        <div className="d-grid pt-20" >
                            <Button color="primary" block className=" waves-effect waves-light" type="submit" >Apply</Button>
                        </div>

                    </Form>
            </ModalBody>
          </Modal>
          {/* End Add file Modal */}
        </React.Fragment>
    );

}

const mapStateToProps = (state: any) => {
    const { activeUser,tempContact ,recentChats} = state.chatList;
    return { activeUser,tempContact,recentChats };
};

export default connect(mapStateToProps, { setconversationNameInOpenChat })(Chats);