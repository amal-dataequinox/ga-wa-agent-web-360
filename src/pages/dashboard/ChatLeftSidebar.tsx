import React from 'react';
import { connect, Provider, useDispatch } from "react-redux";

import { TabContent, TabPane } from "reactstrap";

//Import Components
import Profile from "./Tabs/Profile";
import Chats from "./Tabs/Chats";
import Groups from "./Tabs/Groups";
import Contacts from "./Tabs/Contacts";
import Settings from "./Tabs/Settings";
import Home from './Tabs/Home';
import Broadcast from './Tabs/Broadcast';
import { store } from '../../redux-persist/store';
import { setActiveTab } from '../../redux/actions';
function ChatLeftSidebar(props: any) {

   
    const {activeTab} = props;
    console.log(activeTab);
    console.log(props);
    const toggleTab =(tab : string) => {
        props.setActiveTab(tab);
    }
    const recentChatList = []
    return (
        <React.Fragment>

            <TabContent activeTab={activeTab} className={activeTab !== 'chat' ? "full-width" : "sidebar-margin"}>
                {/* Start Profile tab-pane */}

                <TabPane tabId="home" id="pills-user" >
                    {/* profile content  */}
                    <Provider store={store}>
                    <Home />
                    </Provider>
                </TabPane>

                <TabPane tabId="profile" id="pills-user" >
                    {/* profile content  */}
                    <Provider store={store}>
                        <Profile />
                    </Provider>
                </TabPane>
                {/* End Profile tab-pane  */}

                {/* Start chats tab-pane  */}
                <TabPane tabId="chat" id="pills-chat" className="chat-leftsidebar">
                    {/* chats content */}
                    <Provider store={store}>
                       <Chats recentChatList={recentChatList} />
                    </Provider>
                </TabPane>
                {/* End chats tab-pane */}

                {/* Start groups tab-pane */}
                <TabPane tabId="broadcast" id="pills-groups" >
                    {/* Groups content */}
                    <Provider store={store}>
                        <Broadcast />
                    </Provider>
                </TabPane>
                {/* End groups tab-pane */}

                {/* Start contacts tab-pane */}
                <TabPane tabId="contacts" id="pills-contacts" >
                    {/* Contact content */}
                    <Provider store={store}>
                        <Contacts setActiveTab={toggleTab}/>
                    </Provider>
                </TabPane>
                {/* End contacts tab-pane */}

                {/* Start settings tab-pane */}
                <TabPane tabId="settings" id="pills-setting" >
                    {/* Settings content */}
                    <Provider store={store}>
                        <Settings />
                    </Provider>
                </TabPane>
                {/* End settings tab-pane */}
            </TabContent>
            {/* end tab content */}


        </React.Fragment>
    );
}

const mapStatetoProps = (state: any) => {
    return {
        ...state.Layout
    };
};

export default connect(mapStatetoProps, {setActiveTab})(ChatLeftSidebar);