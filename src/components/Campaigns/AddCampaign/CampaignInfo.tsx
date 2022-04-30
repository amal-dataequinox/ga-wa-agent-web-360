import { Box, Grid , Card } from "@material-ui/core";
import { Form, InputGroup, Input, Label, FormFeedback, Button } from "reactstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import campaignImage from "../../../assets/images/campaign.svg"
import { RootState, useDispatch, useSelector } from "../../../redux-persist/store";
import { getCampaignName } from "../../../redux-persist/slices/campaignData";

type CampaignInfoProps = {
    setActiveStep: (num: number) => void;
    activeStep : number;
}

export const CampaignInfo =  ({ setActiveStep,activeStep }: CampaignInfoProps) => {

    const dispatch = useDispatch();
    //API data for getting customer
    const { campaignData } = useSelector(
        (state: RootState) => state.campaignData
    );
    
    const formik = useFormik({
        initialValues: {
            campaignName: '',
            scheduleTime: '',
        },
        validationSchema: Yup.object({
            campaignName: Yup.string().required('Campaign name Required'),
            scheduleTime: Yup.string().required('Schedule time is Required'),
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
       let   UTCTime=  new Date(values.scheduleTime).toISOString();
       values.scheduleTime=UTCTime;
            dispatch(getCampaignName(values)); 
            setActiveStep(1);
        },
    });
    return (
        <Grid item  lg={4} margin={'auto'}>
            <Card sx={{mt:10, p: 4}}>
            <Box>
                <Form onSubmit={formik.handleSubmit}>
                 <Box textAlign={"center"} mb={2}>
                    <img src={campaignImage} alt="campaign-image"/>
                 </Box>
                    <div className="mb-3">
                        <Label className="form-label">{'Campaign Name'}</Label>
                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                            <span className="input-group-text text-muted">
                                <i className="ri-chat-settings-line"></i>
                            </span>
                            <Input
                                type="text"
                                id="campaignName"
                                name="campaignName"
                                className="form-control form-control-lg bg-soft-light border-light"
                                placeholder="Enter campaign name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.campaignName}
                                invalid={formik.touched.campaignName && formik.errors.campaignName ? true : false}
                            />
                            {formik.touched.campaignName && formik.errors.campaignName ? (
                                <FormFeedback type="invalid">{formik.errors.campaignName}</FormFeedback>
                            ) : null}
                        </InputGroup>
                    </div>

                    <div className="mb-3">
                        <Label htmlFor="scheduleTime" className="form-label">{'Schedule Time'}</Label>
                        <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                            <span className="input-group-text text-muted">
                                <i className="ri-calendar-line"></i>
                            </span>
                            <Input
                                type="datetime-local"
                                id="scheduleTime"
                                name="scheduleTime"
                                className="form-control form-control-lg bg-soft-light border-light"
                                placeholder="Enter your Last name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.scheduleTime}
                                invalid={formik.touched.scheduleTime && formik.errors.scheduleTime ? true : false}
                            />
                            {formik.touched.scheduleTime && formik.errors.scheduleTime ? (
                                <FormFeedback type="invalid">{formik.errors.scheduleTime}</FormFeedback>
                            ) : null}
                        </InputGroup>
                    </div>
                    <div className="d-grid">
                        <Button style={{padding: '11px 33px', textTransform : "uppercase"}}  color="primary" block className=" waves-effect waves-light" type="submit">Next</Button>
                    </div>


                </Form>
            </Box>
            </Card>
        </Grid>
    )
}