import React, { useState } from 'react';
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";

//i18n
import { useTranslation } from 'react-i18next';

//lightbox
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function ImageList(props) {
    const [isOpen, setisOpen] = useState(false);
    const [currentImage, setcurrentImage] = useState("");
    const [images] = useState(props.images);
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    const toggleLightbox = (currentImage:string) => {
        setisOpen(true);
        setcurrentImage(currentImage);
    }

    return (
        <React.Fragment>
            <ul className="list-inline message-img  mb-0">
                {/* image list */}
                {
                 
                        <li className="list-inline-item message-img-list">
                            <div>
                                <Link to="#" onClick={() => toggleLightbox(images)} className="popup-img d-inline-block m-1" title="Project 1">
                                    <img src={images} alt="chat" className="rounded border" />
                                </Link>
                            </div>
                            <div className="message-img-link">
                                <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <a href={images}>
                                        <i className="ri-download-2-line"></i>
                                    </a>
                                </li>
                                    <UncontrolledDropdown tag="li" className="list-inline-item">
                                        <DropdownToggle tag="a">
                                            <i className="ri-more-fill"></i>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>
                                            <DropdownItem>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>
                                            <DropdownItem>{t('Forward')} <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>
                                            <DropdownItem>{t('Delete')} <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </ul>
                            </div>
                        </li>
                    
                }

          

            </ul>

            {isOpen && (
                    <Lightbox
                        mainSrc={currentImage}
                        onCloseRequest={()=>toggleLightbox}
                        imageTitle="Project 1"
                    />
                )}
        </React.Fragment>
    );
}

export default ImageList;