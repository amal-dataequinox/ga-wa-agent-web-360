import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Card, Badge } from "reactstrap";

//Simple bar
import SimpleBar from "simplebar-react";

//components
import AttachedFiles from "../../AttachedFiles";
import CustomCollapse from "../../CustomCollapse";

//actions
import { closeContactSidebar } from "../../../redux/actions";

//i18n
import { useTranslation } from "react-i18next";

//image
import avatar7 from "../../../assets/images/users/avatar-7.jpg";
import { AllContacts } from "../../../@types/allContacts";
import { addTempContact, setActiveUser } from "../../../redux-persist/slices/chatList";
import { dispatch, RootState, useSelector } from "../../../redux-persist/store";


type ContactDetailsProps = {
  selectedContact: AllContacts;
  setActiveTab : (activeTab : string) => void;
};

function ContactDetailsSidebar(props: ContactDetailsProps) {
  const { selectedContact } = props;
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [files] = useState([
    { name: "Admin-A.zip", size: "12.5 MB", thumbnail: "ri-file-text-fill" },
    { name: "Image-1.jpg", size: "4.2 MB", thumbnail: "ri-image-fill" },
    { name: "Image-2.jpg", size: "3.1 MB", thumbnail: "ri-image-fill" },
    { name: "Landing-A.zip", size: "6.7 MB", thumbnail: "ri-file-text-fill" },
  ]);

  /* intilize t variable for multi language implementation */
  const { t } = useTranslation();

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

  const { recentChats,tempContact,activeUser } = useSelector(
    (state: RootState) => state.chatList
);


  // closes sidebar
 const tempTextHandler = () => { 
   console.log(selectedContact.contactId);
   console.log(recentChats);
  const index = selectedContact.contactId || ""
  //let recentChats = JSON.parse(localStorage.getItem("recentChatStorage") || '[]') || []
  const chatDetails = recentChats.find((chatItem) => chatItem.contactId === index)
   if(!chatDetails){
    addTempContact({...selectedContact,status :"online",messages :[]})();
   }
     dispatch(setActiveUser(index))
    
      props.setActiveTab("chat")
 }
  // style={{display: props.userSidebar  ? "block" : "none"}}

  return (
    <React.Fragment>
      <div
        style={{ display: props.isContactSelected === true ? "block" : "none" }}
        className="user-profile-sidebar"
      >
        <div className="px-3 px-lg-4 pt-3 pt-lg-4">
          <div className="user-chat-nav  text-end">
            <Button
              color="none"
              type="button"
              onClick={props.closeContactSelected}
              className="nav-btn"
              id="user-profile-hide"
            >
              <i className="ri-close-line"></i>
            </Button>
          </div>
        </div>

        <div className="text-center p-4 border-bottom">
          <div className="mb-4 d-flex justify-content-center">
            <div className="avatar-lg">
              <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-24">
                {selectedContact.contactFirstName.charAt(0)}
              </span>
            </div>
          </div>

          <h5 className="font-size-16 mb-1 text-truncate">
            {selectedContact.contactFirstName}
          </h5>
          <div>
              {/* <Button  color="primary"><i style={{marginRight: 4,
    position: "relative",
    top: 2
}} className="ri-message-2-fill"></i>Message</Button> */}
          </div>
          {/* <p className="text-muted text-truncate mb-1">
            {(() => {
              switch (props.activeUser.status) {
                case "online":
                  return (
                    <>
                      <i className="ri-record-circle-fill font-size-10 text-success me-1"></i>
                    </>
                  );

                case "away":
                  return (
                    <>
                      <i className="ri-record-circle-fill font-size-10 text-warning me-1"></i>
                    </>
                  );

                case "offline":
                  return (
                    <>
                      <i className="ri-record-circle-fill font-size-10 text-secondary me-1"></i>
                    </>
                  );

                default:
                  return;
              }
            })()}
            Active
          </p> */}
        </div>
        {/* End profile user */}

        {/* Start user-profile-desc */}
        <SimpleBar
          style={{ maxHeight: "100%" }}
          className="p-4 user-profile-desc"
        >
          {/* <div className="text-muted">
            <p className="mb-4">
              "
              {t(
                "If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual."
              )}
              "
            </p>
          </div> */}

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
                  <p className="text-muted mb-1">{t("Name")}</p>
                  <h5 className="font-size-14">{`${selectedContact.contactFirstName} ${selectedContact.contactLastName}`}</h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">{t("Email")}</p>
                  <h5 className="font-size-14">
                    {selectedContact.contactEmail}
                  </h5>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-1">{'Phone number'}</p>
                  <h5 className="font-size-14">{selectedContact.contactPhoneNumber}</h5>
                </div>

                {/* <div className="mt-4">
                  <p className="text-muted mb-1">{t("Location")}</p>
                  <h5 className="font-size-14 mb-0">California, USA</h5>
                </div> */}
              </CustomCollapse>
            </Card>
            {/* End About card */}

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

            {false && (
              <Card className="mb-1 shadow-none border">
                {/* import collaps */}
                <CustomCollapse
                  title="Members"
                  iconClass="ri-group-line"
                  isOpen={isOpen3}
                  toggleCollapse={toggleCollapse3}
                >
                  <Card className="p-2 mb-2">
                    <div className="d-flex align-items-center">
                      <div className="chat-user-img align-self-center me-3">
                        <div className="avatar-xs">
                          <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                            S
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-left">
                          <h5 className="font-size-14 mb-1">
                            {t("Sara Muller")}
                            <Badge
                              color="danger"
                              className="badge-soft-danger float-end"
                            >
                              {t("Admin")}
                            </Badge>
                          </h5>
                          {/* <p className="text-muted font-size-13 mb-0">{member.status}</p> */}
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-2 mb-2">
                    <div className="d-flex align-items-center">
                      <div className="chat-user-img align-self-center me-3">
                        <div className="avatar-xs">
                          <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                            O
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-left">
                          <h5 className="font-size-14 mb-1">
                            {t("Ossie Wilson")}
                          </h5>
                          {/* <p className="text-muted font-size-13 mb-0">{member.status}</p> */}
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-2 mb-2">
                    <div className="d-flex align-items-center">
                      <div className="chat-avatar">
                        <img
                          src={avatar7}
                          className="rounded-circle chat-user-img avatar-xs me-3"
                          alt="chatvia"
                        />
                      </div>
                      <div>
                        <div className="text-left">
                          <h5 className="font-size-14 mb-1">
                            {t("Paul Haynes")}
                          </h5>
                          {/* <p className="text-muted font-size-13 mb-0">{member.status}</p> */}
                        </div>
                      </div>
                    </div>
                  </Card>
                </CustomCollapse>
              </Card>
            )}
          </div>
        </SimpleBar>
        {/* end user-profile-desc */}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: any) => {
  console.log(state);
};

export default connect(mapStateToProps, { })(
  ContactDetailsSidebar
);
