import React, { useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//i18n
import { useTranslation } from 'react-i18next';

//redux store
import { loginUser, apiError } from '../../redux/actions';
import useAuth from './useAuth';
import useIsMountRef from './useIsMountedRef';
//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import useIsMountedRef from './useIsMountedRef';

/**
 * Login component
 * @param {*} props 
 */
type InitialValues = {
    userName: string;
    password: string;
    remember: boolean;
    afterSubmit?: string;
};

const Login = (props: any) => {
    const { login } = useAuth();

    const isMountedRef = useIsMountedRef();

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    const clearError = () => {
        props.apiError("");
    }

    useEffect(clearError);

    // validation
    const LoginSchema = Yup.object().shape({
        userName: Yup.string().required('Please Enter Your Username'),
        password: Yup.string().required('Please Enter Your Password'),
    });

    const formik = useFormik<InitialValues>({
        initialValues: {
            userName: "",
            password: "",
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            try {
                await login(values.userName, values.password);

                if (isMountedRef.current) {
                    setSubmitting(false);
                }
            } catch (error) {
                console.error(error);
                resetForm();
                if (isMountedRef.current) {
                    setSubmitting(false);
                    setErrors({ afterSubmit: error.message });
                }
            }
        },
    });

    if (localStorage.getItem("authUser")) {
        return <Redirect to="/" />;
    }

    const {
		errors,
		touched,
		values,
		isSubmitting,
		handleSubmit,
		getFieldProps,
	} = formik;
    return (
        <React.Fragment>

            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} >
                            <div className="text-center mb-4">
                                <Link to="/" className="auth-logo mb-5 d-block">
                                    <img src={logodark} alt="" height="30" className="logo logo-dark" />
                                    <img src={logolight} alt="" height="30" className="logo logo-light" />
                                </Link>

                                <h4>{t('Sign in')}</h4>
                                <p className="text-muted mb-4">{t('Sign in to continue to Telinfy')}.</p>

                            </div>

                            <Card>
                                <CardBody className="p-4">
                                    {/* {
                                        errors.afterSubmit && <Alert color="danger">{errors.afterSubmit}</Alert>
                                    } */}
                                    <div className="p-3">

                                        <Form onSubmit={formik.handleSubmit}>
                                        {errors.afterSubmit && (
								<Alert color="danger" severity="error">{errors.afterSubmit}</Alert>
							)}
                                            <div className="mb-3">
                                                <Label className="form-label">{t('Username')}</Label>
                                                <InputGroup className="mb-3 bg-soft-light rounded-3">
                                                    <span className="input-group-text text-muted" id="basic-addon3">
                                                        <i className="ri-user-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="userName"
                                                        name="userName"
                                                        className="form-control form-control-lg border-light bg-soft-light"
                                                        placeholder="Enter userName"
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

                                            <FormGroup className="mb-4">
                                                <div className="float-end">
                                                    <Link to="forget-password" className="text-muted font-size-13">{t('Forgot password')}?</Link>
                                                </div>
                                                <Label className="form-label">{t('Password')}</Label>
                                                <InputGroup className="mb-3 bg-soft-light rounded-3">
                                                    <span className="input-group-text text-muted">
                                                        <i className="ri-lock-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control form-control-lg border-light bg-soft-light"
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
                                            </FormGroup>

                                            <div className="form-check mb-4">
                                                <Input type="checkbox" className="form-check-input" id="remember-check" />
                                                <Label className="form-check-label" htmlFor="remember-check">{t('Remember me')}</Label>
                                            </div>

                                            <div className="d-grid">
                                                <Button color="primary" block className=" waves-effect waves-light" type="submit">{t('Sign in')}</Button>
                                            </div>

                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                            <div className="mt-5 text-center">
                                <p>{t("Don't have an account")} ? <Link to="register" className="font-weight-medium text-primary"> {t('Signup now')} </Link> </p>
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

export default withRouter(connect(mapStateToProps, { loginUser, apiError })(Login));