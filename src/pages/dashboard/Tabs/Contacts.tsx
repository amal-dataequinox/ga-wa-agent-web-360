import React, { Component, useEffect, useState, useRef } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
  Form,
  Label,
  Input,
  InputGroup,
  FormFeedback,
  Table,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { withTranslation } from "react-i18next";
import {
  RootState,
  useDispatch,
  useSelector,
} from "../../../redux-persist/store";
import { getAllContacts, searchContacts } from "../../../redux-persist/slices/allContacts";
import {
  addNewContact,
  addNewContactFromFile,
  validateContactNumber,
} from "../../../redux-persist/slices/addContact";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from "xlsx";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import parsePhoneNumber from "libphonenumber-js";
import { CountryCode } from "libphonenumber-js/types";
import { useSnackbar } from "notistack";
import { AllContacts } from "../../../@types/allContacts";
import ContactDetailsSidebar from "../../../components/Campaigns/AddCampaign/ContactDetailsSidebar";

//use sortedContacts variable as global variable to sort contacts
let sortedContacts: any = [
  {
    group: "A",
    children: [{ name: "Demo" }],
  },
];

type FileUploadData = {
  FirstName: string;
  LastName: string;
  Email: string;
  CountryCode :string;
  MobileNumber: string;
};

type FileDataType = {
  lastModified: string;
  lastModifiedDate: Date;
  name: string;
  type: string;
  size: string;
  webkitRelativePath: string;
};

type AddContactValues = {
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhoneNumber: string;
};
const Contacts = (props: any) => {
  const dispatch = useDispatch();
  const [addContactFlag, setAddContactFlag] = useState(false);

  const { addContact,validateContact } = useSelector((state: RootState) => state.addContact);

  const { allContacts } = useSelector((state: RootState) => state.allContacts);
    const {setActiveTab} = props;
  useEffect(() => {
    dispatch(getAllContacts(1));
    // dispatch(addNewContact());
    setContacts(allContacts);
    setAddContactFlag(true);
  }, [dispatch]);

  const [contacts, setContacts] = useState(allContacts);
  const [addContactModal, setAddContactModal] = useState(false);
  const [addFileModal, setAddFileModalModal] = useState(false);
  const isFirstRender = useRef(true);
  const [file, setFile] = useState<FileDataType>();
  const [array, setArray] = useState<FileUploadData[]>([]);
  console.log(contacts);
  console.log(allContacts);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setContacts(allContacts);
    }
  });
  useEffect(() => {
    if (addContactFlag) {
      console.log("running");
      sortContact();
      setAddContactFlag(false);
    }
  }, [addContactFlag]);

  const toggleAddContactModal = () => {
    setAddContactModal(!addContactModal);
    formik.values.contactFirstName=""
    formik.values.contactLastName=""
    formik.values.contactPhoneNumber=""
    formik.values.contactEmail=""
    setPhone("");
  };

  const toggleAddFileModalModal = () => {
    setAddFileModalModal(!addFileModal);
  };

  const sortContact = () => {
    console.log("sortContact");
    console.log(allContacts);
    if (allContacts.length > 0) {
      let data = allContacts.reduce((r: any, e: any) => {
        console.log(e.contactFirstName);
        try {
          // get first letter of name of current element
          let group = e.contactFirstName[0].toUpperCase();
          // if there is no property in accumulator with this letter create it
          if (!r[group]) r[group] = { group, children: [e] };
          // if there is push current element to children array for that letter
          else r[group].children.push(e);
        } catch (error) {
          return sortedContacts;
        }
        // return accumulator
        return r;
      }, {});
      console.log(data);

      // since data at this point is an object, to get array of values
      // we use Object.values method
      let result = Object.values(data);
      setContacts(allContacts);
      sortedContacts = result;
      return result;
    }
  };
  console.log(sortedContacts);
  let validAccId;
  let listLength: number;
  if (contacts.length > 0) {
    validAccId = contacts[0].accountId;
    listLength = contacts.length;
  }
  useEffect(() => {
    if (contacts.length > 0) {
      setContacts(allContacts);
      sortContact();
      console.log("testing");
    }
  }, [validAccId]);

  const { t } = props;

  const formik = useFormik({
    initialValues: {
      contactFirstName: "",
      contactLastName: "",
      contactEmail: "",
      contactPhoneNumber: "",
    },
    validationSchema: Yup.object({
      contactFirstName: Yup.string().required("First name Required"),
      contactLastName: Yup.string().required("Last name Required"),
      contactEmail: Yup.string().email("Enter proper Email"),
      contactPhoneNumber: Yup.string(),
    }),
    onSubmit: async (values) => submitContacts(values),
  });
  const { enqueueSnackbar } = useSnackbar();
  const submitContacts = async (values: any) => {
    const response = await dispatch(validateContactNumber(values.contactPhoneNumber));
    if (response?.hasError) {
      enqueueSnackbar(response?.message, { variant: "error" });
    }
    else {
    
      if (response?.invalid?.length > 0) {
        enqueueSnackbar("Invalid mobile number", { variant: "error" });
      }
      else {
        const res = await dispatch(addNewContact(values));
        if (res?.hasError) {
          enqueueSnackbar(res?.message, { variant: "error" });
        } else {
          toggleAddContactModal();
          updateContactList();
        }
      }
    }
  };

  const updateContactList = async () => {
    await dispatch(getAllContacts(1));
    setContacts(allContacts);
    setAddContactFlag(true);
  };

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      var fileName = file.name;
      var fileExtension = fileName.split(".").pop();
      // alert(fileExtension);
      fileReader.onload = function (event) {
        const text = event.target.result;
        if (fileExtension == "csv") {
          csvFileToArray(text);
        }
        if (fileExtension == "xlsx") {
          xlsxFileToCsvFile(e);
        }
      };

      fileReader.readAsText(file);
    }
  };

  const csvFileToArray = (string) => {
    let csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    let csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    csvHeader = csvHeader.filter(function (element) {
      return element.length > 0;
    });

    csvRows = csvRows.filter(function (element) {
      return element.length > 0;
    });
    let array = csvRows.map((i) => {
      const values = i.split(",");

      const obj = csvHeader.reduce((object, header, index) => {
        object[header.trim()] = values[index];
        return object;
      }, {});
      return obj;
    });
    console.log(csvRows);

    array = array.map(tempContact=>({
      MobileNumber:`${tempContact.CountryCode}${tempContact.MobileNumber}`   
  }))
  console.log("contacts:",array);
    setArray(array);
    console.log(array);
    array.map(async (data) => {
      await dispatch(addNewContactFromFile(data));
    });

    toggleAddFileModalModal();
    updateContactList();
  };

  console.log(array);

  // converting xlsx file to csv format
  const xlsxFileToCsvFile = (e) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      csvFileToArray(data);
    };

    reader.readAsBinaryString(file);
  };
  const fileTypes = ["CSV", "XLSX"];

  const [phoneValue, setPhone] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("in");
  const [isContactSelected, setIsContactSelected] = useState(false);
  const [selectedContact, setSelectedContact] = useState<AllContacts>();
  const handlePhone = (
    phoneNumber: string,
    data: any,
    event: any,
    formatedText: string
  ) => {
    const { countryCode } = data;
    setPhone(phoneNumber);
    setCountryCode(countryCode);
    formik.values.contactPhoneNumber = "+" + phoneNumber;
  };
  const phoneNumber = parsePhoneNumber(
    `+${phoneValue}`,
    countryCode.toUpperCase() as CountryCode
  );
  const isPhoneNumberValid = phoneNumber?.isValid();
  const toggleContactSelected = () => {
    setIsContactSelected(!isContactSelected);
  };
  const closeContactSelected = () => setIsContactSelected(false)
  const handleContactSelection = (contact: AllContacts) => {
    setSelectedContact(contact);
    toggleContactSelected();
  };
  const searchContact = async (searchTerm:string) => {
    await dispatch(searchContacts(searchTerm,1,10));
    setContacts(allContacts);
    setAddContactFlag(true);
 }
  return (
    <React.Fragment>
        <div className="w-100">

<div className="d-lg-flex">

      <div className={isContactSelected ? "w-70" : "w-100"}>
        <div className="p-4">
          <div className="user-chat-nav float-end">
            <div id="add-file">
              {/* Button trigger addContactModal */}
              <Button
                type="button"
                color="link"
                onClick={toggleAddFileModalModal}
                className="text-decoration-none text-muted font-size-18 py-0"
              >
                <i className="ri-file-add-line"></i>
              </Button>
            </div>
            <UncontrolledTooltip target="add-file" placement="bottom">
              Add file
            </UncontrolledTooltip>
          </div>
          <div className="user-chat-nav float-end">
            <div id="add-contact">
              {/* Button trigger addContactModal */}
              <Button
                type="button"
                color="link"
                onClick={toggleAddContactModal}
                className="text-decoration-none text-muted font-size-18 py-0"
              >
                <i className="ri-user-add-line"></i>
              </Button>
            </div>
            <UncontrolledTooltip target="add-contact" placement="bottom">
              Add Contact
            </UncontrolledTooltip>
          </div>
          <h4 className="mb-4">Contacts</h4>

          {/* Start Add contact Modal */}
          <Modal
            isOpen={addContactModal}
            centered
            toggle={toggleAddContactModal}
          >
            <ModalHeader
              tag="h5"
              className="font-size-16"
              toggle={toggleAddContactModal}
            >
              {t("Add Contacts")}
            </ModalHeader>
            <ModalBody className="p-4">
              <Form onSubmit={formik.handleSubmit}>
                <div className="row mb-3">
                  <div className="col-lg-6">
                    <Label className="form-label">{t("First name")}</Label>
                    <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                      <span className="input-group-text text-muted">
                        <i className="ri-user-2-line"></i>
                      </span>
                      <Input
                        type="text"
                        id="contactFirstName"
                        name="contactFirstName"
                        className="form-control form-control-lg bg-soft-light border-light"
                        placeholder="Enter your First name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contactFirstName}
                        invalid={
                          formik.touched.contactFirstName &&
                          formik.errors.contactFirstName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.contactFirstName &&
                      formik.errors.contactFirstName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.contactFirstName}
                        </FormFeedback>
                      ) : null}
                    </InputGroup>
                  </div>
                  <div className="col-lg-6">
                    <Label className="form-label">{t("Last name")}</Label>
                    <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                      <span className="input-group-text text-muted">
                        <i className="ri-user-2-line"></i>
                      </span>
                      <Input
                        type="text"
                        id="contactLastName"
                        name="contactLastName"
                        className="form-control form-control-lg bg-soft-light border-light"
                        placeholder="Enter your Last name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contactLastName}
                        invalid={
                          formik.touched.contactLastName &&
                          formik.errors.contactLastName
                            ? true
                            : false
                        }
                      />
                      {formik.touched.contactLastName &&
                      formik.errors.contactLastName ? (
                        <FormFeedback type="invalid">
                          {formik.errors.contactLastName}
                        </FormFeedback>
                      ) : null}
                    </InputGroup>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-lg-6">
                    <Label className="form-label">{t("Email")}</Label>
                    <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                      <span className="input-group-text text-muted">
                        <i className="ri-mail-line"></i>
                      </span>
                      <Input
                        type="text"
                        id="contactEmail"
                        name="contactEmail"
                        className="form-control form-control-lg bg-soft-light border-light"
                        placeholder="Enter Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contactEmail}
                        invalid={
                          formik.touched.contactEmail &&
                          formik.errors.contactEmail
                            ? true
                            : false
                        }
                      />
                      {formik.touched.contactEmail &&
                      formik.errors.contactEmail ? (
                        <FormFeedback type="invalid">
                          {formik.errors.contactEmail}
                        </FormFeedback>
                      ) : null}
                    </InputGroup>
                  </div>
                  <div className="col-lg-6">
                    <Label className="form-label">{t("Mobile number")}</Label>

                    {/*  <Input
                                                type="text"
                                                id="contactPhoneNumber"
                                                name="contactPhoneNumber"
                                                className="form-control form-control-lg bg-soft-light border-light"
                                                placeholder="Enter mobile number"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.contactPhoneNumber}
                                                invalid={formik.touched.contactPhoneNumber && formik.errors.contactPhoneNumber ? true : false}
                                            />
                                            {formik.touched.contactPhoneNumber && formik.errors.contactPhoneNumber ? (
                                                <FormFeedback type="invalid">{formik.errors.contactPhoneNumber}</FormFeedback>
                                            ) : null} */}
                    <PhoneInput
                      inputStyle={{
                        width: `100%`,
                        padding: `0.5rem 3rem`,
                        borderColor: `#e6ebf5`,
                        backgroundColor: `rgba(230, 235, 245, 0.25)`,
                      }}
                      dropdownStyle={{
                        width: 314,
                      }}
                      specialLabel=""
                      placeholder=""
                      inputProps={{
                        name: "contactLastName",
                        required: true,
                      }}
                      country={"in"}
                      value={phoneValue}
                      onChange={handlePhone}
                      isValid={Boolean(
                        !(formik.touched.contactLastName && !isPhoneNumberValid)
                      )}
                    />
                    {formik.touched.contactLastName && !isPhoneNumberValid ? (
                      <FormFeedback type="invalid">
                        {formik.errors.contactLastName}
                      </FormFeedback>
                    ) : null}
                  </div>
                </div>
                <div className="d-grid pt-20">
                  <Button
                    color="primary"
                    block
                    className=" waves-effect waves-light"
                    type="submit"
                  >
                    Add User
                  </Button>
                </div>
              </Form>
            </ModalBody>
            {/* <ModalFooter>
                            <Button type="button" color="link" onClick={toggle}>Close</Button>
                            <Button type="button" color="primary">Invite Contact</Button>
                        </ModalFooter> */}
          </Modal>
          {/* End Add file Modal */}

          {/* Start Add file Modal */}
          <Modal
            isOpen={addFileModal}
            centered
            toggle={toggleAddFileModalModal}
          >
            <ModalHeader
              tag="h5"
              className="font-size-16"
              toggle={toggleAddFileModalModal}
            >
              {t("Add Contacts")}
            </ModalHeader>
            <ModalBody className="p-4">
              <div style={{ textAlign: "center" }}>
                <br />
                <FileUploader
                  handleChange={handleOnChange}
                  name="file"
                  types={fileTypes}
                />
                <br />
                <Button
                  color="primary"
                  block
                  className=" waves-effect waves-light"
                  onClick={(e) => {
                    handleOnSubmit(e);
                  }}
                >
                  Upload
                </Button>

                <br />
                {/* <Table responsive striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>MobileNumber</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {array.map((row) => (
                                            <tr key={row.FirstName}>
                                                <td>{row.FirstName}</td>
                                                <td>{row.LastName}</td>
                                                <td>{row.Email}</td>
                                                <td>{row.MobileNumber}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table> */}
              </div>
            </ModalBody>
            {/* <ModalFooter>
                            <Button type="button" color="link" onClick={toggle}>Close</Button>
                            <Button type="button" color="primary">Invite Contact</Button>
                        </ModalFooter> */}
          </Modal>
          {/* End Add contact Modal */}

          <div className="search-box chat-search-box">
            <InputGroup size="lg" className="bg-light rounded-lg">
              <Button
                color="link"
                className="text-decoration-none text-muted pr-1"
                type="button"
              >
                <i className="ri-search-line search-icon font-size-18"></i>
              </Button>
              <Input type="text" className="form-control bg-light " placeholder={t('Search users..')}  onChange={(e) => searchContact(e.target.value)}/>
            </InputGroup>
          </div>
          {/* End search-box */}
        </div>
        {/* end p-4 */}

        {/* Start contact lists */}
        <SimpleBar
          style={{ maxHeight: "100%" }}
          id="chat-room"
          className="p-4 chat-message-list chat-group-list"
        >
          {sortedContacts.map((contact: any, key: number) => (
            <div key={key} className={key + 1 === 1 ? "" : "mt-3"}>
              <div className="p-3 fw-bold text-primary">{contact.group}</div>

              <ul className="list-unstyled contact-list">
                {contact.children.map((child: any, key: number) => (
                  <li key={key}>
                    <div className="d-flex align-items-center">
                      <div
                        className="flex-1"
                        onClick={() => handleContactSelection(child)}
                      >
                        <h5 className="font-size-14 m-0">
                          {child.contactFirstName} {child.contactLastName} /{" "}
                          {child.contactPhoneNumber}
                        </h5>
                      </div>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="text-muted">
                          <i className="ri-more-2-fill"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem>
                            {t("Share")}{" "}
                            <i className="ri-share-line float-end text-muted"></i>
                          </DropdownItem>
                          <DropdownItem>
                            {t("Block")}{" "}
                            <i className="ri-forbid-line float-end text-muted"></i>
                          </DropdownItem>
                          <DropdownItem>
                            {t("Remove")}{" "}
                            <i className="ri-delete-bin-line float-end text-muted"></i>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </SimpleBar>
        {/* end contact lists */}
      </div>
      {selectedContact && <ContactDetailsSidebar setActiveTab={setActiveTab} isContactSelected={isContactSelected} selectedContact={selectedContact} closeContactSelected={closeContactSelected}/>}
     </div>
     </div>
       
      
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  const { contacts } = state.Chat;
  return { contacts };
};

export default withTranslation()(Contacts);