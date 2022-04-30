import React, { Component, useState, useEffect, useRef } from 'react';
import { Input, Label } from "reactstrap";
import { connect } from "react-redux";

//use sortedContacts variable as global variable to sort contacts
let sortedContacts: any = [
    {
        group: "A",
        children: [{ id: 0, name: "Demo" }]
    }
]

const SelectContact = (props: any) => {
    const [contacts, setContacts] = useState(props.contacts);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            setContacts(props.contacts);
        }
    })

    const sortContact = () => {
        let data = contacts.reduce((r: any, e: any) => {
            try {
                // get first letter of name of current element
                let group = e.name[0];
                // if there is no property in accumulator with this letter create it
                if (!r[group]) r[group] = { group, children: [e] }
                // if there is push current element to children array for that letter
                else r[group].children.push(e);
            } catch (error) {
                return sortedContacts;
            }
            // return accumulator
            return r;
        }, {})

        // since data at this point is an object, to get array of values
        // we use Object.values method
        let result = Object.values(data);
        setContacts(contacts.result);
        sortedContacts = result;
        return result;
    }

    useEffect(() => {
        sortContact();
    }, [])

    useEffect(() => {
        return () => {
            sortContact();
        }
    }, [])


    return (

        <React.Fragment>
            {
                sortedContacts.map((contact: any, key: string) =>
                    <div key={key}>
                        <div className="p-3 font-weight-bold text-primary">
                            {contact.group}
                        </div>

                        <ul className="list-unstyled contact-list">
                            {
                                contact.children.map((child: any, keyChild: string) =>

                                    <li key={keyChild}>
                                        <div className="form-check">
                                            <Input type="checkbox" className="form-check-input" onChange={(e) => props.handleCheck(e, child.id)} id={"memberCheck" + child.id} value={child.name} />
                                            <Label className="form-check-label" htmlFor={"memberCheck" + child.id}>{child.name}</Label>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )
            }
        </React.Fragment>
    );

}

const mapStateToProps = (state: any) => {
    const { contacts } = state.Chat;
    return { contacts };
};

export default (connect(mapStateToProps, {})(SelectContact));