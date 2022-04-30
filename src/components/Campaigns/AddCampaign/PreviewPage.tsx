import { Box, Card, Divider, Grid } from "@material-ui/core"
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Button } from "reactstrap";
import { Component, Template } from "../../../@types/getTemplatesType"
import { getCampaignName } from "../../../redux-persist/slices/campaignData";
import { sendNewCampaign } from "../../../redux-persist/slices/sentCampaign";
import { RootState, useDispatch, useSelector } from "../../../redux-persist/store";
import MinimalTemplatePreview from "./MinimalTemplatePreview"

type PreviewPageProps = {
    templateCurrData: Template | undefined;
    setActiveStep: (num: number) => void;
    activeStep: number;
    showBroadcastSection: () => void;
}


export const PreviewPage = ({ templateCurrData, activeStep, setActiveStep, showBroadcastSection }: PreviewPageProps) => {
    const headerData = templateCurrData?.components.find(({ type }: Component) => type === "HEADER");
 
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { campaignData } = useSelector(
        (state: RootState) => state.campaignData
    );
    const { sendCampaign } = useSelector(
        (state: RootState) => state.sentCampaign
    );

    const { mediaSave } = useSelector(
        (state: RootState) => state.mediaSave
    );

    let headerParameters = [];
    let bodyParameters = [];



    let header = {};
    let body = {};

    const handleCampaignSubmit = async () => {
        // showBroadcastSection();
        let bodyVariable1;
        let bodyVariable2;
        let bodyVariable3;
        let bodyVariable4;
        let bodyVariable5;
        let bodyVariable6;
        let headerVariable1;
        let headerVariable2;
        let headerVariable3;
        let headerVariable4;
        let headerVariable5;

        if (campaignData?.variables) {
            let variableKeys = Object.keys(campaignData?.variables)
            variableKeys.map(variables => {
                if (variables == 'body0') {

                    bodyVariable1 = campaignData?.variables?.body0
                }
                if (variables == 'body1') {
                    bodyVariable2 = campaignData?.variables?.body1
                }
                if (variables == 'body2') {
                    bodyVariable3 = campaignData?.variables?.body2
                }
                if (variables == 'body3') {
                    bodyVariable4 = campaignData?.variables?.body3
                }
                if (variables == 'body4') {
                    bodyVariable5 = campaignData?.variables?.body4
                }
                if (variables == 'body5') {
                    bodyVariable6 = campaignData?.variables?.body5
                }
                if (variables == 'header0') {
                    headerVariable1 = campaignData?.variables?.header0
                }
                if (variables == 'header1') {
                    headerVariable2 = campaignData?.variables?.header1
                }
                if (variables == 'header2') {
                    headerVariable3 = campaignData?.variables?.header2
                }
                if (variables == 'header3') {
                    headerVariable4 = campaignData?.variables?.header3
                }
                if (variables == 'header4') {
                    headerVariable5 = campaignData?.variables?.header4
                }
              
            })
            let bodyVariable1Data
            let bodyVariable2Data
            let bodyVariable3Data
            let bodyVariable4Data
            let bodyVariable5Data
            let bodyVariable6Data
            let headerVariable1Data
            let headerVariable2Data
            let headerVariable3Data
            let headerVariable4Data
            let headerVariable5Data

            if (headerVariable1) {
                headerVariable1Data = {
                    type: 'text',
                    text: headerVariable1
                }
            }

            if (headerVariable2) {
                headerVariable2Data = {
                    type: 'text',
                    text: headerVariable2
                }
            }

            if (headerVariable3) {
                headerVariable3Data = {
                    type: 'text',
                    text: headerVariable3
                }
            }

            if (headerVariable4) {
                headerVariable4Data = {
                    type: 'text',
                    text: headerVariable4
                }
            }

            if (headerVariable5) {
                headerVariable5Data = {
                    type: 'text',
                    text: headerVariable5
                }
            }

            if (bodyVariable1) {
                bodyVariable1Data = {
                    type: 'text',
                    text: bodyVariable1
                }
            }

            if (bodyVariable2) {
                bodyVariable2Data = {
                    type: 'text',
                    text: bodyVariable2
                }
            }

            if (bodyVariable3) {
                bodyVariable3Data = {
                    type: 'text',
                    text: bodyVariable3
                }
            }

            if (bodyVariable4) {
                bodyVariable4Data = {
                    type: 'text',
                    text: bodyVariable4
                }
            }

            if (bodyVariable5) {
                bodyVariable5Data = {
                    type: 'text',
                    text: bodyVariable5
                }
            }

            if (bodyVariable6) {
                bodyVariable6Data = {
                    type: 'text',
                    text: bodyVariable6
                }
            }

            if (headerVariable1Data) {
                headerParameters.push(headerVariable1Data)
            }

            if (headerVariable2Data) {
                headerParameters.push(headerVariable2Data)
            }
            if (headerVariable3Data) {
                headerParameters.push(headerVariable3Data)
            }
            if (headerVariable4Data) {
                headerParameters.push(headerVariable4Data)
            }
            if (headerVariable5Data) {
                headerParameters.push(headerVariable5Data)
            }

            if (bodyVariable1Data) {
                bodyParameters.push(bodyVariable1Data)
            }
            if (bodyVariable2Data) {
                bodyParameters.push(bodyVariable2Data)
            }
            if (bodyVariable3Data) {
                bodyParameters.push(bodyVariable3Data)
            }
            if (bodyVariable4Data) {
                bodyParameters.push(bodyVariable4Data)
            }
            if (bodyVariable5Data) {
                bodyParameters.push(bodyVariable5Data)
            }
            if (bodyVariable6Data) {
                bodyParameters.push(bodyVariable6Data)
            }


        }
        if (headerVariable1) {
                Object.assign(header, { "parameters": headerParameters })
        }
        else {
            Object.assign(header, null)
        }

        if (bodyVariable1) {
            Object.assign(body, { "parameters": bodyParameters })
        }
        else {
            Object.assign({ body: null })
        }
      
        if(headerData?.format === "IMAGE"){
           let headerImageLink = [{
                type: 'image',
                image:{
                    "link":mediaSave?.url
                } 
            }]
            Object.assign(header, { "parameters": headerImageLink })
        }
        if (campaignData !== null) {
            const res =   await  dispatch(sendNewCampaign(campaignData,header,body));
            if(res?.hasError){
                enqueueSnackbar(res?.message, { variant: "error" })
              }
              else{
                enqueueSnackbar("Created", { variant: "success" })  
              }
              showBroadcastSection()
        }

    }
    return <Box >
        <Box display={"flex"} alignItems="center" justifyContent={"center"} minHeight={600}>
            {templateCurrData && <MinimalTemplatePreview fullPreview template={templateCurrData} />}
        </Box>
        <Divider />
        <Grid marginLeft={'auto'}>
            <Box mt={2} display={"flex"} alignItems="center" justifyContent={"right"}>

                <Box mr={1} ><Button style={{ padding: '11px 33px', textTransform: "uppercase" }} outline color="primary" onClick={() => setActiveStep(activeStep - 1)}>Back</Button></Box>
                <Box> <Button style={{ padding: '11px 33px', textTransform: "uppercase" }} color="primary" onClick={() => handleCampaignSubmit()}>Submit</Button></Box>

            </Box>
        </Grid>
    </Box>
}