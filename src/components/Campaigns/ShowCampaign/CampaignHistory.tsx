import { Card, CardHeader, Grid, Typography,Box } from "@material-ui/core"
import {DoneAll, QueueOutlined, Reply, ScheduleSend, Send, SmsFailed,Done} from "@mui/icons-material";
import { useEffect } from "react";
import { Button } from "reactstrap";
import { getCampaignStats } from "../../../redux-persist/slices/campaignStats";
import { RootState, useDispatch, useSelector } from "../../../redux-persist/store";
export const CampaignHistory = (campaignData:any) => {
    console.log(campaignData.campaignName);
    
    const iconResolution = { width : 50 , height : 50}
    const categories = [{ title: "QUEUED", value: 10, icon : <QueueOutlined sx={{...iconResolution}}/> }, { title: "SENDING", value: 23 , icon : <ScheduleSend sx={{...iconResolution}}/>}, { title: "SENT", value: 10, icon : <Send sx={{color:"#6abb44",...iconResolution}}/> }, { title: "DELIVERED", value: 14, icon : <DoneAll sx={{color : "#9c9c9f",...iconResolution}}/> }, { title: "READ", value: 10, icon : <DoneAll sx={{color : "#34B7F1",...iconResolution}}/> }, { title: "REPLIED", value: 0 , icon : <Reply sx={{...iconResolution}}/> }, { title: "FAILED", value: 0 , icon : <SmsFailed sx={{color : "#FC100D",...iconResolution}}/>}];
    const dispatch = useDispatch();
    
    const { campaignStats } = useSelector(
        (state: RootState) => state.campaignStats
    );
    useEffect(() => {
        dispatch(getCampaignStats(campaignData?.campaignId));
    }, [dispatch]);
    console.log(campaignStats);

    const refreshCampaignDetails= ()=>{
      dispatch(getCampaignStats(campaignData?.campaignId));
    }
    
    return (<Grid item lg={12} margin={"auto"}>
        {/* <Card sx={{p:2}}> */}
        <div className="mb-4">
        <div className="float-end">
         <Button color="light"onClick={refreshCampaignDetails} block className="waves-effect waves-light"><i className="ri-refresh-line"></i></Button>
           </div> 
        {campaignData?.campaignName?
         <h4 >{campaignData?.campaignName}</h4>
         :null}
    
        </div>
         
      
            <Box p={1}>
            {/* <Typography>{campaignName.campaignName}</Typography> */}
          
               <Grid container justifyItems={"center"} justifyContent="space-between">
                  <Grid item xs={12} lg={3} md={4} m={1}>
                      <Card>
                      <Box p={3}  display="flex" justifyContent={"space-between"} alignItems="center" >
                      <Box><QueueOutlined sx={{...iconResolution}}/></Box>
                      <Box>
                        <Typography textAlign={"right"}>QUEUED</Typography>
                        {campaignStats?.stats?.queued ? <Typography textAlign={"right"}>{campaignStats?.stats?.queued}</Typography> :
                        <Typography textAlign={"right"}>0</Typography>} 
                      </Box>
                  </Box>
                  </Card>
                  </Grid>
                  <Grid item xs={12} lg={3} md={4} m={1}>
                      <Card>
                      <Box p={3}  display="flex" justifyContent={"space-between"} alignItems="center" >
                      <Box><Send sx={{color:"#6abb44",...iconResolution}}/></Box>
                      <Box>
                        <Typography textAlign={"right"}>ACCEPTED</Typography>
                        {campaignStats?.stats?.accepted ? <Typography textAlign={"right"}>{campaignStats?.stats?.accepted}</Typography> :
                        <Typography textAlign={"right"}>0</Typography>} 
                      </Box>
                  </Box>
                  </Card>
                  </Grid>
                  <Grid item xs={12} lg={3} md={4} m={1}>
                      <Card>
                      <Box p={3}  display="flex" justifyContent={"space-between"} alignItems="center" >
                      <Box><DoneAll sx={{color : "#9c9c9f",...iconResolution}}/></Box>
                      <Box>
                        <Typography textAlign={"right"}>DELIVERED</Typography>
                        {campaignStats?.stats?.delivered ? <Typography textAlign={"right"}>{campaignStats?.stats?.delivered}</Typography> :
                        <Typography textAlign={"right"}>0</Typography>} 
                      </Box>
                  </Box>
                  </Card>
                  </Grid>
                  <Grid item xs={12} lg={3} md={4} m={1}>
                      <Card>
                      <Box p={3}  display="flex" justifyContent={"space-between"} alignItems="center" >
                      <Box> <DoneAll sx={{color : "#34B7F1",...iconResolution}}/></Box>
                      <Box>
                        <Typography textAlign={"right"}>READ</Typography>
                        {campaignStats?.stats?.read ? <Typography textAlign={"right"}>{campaignStats?.stats?.read}</Typography> :
                        <Typography textAlign={"right"}>0</Typography>} 
                      </Box>
                  </Box>
                  </Card>
                  </Grid>
       
                  <Grid item xs={12} lg={3} md={4} m={1}>
                      <Card>
                      <Box p={3}  display="flex" justifyContent={"space-between"} alignItems="center" >
                      <Box><SmsFailed sx={{color : "#FC100D",...iconResolution}}/></Box>
                      <Box>
                        <Typography textAlign={"right"}>FAILED</Typography>
                        {campaignStats?.stats?.failed ? <Typography textAlign={"right"}>{campaignStats?.stats?.failed}</Typography> :
                        <Typography textAlign={"right"}>0</Typography>} 
                      </Box>
                  </Box>
                  </Card>
                  </Grid>

                  <Grid item xs={12} lg={3} md={4} m={1}>
                      <Card>
                      <Box p={3}  display="flex" justifyContent={"space-between"} alignItems="center" >
                      <Box><Done sx={{color : "#9c9c9f",...iconResolution}}/></Box>
                      <Box>
                        <Typography textAlign={"right"}>Sent</Typography>
                        {campaignStats?.stats?.sent ? <Typography textAlign={"right"}>{campaignStats?.stats?.sent}</Typography> :
                        <Typography textAlign={"right"}>0</Typography>} 
                      </Box>
                  </Box>
                  </Card>
                  </Grid>
               </Grid>
           
            </Box>
        {/* </Card> */}
    </Grid>)
}