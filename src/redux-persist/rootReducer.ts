import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/user';
import customerReducer from './slices/customer';
import allUserReducer from './slices/allUser';
import createUserReducer from './slices/createUser';
import allContatcsReducer from './slices/allContacts';
import addContatcsReducer from './slices/addContact';
import createWBAccountReducer from './slices/createWBAccount';
import teamsOfAccountReducer from './slices/teamsOfAccount';
import createTeamReducer from './slices/createTeam';
import usersOfTeamReducer from './slices/usersOfTeam';
import addUserToTeamReducer from './slices/addUserToTeam';
import getTemplatesReducer from './slices/getAllTemplates';
import getWBAccountsReducer from './slices/getWBAccounts';
import sendMessageReducer from './slices/sendMessage';
import campaignDataReducer from './slices/campaignData';
import fromNumberReducer from './slices/fromNumber';
import sentCampaignReducer from './slices/sentCampaign';
import campaignListReducer from './slices/campaignList';
import accountStatsReducer from './slices/accountStats';
import chatMessagesReducer from './slices/chatMessages';
import directMessageReducer from './slices/directMessage';
import updateConversationReducer from './slices/updateConversation';
import campaignDetailsReducer from './slices/campaignDetails';
import campaignStatsReducer from './slices/campaignStats';
import chatList from './slices/chatList';
import mediaSaveReducer from './slices/mediaSave';
import conversationTagsReducer from './slices/ConversationTags';
import fileUploadReducer from './slices/fileUpload';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  customer: customerReducer,
  allUser : allUserReducer,
  createUser:createUserReducer,
  addContact : addContatcsReducer,
  allContacts : allContatcsReducer,
  createWBAccount:createWBAccountReducer,
  teamsOfAccount:teamsOfAccountReducer,
  createTeam : createTeamReducer,
  usersOfTeam : usersOfTeamReducer,
  addUserToTeam:addUserToTeamReducer,
  getTemplates :getTemplatesReducer,
  getWBAccount:getWBAccountsReducer,
  sendMessage:sendMessageReducer,
  campaignData:campaignDataReducer,
  fromNumber: fromNumberReducer,
  sentCampaign:sentCampaignReducer,
  campaignList:campaignListReducer,
  chatList : chatList ,
  accountStats :accountStatsReducer,
  chatMessagesList:chatMessagesReducer,
  directMessage:directMessageReducer,
  updateConversation:updateConversationReducer,
  campaignDetails:campaignDetailsReducer,
  campaignStats:campaignStatsReducer,
  mediaSave:mediaSaveReducer,
  conversationTags:conversationTagsReducer,
  fileUpload:fileUploadReducer
});

export { rootPersistConfig, rootReducer };
