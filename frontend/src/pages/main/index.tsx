import './index.css';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import moment from 'moment';
import { IUser } from '../../model/user.model';
import Profile from '../profile';

const { TabPane } = Tabs;




const Main = () => {
    const [rowData, setRowData] = useState();

    useEffect(() => {
        axios.get('http://127.0.0.1:3007/api/user')
            .then(result => result.data.map((item: IUser, index: number) => ({ ...item, index: index + 1 })))
            .then(data => setRowData(data))
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        { headerName: '#', field: 'index' },
        { field: 'firstname', filter: true },
        { field: 'lastname', filter: true },
        { field: 'gender' },
        {
            headerName: 'Date of Birth', field: 'birthdate', valueFormatter: (data: any) => {
                return moment(data.value).format('MM/DD/YYYY');

            }
        }
    ]);

    const tabChange = (activeKey: string) => {}

    return (
        <div className="layout-container">
            <Layout>
            <Tabs defaultActiveKey="1" onChange={tabChange} size="large" className="layout-tab">
                <TabPane tab="Users" key="1">
                <div className="ag-theme-alpine" style={{ height: 400, width: 800, maxWidth: 1200 }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        animateRows={true}
                    >
                    </AgGridReact>
                </div>
                </TabPane>
                <TabPane tab="Profile" key="2">
                    <Profile/>
                </TabPane>
                <TabPane tab="Album" key="3">
                Album
                </TabPane>
            </Tabs>
            </Layout>
        </div>
    )
}


export default Main;