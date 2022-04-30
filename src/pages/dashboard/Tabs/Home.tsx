import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Label, InputGroup, Input, Table, Button, UncontrolledTooltip } from "reactstrap";

//Import components
import CustomCollapse from "../../../components/CustomCollapse";
import AttachedFiles from "../../../components/AttachedFiles";

//Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//i18n
import { useTranslation } from 'react-i18next';
import home from "../../../assets/images/home.svg"
import Chart from 'react-apexcharts'
import ReactApexChart from 'react-apexcharts';
import { RootState, useDispatch, useSelector } from '../../../redux-persist/store';
import { getAccountStats } from '../../../redux-persist/slices/accountStats';
import no_messages from "../../../assets/images/no_messages.svg"

function Home(props: any) {

    const dispatch = useDispatch();
    const { accountStats } = useSelector((state: RootState) => state.accountStats);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    let today = new Date().toISOString().slice(0, 10);
    let previousDate = (new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
    const messageHistory = accountStats?.messageHistory?.map(message => { return message?.reportDate })

    const queued = accountStats?.messageHistory?.map(element => { return element?.queued; }
    );

    const accepted = accountStats?.messageHistory?.map(element => { return element?.accepted; }
    );

    const delivered = accountStats?.messageHistory?.map(element => { return element?.delivered; }
    );

    const read = accountStats?.messageHistory?.map(element => { return element?.read; }
    );

    const replied = accountStats?.messageHistory?.map(element => { return element?.replied; }
    );

    const failed = accountStats?.messageHistory?.map(element => { return element?.failed; }
    );


    useEffect(() => {
        dispatch(getAccountStats(previousDate, today));
        setFrom(previousDate);
        setTo(today)
    }, [dispatch]);


    const handleFrom = (e: any) => {
        setFrom(e.target.value)
        if (to && to >= e.target.value) {
            dispatch(getAccountStats(e.target.value, to));
        }
    };

    const handleTo = (e: any) => {
        setTo(e.target.value)
        if (from && e.target.value >= from) {
            dispatch(getAccountStats(from, e.target.value));
        }
    };

    const refreshStats =()=>{
        dispatch(getAccountStats(from, to));
    }
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    const pieChartSeries = [accountStats?.messages?.queued, accountStats?.messages?.accepted, accountStats?.messages?.delivered, accountStats?.messages?.read, accountStats?.messages?.replied, accountStats?.messages?.failed]
    const pieChartoptions = {
        legend: { position: 'bottom' },
        dataLabels: {
            enabled: false,

        },
        chart: {
            width: 400,
            type: 'pie',
        },
        labels: ['Queued', 'Accepted', 'Delivered', 'Read', 'Replied', 'Failed'],
    }

    const areaChartSeries = [{
        name: 'Queued',
        data: queued
    }, {
        name: 'Accepted',
        data: accepted
    }
        , {
        name: 'Delivered',
        data: delivered
    }
        , {
        name: 'Read',
        data: read
    }
        , {
        name: 'Replied',
        data: replied
    }
        , {
        name: 'Failed',
        data: failed
    }]
    const areaChartSoptions = {
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'date',
            categories: messageHistory
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            },
        },
    }

    return (
        <React.Fragment >
            <div >
                <div className="p-4">
                    <div className="user-chat-nav float-end">
                        <div id="logout">
                            {/* Button trigger addContactModal */}
                            <Button
                                type="button"
                                color="link"
                                href="/logout"
                                //onClick={toggleAddFileModalModal}
                                className="text-decoration-none text-muted font-size-18 py-0"
                            >
                                <i className="ri-shut-down-line"></i>
                            </Button>
                        </div>
                        <UncontrolledTooltip target="logout" placement="bottom">
                            Log out
                        </UncontrolledTooltip>
                    </div>
                    <h4 className="mb-4">{t('Dashboard')}</h4>
                    <div className='p-4'>
                        <div className='row mb-4'>
                            <div className='col-lg-2'>
                                <h6 className="mb-4 ">{t('From')}</h6>
                                <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                    <Input
                                        type="date"
                                        id="from"
                                        name="from"
                                        value={from}
                                        onChange={handleFrom}
                                        className="form-control form-control-lg bg-soft-light border-light"
                                        placeholder="From date"
                                        max={today}

                                    />

                                </InputGroup>
                            </div>
                            <div className='col-lg-2'>
                                <h6 className="mb-4 ">{t('To')}</h6>
                                <InputGroup className="input-group bg-soft-light rounded-3 mb-3">
                                    <Input
                                        type="date"
                                        id="to"
                                        name="to"
                                        onChange={handleTo}
                                        className="form-control form-control-lg bg-soft-light border-light"
                                        placeholder="To date"
                                        max={today}
                                        min={from}
                                        value={to}
                                    />

                                </InputGroup>
                            </div>
                            <div className="col-lg-2 mb-4">
                            <h6 className="mb-4 ">&nbsp;</h6>
                                <Button color="light"onClick={refreshStats} block className="waves-effect waves-light"><i className="ri-refresh-line"></i></Button>
                            </div> 
                        </div>
                        <div className='row'>
                            <h6 className="mb-4 ">{t('Campaigns')}</h6>
                            {/* <div className="col-lg-2 mb-4 ">
                                <div className="card dashboard-card-style">
                                    <div className="card-body">
                                        <h6 className="card-title card-grey-title">Total</h6>
                                        <h3 className="card-text number-right">235</h3>
                                    </div>
                                </div>
                            </div> */}
                        
                        
                        <div className="col-lg-3 mb-4 ">
                                <div className="card dashboard-card-style">
                                    <div className="card-body">
                                        <h6 className="card-title card-grey-title">Created</h6>
                                        <h3 className="card-text number-right">{accountStats?.campaigns?.created}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="col-lg-2 mb-4 ">
                                <div className="card dashboard-card-style">
                                    <div className="card-body">
                                        <h6 className="card-title card-grey-title">Queued</h6>
                                        <h3 className="card-text number-right">{accountStats?.campaigns?.queued}</h3>
                                    </div>
                                </div>
                            </div> */}

                            <div className="col-lg-3 mb-4 ">
                                <div className="card dashboard-card-style">
                                    <div className="card-body">
                                        <h6 className="card-title card-grey-title">In Progress</h6>
                                        <h3 className="card-text number-right">{accountStats?.campaigns?.inProgress}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 mb-4 ">
                                <div className="card dashboard-card-style">
                                    <div className="card-body">
                                        <h6 className="card-title card-grey-title">Completed</h6>
                                        <h3 className="card-text number-right">{accountStats?.campaigns?.completed}</h3>
                                    </div>
                                </div>
                            </div>
                  
                            <div className="col-lg-3 mb-4 ">
                                <div className="card dashboard-card-style">
                                    <div className="card-body">
                                        <h6 className="card-title card-grey-title">Cancelled</h6>
                                        <h3 className="card-text number-right">{accountStats?.campaigns?.cancelled}</h3>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='row'>
                            <h6 className="mb-4 ">{t('Messages')}</h6>

                            <div className='col-lg-4'>
                                <div className='Card dashboard-card-style dashboard-card-style-graph'>
                                    <div className="card-body">
                                        {accountStats?.messages?.queued == 0 && accountStats?.messages?.accepted == 0 && accountStats?.messages?.delivered == 0 && accountStats?.messages?.read == 0 && accountStats?.messages?.replied == 0 && accountStats?.messages?.failed == 0 ?
                                            <div className='row'>

                                                <div className=' center pt-30'>
                                                    <img src={no_messages} alt="" className="no-message-style" />
                                                </div>
                                                <div className='center pt-30'>
                                                    <h5>No messages sent yet</h5>
                                                </div>
                                            </div>

                                            :
                                            <>
                                                <div style={{ verticalAlign: 'middle' }}>
                                                    <ReactApexChart options={pieChartoptions} series={pieChartSeries} type="pie" />
                                                </div><div className='pt-20'>
                                                    <Table responsive striped={false} borderless>
                                                        <tbody>
                                                            <tr>
                                                                <td>Queued</td>
                                                                <td className='table-cell-align-right'>{accountStats?.messages?.queued}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Accepted</td>
                                                                <td className='table-cell-align-right'>{accountStats?.messages?.accepted}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Delivered</td>
                                                                <td className='table-cell-align-right'>{accountStats?.messages?.delivered}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Read</td>
                                                                <td className='table-cell-align-right'>{accountStats?.messages?.read}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Replied</td>
                                                                <td className='table-cell-align-right'>{accountStats?.messages?.replied}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Failed</td>
                                                                <td className='table-cell-align-right'>{accountStats?.messages?.failed}</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </div></>}
                                    </div>
                                </div>

                            </div>

                            <div className='col-lg-8'>
                                <div className='Card dashboard-card-style dashboard-card-style-graph' >
                                    <div className="card-body">
                                        <ReactApexChart options={areaChartSoptions} series={areaChartSeries} type="area" height={418} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </React.Fragment >
    );
}

export default Home;