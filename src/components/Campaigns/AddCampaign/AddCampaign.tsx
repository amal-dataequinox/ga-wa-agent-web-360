
import { Step, Stepper, StepLabel, Box, useMediaQuery , Grid} from "@material-ui/core";
import { useState } from "react";
import { GetTemplatesType, WabaTemplate } from "../../../@types/getTemplatesType";
import {AddContacts,CampaignInfo,SelectTemplate,CreateMessage,PreviewPage} from "./"



const labels = ['Enter Campaign Information', 'Select Template', 'Choose Audience',  'Create Message', 'Preview page']
type AddCampaignProps = {
    templates: GetTemplatesType,
    showBroadcastSection : () => void;
}
export const AddCampaign = (props: AddCampaignProps) => {
    const { templates,showBroadcastSection } = props;
    const isMobile = useMediaQuery('(max-width:600px)');
    const [templateData, setTemplateData] = useState<WabaTemplate>();
    const [templateCurrData, setTemplateCurrData] = useState<WabaTemplate>();
    const [activeStep, setActiveStep] = useState(0);
    const [headerVariableValues, setHeaderVariableValues] = useState<any>({});
    const [bodyVariableValues, setBodyVariableValues] = useState<any>({});
    const stepperContent = (step: number) => {
        switch (step) {
            case 0: return <CampaignInfo activeStep={activeStep}setActiveStep={setActiveStep} />
            case 1: return  <SelectTemplate activeStep={activeStep} setActiveStep={setActiveStep} templates={templates} setTemplateData={setTemplateData} templateData={templateData} setTemplateCurrData={setTemplateCurrData} />
            case 2: return  <AddContacts activeStep={activeStep} setActiveStep={setActiveStep}/>
            case 3: return <CreateMessage   activeStep={activeStep}setActiveStep={setActiveStep} templateData={templateData} templateCurrData={templateCurrData} setTemplateCurrData={setTemplateCurrData} headerVariableValues={headerVariableValues} setHeaderVariableValues={setHeaderVariableValues}
                bodyVariableValues={bodyVariableValues} setBodyVariableValues={setBodyVariableValues} />
            case 4: return <PreviewPage  activeStep={activeStep} setActiveStep={setActiveStep} templateCurrData={templateCurrData} showBroadcastSection={showBroadcastSection}/>
            default: return <>No Content</>
        }
    }


    return <>
        <Stepper sx={{
            '& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.MuiStepIcon-completed': {
                color: "#6abb44"
            }, '& .MuiStepIcon-root': {
                borderColor: '#6abb44'
            },
            '& .MuiStepIcon-root.Mui-active .MuiStepIcon-text': {
                color: "#000"
            }
        }} activeStep={activeStep}>
            {labels.map((label, index) => (
                <Step key={label}>
                    <StepLabel>{isMobile && index !== activeStep ? "" : label}</StepLabel>
                </Step>
            ))}
        </Stepper>

        <Box >
            {stepperContent(activeStep)}
        </Box>
    </>
}