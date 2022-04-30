import React, { Component } from 'react';
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat";

import { connect } from "react-redux";


const Index = (props: any) => {

    const {users} = props;
    console.log(props.activeTab)
    return (
        <React.Fragment>
            {/* chat left sidebar */}
            {<ChatLeftSidebar recentChatList={[]} />}

            {/* user chat */}
            {props.activeTab=='chat' &&
            (<UserChat recentChatList={[]} /> )}

        </React.Fragment>
    );

}

const mapStateToProps = (state:any) => {
    const { users } = state.Chat;
    return { users, ...state.Layout };
};

export default connect(mapStateToProps, {})(Index);