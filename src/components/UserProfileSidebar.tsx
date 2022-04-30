import React, { useEffect, useState } from 'react';
import { Button, Card, Badge } from "reactstrap";

//Simple bar
import SimpleBar from "simplebar-react";

//components
import AttachedFiles from "./AttachedFiles";
import CustomCollapse from "./CustomCollapse";

//actions
import { closeUserSidebar,openUserSidebar } from "../redux/actions";

//i18n
import { useTranslation } from 'react-i18next';

//image
import { dispatch, RootState, store, useSelector } from '../redux-persist/store';
import { assignTag, createTag, getAllTags, getAllTagsOfAConversation, removeTag } from '../redux-persist/slices/ConversationTags';
import { AllTagsType, ConversationTagsType } from '../@types/conversationTagsType';
import { Grid } from '@material-ui/core';

import CreatableSelect from 'react-select/creatable';
import { useSnackbar } from 'notistack';
import { getChatListByTag } from '../redux-persist/slices/chatList';

function UserProfileSidebar(props: any) {
    const { enqueueSnackbar } = useSnackbar();

    const { conversationTag,allTags,addTag } = useSelector(
        (state: RootState) => state.conversationTags
    );

    useEffect(() => {
        dispatch(getAllTags());
    }, [dispatch])

        useEffect(()=>{
        if (props.activeUser) {
            dispatch(getAllTagsOfAConversation(props.activeUser));
        }
    },[props.activeUser])

 

const {chatDetails} = props;

    const [isOpen1, setIsOpen1] = useState(true);
    const [isOpen2, setIsOpen2] = useState(true);
    const [isOpen3, setIsOpen3] = useState(true);
    const [isPopOver1, setIsPopOver1] = useState(false);
    const [files] = useState([
        { name: "Admin-A.zip", size: "12.5 MB", thumbnail: "ri-file-text-fill" },
        { name: "Image-1.jpg", size: "4.2 MB", thumbnail: "ri-image-fill" },
        { name: "Image-2.jpg", size: "3.1 MB", thumbnail: "ri-image-fill" },
        { name: "Landing-A.zip", size: "6.7 MB", thumbnail: "ri-file-text-fill" },
    ]);

    const [selectedTags, setSelectedTags] = useState<ConversationTagsType[]>(conversationTag);
    const toggleUserDetails = () => props.setUserDetails(!props.userSidebar);
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    let allTagArray=[];
    let tagList=[];
    let conversationTagList=[];
   allTagArray=allTagArray.concat(allTags)

  
if(allTags){
    tagList= allTagArray.map(tags=>
        ({...tags,label:tags.name, value: tags.name}))
}

useEffect(() => {
    conversationTagList= conversationTag.map(tags=>
        ({...tags,label:tags.tag, value: tags.tag}))
        setSelectedTags(conversationTagList)
}, [conversationTag])

  

    const toggleCollapse1 = () => {
        setIsOpen1(!isOpen1);
        setIsOpen2(false);
        setIsOpen3(false);
    };

    const toggleCollapse2 = () => {
        setIsOpen2(!isOpen2);
        setIsOpen1(false);
        setIsOpen3(false);
    };

    const toggleCollapse3 = () => {
        setIsOpen3(!isOpen3);
        setIsOpen1(false);
        setIsOpen2(false);
    };

    const toggleIsPopOver1 = () => {
        setIsPopOver1(!isPopOver1);
    };

    // closes sidebar
    const closeuserSidebar = () => {
        toggleUserDetails()
    }


   const handleChange = async (newValue,actionMeta) => {
       if (actionMeta?.action == "create-option") {
           let res = await dispatch(createTag(actionMeta?.option?.value));
           if (res?.hasError) {
               enqueueSnackbar(res?.message, { variant: "error" })
           }
           else {
               enqueueSnackbar("New tag added", { variant: "success" })
               let response = await dispatch(assignTag(props.activeUser, res?.tagId));
               if (response?.hasError) {
                   enqueueSnackbar(response?.message, { variant: "error" })
               }
               else {
                   dispatch(getAllTagsOfAConversation(props.activeUser));
               }
           }
       }
       if (actionMeta?.action == "remove-value") {
           let res = await dispatch(removeTag(props.activeUser, actionMeta?.removedValue?.conversationTagId));
           if (res?.hasError) {
               enqueueSnackbar(res?.message, { variant: "error" })
           }
           else {
               enqueueSnackbar("Tag removed", { variant: "success" });
               dispatch(getAllTagsOfAConversation(props.activeUser));
           }
       }
       if (actionMeta?.action == "select-option") {
           let response = await dispatch(assignTag(props.activeUser, actionMeta?.option?.tagId));
           if (response?.hasError) {
               enqueueSnackbar(response?.message, { variant: "error" })
           }
           else {
             let res= await dispatch(getAllTagsOfAConversation(props.activeUser));
             if(res.hasError){
             }
             else {
                 setSelectedTags(res)
             }
           }
       }
   };
    // style={{display: props.userSidebar  ? "block" : "none"}}

    const getConversationByTag = (tagId: string) => {
        dispatch(getChatListByTag(tagId));
    }

    return (
        <React.Fragment>
            <div style={{ display: (props.userSidebar === true) ? "block" : "none" }} className="user-profile-sidebar">
                <div className="px-3 px-lg-4 pt-3 pt-lg-4">
                    <div className="user-chat-nav  text-end">
                        <Button color="none" type="button" onClick={closeuserSidebar} className="nav-btn" id="user-profile-hide">
                            <i className="ri-close-line"></i>
                        </Button>
                    </div>
                </div>

                <div className="text-center p-4 border-bottom">

                    <div className="mb-4 d-flex justify-content-center">
                                <div className="avatar-lg">
                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-24">
                                        {chatDetails?.displayProfileName?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                    </div>

                    <h5 className="font-size-16 mb-1 text-truncate">{chatDetails?.displayProfileName}</h5>
                 
                </div>
                {/* Start user-profile-desc */}
                <SimpleBar style={{ maxHeight: "100%" }} className="user-profile-desc">
                    <div id="profile-user-accordion" className="custom-accordion">
                        <Card className="shadow-none border mb-2">
                            {/* import collaps */}
                            <CustomCollapse
                                title="About"
                                iconClass="ri-user-2-line"
                                isOpen={isOpen1}
                                toggleCollapse={toggleCollapse1}
                            >

                                <div>
                                    <p className="text-muted mb-1">{t('Name')}</p>
                                    <h5 className="font-size-14">{chatDetails?.displayProfileName}</h5>
                                </div>

                                <div className="mt-4">
                                    <p className="text-muted mb-1">{t('Mobile')}</p>
                                    <h5 className="font-size-14">{chatDetails?.waId}</h5>
                                </div>

                            </CustomCollapse>
                        </Card>
                        {/* End About card */}


                        <Card className="mb-1 shadow-none border">
                            {/* import collaps */}
                            <CustomCollapse
                                title="Tags"
                                iconClass="ri-bookmark-line"
                                isOpen={isOpen3}
                                toggleCollapse={toggleCollapse3}
                            >
                                <Grid container
                                    spacing={2}
                                    direction="row"
                                    alignItems="flex-start" className="">
                                    {conversationTag.map(tag =>
                                        <Grid >
                                            <Grid item xs={12} sx={{ p: 1 }} margin="auto" className='pointer'><Badge onClick={()=>getConversationByTag(tag.conversationTagId)} color="primary" className="badge rounded-pill bg-primary float-end">{tag.tag}</Badge></Grid>

                                        </Grid>
                                    )}
                                </Grid>

                                <button type="button" className="btn btn-link mt-1" onClick={toggleIsPopOver1}> Add tag</button>
                                {isPopOver1 &&
                                    <CreatableSelect
                                        isMulti
                                        onChange={handleChange}
                                        options={tagList}
                                        value={selectedTags}
                                        onBlur={toggleIsPopOver1}
                                        isClearable={false}
                                    />
                                }

                            </CustomCollapse>
                        </Card>

                        <Card className="mb-1 shadow-none border">
                            {/* import collaps */}
                            <CustomCollapse
                                title="Attached Files"
                                iconClass="ri-attachment-line"
                                isOpen={isOpen2}
                                toggleCollapse={toggleCollapse2}
                            >
                                {/* attached files */}
                                <AttachedFiles files={files} />
                            </CustomCollapse>
                        </Card>                  
                    </div>
                </SimpleBar>
                {/* end user-profile-desc */}
            </div>


        </React.Fragment>
    );
}

export default UserProfileSidebar;