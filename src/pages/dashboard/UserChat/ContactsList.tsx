import React from 'react';
import { Card, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";

//i18n
import { useTranslation } from 'react-i18next';

function ContactsList(props) {
    console.log(props);
    const contacts =props?.contacts;
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    return (
        <React.Fragment>
            {contacts.map((contact,key)=>
            <Card className="p-2 mb-2" key={key}>
                <div className="d-flex align-items-center">
                    <div className="avatar-sm me-3 ms-0">
                        <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                            <i className="ri-contacts-book-line"></i>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-start">
                            <h5 className="font-size-14 mb-1">{contact?.name?.formatted_name}</h5>
                            {/* <p className="text-muted font-size-13 mb-0">{props.fileSize}</p> */}
                        </div>
                        {contact?.phones?.map((phone,key)=>
                        <div className="text-start" key={key}>
                           <h5 className="font-size-14 mb-1">{phone?.phone}</h5>
                        </div>)}
                    </div>

                    <div className="ms-4">
                        <ul className="list-inline mb-0 font-size-20">
                            <li className="list-inline-item">
                                {/*   <a href={props?.fileUrl} className="text-muted">  <i className="ri-download-2-line"></i></a>
                              <Link to="#" className="text-muted">
                                    <i className="ri-download-2-line"></i>
                                </Link> */}
                            </li>
                            <UncontrolledDropdown tag="li" className="list-inline-item">
                                <DropdownToggle tag="a" className="dropdown-toggle text-muted">
                                    <i className="ri-more-fill"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>{t('Share')} <i className="ri-share-line float-end text-muted"></i></DropdownItem>
                                    <DropdownItem>{t('Delete')} <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </ul>
                    </div>
                </div>
            </Card>  )}
        </React.Fragment>
    );
}

export default ContactsList;