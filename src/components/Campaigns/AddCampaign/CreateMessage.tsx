import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, Input, Label, Button, FormFeedback } from "reactstrap";
import { Component, WabaTemplate } from "../../../@types/getTemplatesType"
import MinimalTemplatePreview from "./MinimalTemplatePreview";
import * as Yup from 'yup';
import { RootState, useDispatch, useSelector } from "../../../redux-persist/store";
import { getCampaignName } from "../../../redux-persist/slices/campaignData";
import { getFromNumber } from "../../../redux-persist/slices/fromNumber";
import { getAllTemplates } from "../../../redux-persist/slices/getAllTemplates";
import { mediaFileSave } from "../../../redux-persist/slices/mediaSave";

type CreateMessageProps = {
    templateData: WabaTemplate | undefined;
    templateCurrData: WabaTemplate | undefined;
    setTemplateCurrData: (template: WabaTemplate) => void;
    headerVariableValues: { [variableCount: number]: any };
    setHeaderVariableValues: any;
    bodyVariableValues: { [variableCount: number]: any };
    setBodyVariableValues: any;
    setActiveStep: (num: number) => void;
    activeStep: number;
}

export const CreateMessage = ({ templateData, templateCurrData, setTemplateCurrData, setHeaderVariableValues, setBodyVariableValues, headerVariableValues, bodyVariableValues, activeStep, setActiveStep }: CreateMessageProps) => {
    // const [templateCurrData, setTemplateCurrData] = useState(templateData);
    const headerVariableCount = templateData?.components.find((component) => component.type === "HEADER")?.text?.match(/{{[0-9]+}}/g)?.length || 0;
    const bodyVariableCount = templateData?.components.find((component) => component.type === "BODY")?.text?.match(/{{[0-9]+}}/g)?.length || 0;
    const headerData = templateCurrData?.components.find(({ type }: Component) => type === "HEADER");
  
    
    const dispatch = useDispatch();
    const { campaignData } = useSelector(
        (state: RootState) => state.campaignData
    );

    const { getTemplates } = useSelector(
        (state: RootState) => state.getTemplates
    );
   
    const { fromNumber } = useSelector(
        (state: RootState) => state.fromNumber
    );


    //TODO
    // useEffect(() => {
    //     //dispatch(getAllTemplates());
    //         if(campaignData.whatsAppBusinessId){
    //             dispatch(getFromNumber(campaignData.whatsAppBusinessId));
    //         }

    // }, [dispatch]);
    
    console.log(fromNumber);
    console.log(campaignData);

    const handleHeaderVariables = (evt, num) => {
        formik.handleChange(evt)
        const currVal = evt.target.value;
        setHeaderVariableValues({ ...headerVariableValues, [num]: currVal });
        const targetVariable = num;
        const regex = new RegExp(`{{[${targetVariable}]}}`)
        let modifiedText = templateData?.components.find((component) => component.type === "HEADER")?.text?.replace(regex, currVal)

        Object.keys(headerVariableValues).forEach((keyVal: any) => {
            if (keyVal !== targetVariable) {
                const regex = new RegExp(`{{[${keyVal}]}}`)
                modifiedText = modifiedText?.replace(regex, headerVariableValues[keyVal])
            }
        })

        const result = {
            ...templateCurrData, components: templateCurrData?.components.map((component) => {
                if (component.type === "HEADER") {
                    return { ...component, text: modifiedText }
                }
                return component
            })
        }
        setTemplateCurrData(result);
    };
    const handleBodyVariables = (evt, num) => {
        formik.handleChange(evt)
        const currVal = evt.target.value;
        setBodyVariableValues({ ...bodyVariableValues, [num]: currVal });
        const targetVariable = num;
        const regex = new RegExp(`{{[${targetVariable}]}}`)
        let modifiedText = templateData?.components.find((component) => component.type === "BODY")?.text?.replace(regex, currVal)

        Object.keys(bodyVariableValues).forEach((keyVal: any) => {
            if (keyVal !== targetVariable) {
                const regex = new RegExp(`{{[${keyVal}]}}`)
                modifiedText = modifiedText?.replace(regex, bodyVariableValues[keyVal])
            }
        })

        const result = {
            ...templateCurrData, components: templateCurrData?.components.map((component) => {
                if (component.type === "BODY") {
                    return { ...component, text: modifiedText }
                }
                return component
            })
        }
        setTemplateCurrData(result);
    }


    const res = [headerVariableCount, bodyVariableCount].map((count, index) => Array(count).fill("").map((item, idx) => index === 0 ? { ['header' + idx]: "" } : { ['body' + idx]: "" })).flat().reduce((item, accumulator) => ({ ...item, ...accumulator }), {})
    console.log(res)

    const resValid = [headerVariableCount, bodyVariableCount].map((count, index) => Array(count).fill("").map((item, idx) => index === 0 ? { ['header' + idx]: Yup.string().required('Required') } : { ['body' + idx]: Yup.string().required('Required') })).flat().reduce((item, accumulator) => ({ ...item, ...accumulator }), {})
    const formik = useFormik({
        initialValues: {
            ...res
        },
        validationSchema: Yup.object({
            ...resValid
        }),
        onSubmit: async (formValues) => {
            let values={"campaignName":campaignData.campaignName,"scheduleTime": campaignData.scheduleTime,"templateName" : campaignData.templateName,"language":campaignData.language,"toContacts" :campaignData.toContacts,
        "from": "","whatsAppBusinessId":campaignData.whatsAppBusinessId,"phoneNumberId":"","variables" :formValues
        }
        dispatch(getCampaignName(values)); 
        setActiveStep(activeStep + 1)
        }
    });

    const submitVariableForm = () => {
        formik.handleSubmit()
    }

    useEffect(() => {
    if (headerData?.format === "IMAGE") {
        let publicUrl = headerData?.example?.header_handle[0];
        let whatsAppBusinessId = campaignData.whatsAppBusinessId;
        let fileName = templateCurrData?.name;
        dispatch(mediaFileSave(whatsAppBusinessId, fileName, publicUrl));
    }
}, [campaignData.whatsAppBusinessId]);
         
     
    return <>
        <Grid mt={5} container minHeight={550}>
            <Grid lg={9} xs={12} item>

                <Form onSubmit={formik.handleSubmit}>
                    {templateCurrData?.components.map(template =>
                        <div>
                            {template.type == 'HEADER' &&
                                <div className="mb-4">
                                    <Label className="form-label" htmlFor="addcontactemail-input">Header</Label>
                                    <Input disabled type="text" contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" id="addcontactemail-input" value={template.text} />

                                    {new Array(headerVariableCount).fill('x').map((row, key) =>
                                        <div className="mb-4 pt-20">
                                            <Label className="form-label" >Variable {key + 1}</Label>
                                            <Input value={headerVariableValues[key + 1]} type="text" name={"header" + key} className="form-control" id={key.toString()} onChange={(e) => handleHeaderVariables(e, (key + 1))}
                                                invalid={formik.touched['header' + key] && formik.errors['header' + key] ? true : false}
                                            />
                                            {formik.touched['header' + key] && formik.errors['header' + key] ? (
                                                <FormFeedback type="invalid">{formik.errors['header' + key]}</FormFeedback>
                                            ) : null}
                                        </div>
                                    )}
                                </div>}
                            {template.type == 'BODY' &&
                                <div className="mb-4">
                                    <Label className="form-label" htmlFor="addcontact-invitemessage-input">Body</Label>
                                    <textarea disabled contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" id="addcontact-invitemessage-input" value={template.text} rows={10}></textarea>
                                    {new Array(bodyVariableCount).fill('x').map((row, key) =>
                                        <div key={key} className="mb-4 pt-20">
                                            <Label className="form-label" >Variable {key + 1}</Label>
                                            <Input value={bodyVariableValues[key + 1]} type="text" name={"body" + key} className="form-control" id={key.toString()} onChange={(e) => handleBodyVariables(e, (key + 1))}
                                                invalid={formik.touched['body' + key] && formik.errors['body' + key] ? true : false}
                                            />
                                            {formik.touched['body' + key] && formik.errors['body' + key] ? (
                                                <FormFeedback type="invalid">{formik.errors['body' + key]}</FormFeedback>
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            }


                            {template.type == 'FOOTER' &&
                                <div className="mb-4">
                                    <Label className="form-label" htmlFor="addcontact-invitemessage-input">Footer</Label>
                                    <Input disabled type="text" contentEditable={false} style={{ background: '#f3f1f1bf' }} className="form-control" id="addcontactemail-input" value={template.text} />
                                </div>}


                        </div>

                    )}
                </Form>
            </Grid>
            <Grid lg={3} xs={12} item >
                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection="column">
                    <Typography mt={1}>
                        Preview
                    </Typography>
                    <Box>
                        {templateCurrData && <MinimalTemplatePreview template={templateCurrData} />}    </Box>       </Box>
            </Grid>

        </Grid>
        <Divider />
        <Grid marginLeft={'auto'}>
            <Box mt={2} display={"flex"} alignItems="center" justifyContent={"right"}>

                <Box mr={1} ><Button style={{ padding: '11px 33px', textTransform: "uppercase" }} outline color="primary" onClick={() => setActiveStep(activeStep - 1)}>Back</Button></Box>
                <Box> <Button style={{ padding: '11px 33px', textTransform: "uppercase" }} color="primary" type="submit" onClick={submitVariableForm}>Next</Button></Box>

            </Box>
        </Grid>
    </>
}