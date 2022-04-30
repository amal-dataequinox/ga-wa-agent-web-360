import React, { Component, useEffect } from 'react';
import { withRouter } from "react-router-dom";

//Import Components
import LeftSidebarMenu from "./LeftSidebarMenu";

const Index = (props: any) => {

    //function for capital first letter of current page pathname
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(1).toUpperCase() + string.slice(2);
    };

    useEffect(() => {
        let currentage = capitalizeFirstLetter(props.location.pathname);

        //set document title according to page path name
        document.title = currentage + " | Telinfy";
    }, [])

    console.log(props);


    return (
        <React.Fragment>
            <div className="layout-wrapper d-lg-flex">
                {/* left sidebar menu */}
                <LeftSidebarMenu />
                {/* render page content */}
                {props.children}
            </div>
        </React.Fragment>
    );

}


export default (withRouter(Index));