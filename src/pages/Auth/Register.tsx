import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, CardBody, FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import action
import { registerUser, apiError } from '../../redux/actions';

//i18n
import { useTranslation } from 'react-i18next';

//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import useAuth from './useAuth';
import useIsMountedRef from './useIsMountedRef';
import { useSnackbar } from "notistack";
import {useHistory} from 'react-router';
import { useState } from 'react';
import parsePhoneNumber from 'libphonenumber-js';
import {CountryCode} from "libphonenumber-js/types";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

/**
 * Register component
 * @param {*} props 
 */
const Register = (props: any) => {

    const clearError = () => {
        props.apiError("");
    }
    const { register } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

    // const isMountedRef = useIsMountedRef();
	// const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    useEffect(clearError);

    // validation
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            email: '',
            contactNumber: '',
            accountName: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name Required'),
            lastName: Yup.string().required('Last name Required'),
            userName: Yup.string().required('Username Required'),
            accountName: Yup.string().required('Account name is required'),
            email: Yup.string().email('Enter proper email').required('Email is Required'),
            contactNumber: Yup.string().required('Mobile number Required'),
            password: Yup.string()
                .required('Password Required')
        }),
        onSubmit: async (values, { setErrors, setSubmitting }) => {
			try {
				await register(
					values.firstName,
					values.lastName,
					values.userName,
					values.password,
					values.email,
					values.contactNumber,
					values.accountName,
				);
                history.push('/login')
			} catch (error) {
                enqueueSnackbar(error?.message, { variant: "error" })
			}
		},
    });

    const [phoneValue, setPhone] = React.useState('');
    const [countryCode,setCountryCode ] = React.useState('in');
    const handlePhone = (phoneNumber :string, data :any, event:any, formatedText:string) => {
        const {countryCode} = data;
        setPhone(phoneNumber);
        setCountryCode(countryCode)
        formik.values.contactNumber = '+'+phoneNumber 
      }
    const phoneNumber = parsePhoneNumber(`+${phoneValue}`, countryCode.toUpperCase() as CountryCode)
    const isPhoneNumberValid = phoneNumber?.isValid();


    return (
        <React.Fragment>

            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <div className="text-center mb-4">
                                <Link to="/" className="auth-logo mb-5 d-block">
                                    <img src={logodark} alt="" height="30" className="logo logo-dark" />
                                    <img src={logolight} alt="" height="30" className="logo logo-light" />
                                </Link>

                                <h4>{t('Sign up')}</h4>
                                <p className="text-muted mb-4">{t('Get your Telinfy account now')}.</p>

                            </div>

                            <Card>
                                <CardBody className="p-4">
                                    {
                                        props.error && <Alert variant="danger">{props.error}</Alert>
                                    }
                                    {
                                        props.user && <Alert variant="success">Thank You for registering with us!</Alert>
                                    }
                                    <div className="p-3">

                                        <Form onSubmit={formik.handleSubmit}>

                                            <div className="mb-3">
                                                <Label className="form-label">{t('First name')}</Label>
                                                <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                    <span className="input-group-text text-muted">
                                                        <i className="ri-user-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="firstName"
                                                        name="firstName"
                                                        className="form-control form-control-lg bg-soft-light border-light"
                                                        placeholder="Enter your First name"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.firstName}
                                                        invalid={formik.touched.firstName && formik.errors.firstName ? true : false}
                                                    />
                                                    {formik.touched.firstName && formik.errors.firstName ? (
                                                        <FormFeedback type="invalid">{formik.errors.firstName}</FormFeedback>
                                                    ) : null}
                                                </InputGroup>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">{t('Last name')}</Label>
                                                <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                    <span className="input-group-text text-muted">
                                                        <i className="ri-user-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="lastName"
                                                        name="lastName"
                                                        className="form-control form-control-lg bg-soft-light border-light"
                                                        placeholder="Enter your Last name"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.lastName}
                                                        invalid={formik.touched.lastName && formik.errors.lastName ? true : false}
                                                    />
                                                    {formik.touched.lastName && formik.errors.lastName ? (
                                                        <FormFeedback type="invalid">{formik.errors.lastName}</FormFeedback>
                                                    ) : null}
                                                </InputGroup>
                                            </div>
                                            <div className="mb-3">
                                                <Label className="form-label">{t('Account name')}</Label>
                                                <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                    <span className="input-group-text text-muted">
                                                        <i className="ri-user-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="accountName"
                                                        name="accountName"
                                                        className="form-control form-control-lg bg-soft-light border-light"
                                                        placeholder="Enter account name"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.accountName}
                                                        invalid={formik.touched.accountName && formik.errors.accountName ? true : false}
                                                    />
                                                    {formik.touched.accountName && formik.errors.accountName ? (
                                                        <FormFeedback type="invalid">{formik.errors.accountName}</FormFeedback>
                                                    ) : null}
                                                </InputGroup>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">{t('Username')}</Label>
                                                <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                    <span className="input-group-text border-light text-muted">
                                                        <i className="ri-user-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="userName"
                                                        name="userName"
                                                        className="form-control form-control-lg bg-soft-light border-light"
                                                        placeholder="Enter Username"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.userName}
                                                        invalid={formik.touched.userName && formik.errors.userName ? true : false}
                                                    />
                                                    {formik.touched.userName && formik.errors.userName ? (
                                                        <FormFeedback type="invalid">{formik.errors.userName}</FormFeedback>
                                                    ) : null}
                                                </InputGroup>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">{t('Email')}</Label>
                                                <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                                    <span className="input-group-text text-muted">
                                                        <i className="ri-mail-line"></i>
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        className="form-control form-control-lg bg-soft-light border-light"
                                                        placeholder="Enter Email"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.email}
                                                        invalid={formik.touched.email && formik.errors.email ? true : false}
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                                                    ) : null}
                                                </InputGroup>
                                            </div>



                                 

                                            <div className="mb-3">
                                                <Label className="form-label">{t('Mobile number')}</Label>
                                                    <PhoneInput inputStyle={{
                                                    width : `100%`,
                                                    padding: `0.5rem 3rem`,
                                                    borderColor : `#e6ebf5`,
                                                    backgroundColor : `rgba(230, 235, 245, 0.25)`
                                                }}
                                                dropdownStyle={{
                                                    width : 274
                                                }}
                                                    specialLabel=''
                                                    placeholder=''
                                                    inputProps={{
                                                    name: "contactNumber",
                                                    required: true,                            
                                                    }}     
                                                    country={'in'}
                                                    value={phoneValue}
                                                    onChange={handlePhone }
                                                    isValid={Boolean(!(formik.touched.contactNumber && !isPhoneNumberValid ))}         
                                                 />
                                                    {formik.touched.contactNumber && formik.errors.contactNumber ? (
                                                        <FormFeedback type="invalid">{formik.errors.contactNumber}</FormFeedback>
                                                    ) : null}
                                              
                                            </div>


                                            <div className="mb-4">
                                                <Label className="form-label">{t('Password')}</Label>
                                                <InputGroup className="mb-3 bg-soft-light input-group-lg rounded-lg">
                                                    <span className="input-group-text border-light text-muted">
                                                        <i className="ri-lock-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control form-control-lg bg-soft-light border-light"
                                                        placeholder="Enter Password"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.password}
                                                        invalid={formik.touched.password && formik.errors.password ? true : false}
                                                    />
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                                    ) : null}

                                                </InputGroup>
                                            </div>

                                            <div className="d-grid">
                                                <Button color="primary" block className=" waves-effect waves-light" type="submit">Sign up</Button>
                                            </div>

                                            <div className="mt-4 text-center">
                                                <p className="text-muted mb-0">{t('By registering you agree to the')} <Link to="#" className="text-primary">{t('Terms of Use')}</Link></p>
                                            </div>

                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                            <div className="mt-5 text-center">
                                <p>{t('Already have an account')} ? <Link to="/login" className="font-weight-medium text-primary"> {t('Signin')} </Link> </p>
                                <p>© {t('2021 GreenAds Global')}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state: any) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default withRouter(connect(mapStateToProps, { registerUser, apiError })(Register));