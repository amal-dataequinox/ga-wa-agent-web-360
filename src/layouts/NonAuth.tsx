import React, { Component, useEffect } from 'react';
import { withRouter } from "react-router-dom";

const NonAuth = (props: any) => {

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(1).toUpperCase() + string.slice(2);
    };

    useEffect(() => {
        let currentage = capitalizeFirstLetter(props.location.pathname);

        document.title =
            currentage + " | Telinfy";
    }, [])


    return <React.Fragment>
        {props.children}
    </React.Fragment>;

}

export default (withRouter(NonAuth));