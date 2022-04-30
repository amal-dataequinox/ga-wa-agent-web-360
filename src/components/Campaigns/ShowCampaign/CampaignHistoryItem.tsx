import { Grid, Card, Box, Typography, Chip } from "@material-ui/core";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { CampaignHistory } from "./CampaignHistory";

export const CampaignHistoryItem = (campaignList : any) => {
    const [campaignData, setCampaignData] = useState("");
    const [campaignName, setCampaignName] = useState("");
    const [campaignDetailsModal, setCampaignDetailsModal] = useState(false);


    const getDate = (dateString: string) => {
        let dateStringTemp = new Date(dateString);
        let date = dateStringTemp.toDateString();
        return (date)
    }
    
    const getTime = (timeString: string) => {
       
        let timeStringTempl = new Date(timeString).toTimeString();
        var index = timeStringTempl.lastIndexOf(':') + 3
        let time = timeStringTempl.substring(0, index);
        return (time)
    }


    const getCampaignId = (campaignId: string) => {
        let campaignIdTemp = campaignId.substring(campaignId.lastIndexOf('-') + 1,campaignId.length).toLocaleUpperCase();
        return (campaignIdTemp)
    }

    const getCampaign = (campaignId:string,campaignName:string) => {
        setCampaignData(campaignId);
        setCampaignName(campaignName);
        toggleCampaignDetails();
    }

    const toggleCampaignDetails = () => {
        setCampaignDetailsModal(!campaignDetailsModal)
    }
    return (
        <>
            
            
                 <Grid  container
                 spacing={2}
                 direction="row"
                 alignItems="flex-start"
                >
                    {campaignList.campaignList.map((campaign: any) => 
                        <Grid item xs={12} md={4} key={campaign.campaignId}>
                            <Card sx={{ cursor: "pointer", padding: 3, mb: 2, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "25px", marginBottom: "30px" }} onClick={() => getCampaign(campaign.campaignId, campaign.campaignName)}>
                                <Box display={'flex'} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                    <Box flex={3}>
                                        <h4>{campaign.campaignName}</h4>
                                        <h6>{getCampaignId(campaign?.campaignId)}</h6>
                                    </Box>
                                    <Box flex={3}>
                                        <h6>{getDate(campaign?.scheduleTime)}</h6>
                                        <p>{getTime(campaign?.scheduleTime)}</p>
                                    </Box>
                                    <Box flex={1}>
                                        <Chip color="primary" label={campaign.status} variant="outlined" />
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                          )}
                    </Grid>
                  
            
                
            <Modal isOpen={campaignDetailsModal} centered toggle={toggleCampaignDetails} style={{ maxWidth: '1000px' }}>
                <ModalHeader  toggle={toggleCampaignDetails}>

                </ModalHeader>
                <ModalBody className="p-4">
                    <CampaignHistory campaignId={campaignData} campaignName={campaignName} />
                </ModalBody>
                {/* <ModalFooter>
        <Button type="button" color="link" onClick={toggleAddUser}>Close</Button>
        <Button  color="primary"  type="submit" onClick={={}}>Add User</Button>
    </ModalFooter> */}
            </Modal></>
        )
        
}