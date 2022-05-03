
export default class URLConstants {

    //BASE URLs
    static GAUS_BASE_URL: string =
        process.env.GAUS_BASE_URL ||
        "https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/gaus";

      

    static GSNS_BASE_URL: string =
    process.env.GSNS_BASE_URL ||
    "https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/gsns"

    static GABS_BASE_URL: string =
    process.env.GABS_BASE_URL ||
    "https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/gabs"

    static GARP_BASE_URL: string =
    process.env.GARP_BASE_URL ||
    "https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/garp"

    static GAAS_BASE_URL: string =
    process.env.GAAS_BASE_URL ||
    "https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/gaas"

    static GCNS_BASE_URL: string =
    process.env.GCNS_BASE_URL ||
    "https://1crpomkpe9.execute-api.ap-south-1.amazonaws.com/prod/gcns"

    static GAMS_BASE_URL: string =
    process.env.GAMS_BASE_URL ||
    "https://api.telinfy.net/gams"
   

    static G_360_BASE_URL: string =
    process.env.G_360_BASE_URL ||
    "https://api.telinfy.net/g360";


    static LOGIN_BASE_URL: string = URLConstants.GAUS_BASE_URL + "/login";
    static SIGNUP_BASE_URL: string = URLConstants.GAUS_BASE_URL + "/signup";
    static USER_BASE_URL: string = URLConstants.GAUS_BASE_URL + "/users/me";
    static CREATE_USER_BASE_URL: string = URLConstants.GAUS_BASE_URL + "/users";
    static ALL_USER_BASE_URL: string = URLConstants.GAUS_BASE_URL + "/accounts/me/users";
    static ADD_CONTACT_BASE_URL: string = URLConstants.GARP_BASE_URL + "/users/me/contacts";
    static ALL_CONTACTS_BASE_URL: string = URLConstants.GARP_BASE_URL + "/users/me/contacts";
    static CREATE_WB_ACCOUNT_BASE_URL: string = URLConstants.G_360_BASE_URL + "/whatsapp-business/accounts";
    static UPDATE_WB_ACCOUNT_BASE_URL: string = URLConstants.G_360_BASE_URL + "/whatsapp-business/";
    static TEAMS_OF_ACCOUNT_BASE_URL: string = URLConstants.GAUS_BASE_URL + "/account/me/teams";
    static CREATE_TEAM_BASE_URL: string = URLConstants.GAUS_BASE_URL + "/account/teams";
    static USER_OF_TEAM_BASE_URL: string = URLConstants.GAUS_BASE_URL + "/team/:teamId/users";
    static GET_TEMPLATES_BASE_URL: string = URLConstants.G_360_BASE_URL + "/adapter/whatsapp/templates";
    static GET_WB_ACCOUNT_BASE_URL: string = URLConstants.G_360_BASE_URL + "/whatsapp-business/accounts";
    static SEARCH_CONTACTS_BASE_URL: string = URLConstants.GARP_BASE_URL + "/users/me/contact/search/";
    static ALL_CAMPAIGN_BASE_URL: string = URLConstants.GABS_BASE_URL + "/whatsapp/all/campaign";
    static ACCOUNT_STATS_BASE_URL: string = URLConstants.GAAS_BASE_URL + "/accounts/me/stats";
    static VALIDATE_CONTACT_BASE_URL: string = URLConstants.G_360_BASE_URL + "/whatsapp/contact/validate";

    static CHAT_LIST_BASE_URL: string = URLConstants.G_360_BASE_URL + "/whatsapp/conversations";
    static CHAT_MESSAGES_BASE_URL: string = URLConstants.G_360_BASE_URL + "/conversation/messages";
    static DIRECT_MESSAGES_BASE_URL: string = URLConstants.G_360_BASE_URL + "/whatsapp/message/direct";
    static CONVERSATION_UPDATE_BASE_URL: string = URLConstants.G_360_BASE_URL + "/conversation/agent";
    static CONVERSATION_TAGS_BASE_URL: string = URLConstants.G_360_BASE_URL + "/account/conversation/tag/fetch";
    static All_TAG_BASE_URL: string = URLConstants.G_360_BASE_URL + "/account/tag/fetch";
    static CREATE_TAG_BASE_URL: string = URLConstants.G_360_BASE_URL + "/account/tag/add";
    static ASSIGN_TAG_BASE_URL: string = URLConstants.G_360_BASE_URL + "/account/conversation/tag";
    static REMOVE_TAG_BASE_URL: string = URLConstants.G_360_BASE_URL + "/account/conversation/tag/delete";
    static CHAT_LIST_BY_TAG_BASE_URL: string = URLConstants.G_360_BASE_URL + "/whatsapp/conversations/tags/assigned";


    

  
  //GAMS URLs
  static SAVE_MEDIA_BASE_URL: string = URLConstants.GAMS_BASE_URL + "/adapter/files/save";
  static UPLOAD_FILE_BASE_URL: string = URLConstants.GAMS_BASE_URL + "/adapter/files/upload";

  static SEND_MESSAGE_BASE_URL: string = URLConstants.G_360_BASE_URL + "/whatsapp/templates/message";
  static SEND_CAMPAIGN_BASE_URL: string = URLConstants.G_360_BASE_URL + "/whatsapp/campaign";

}
