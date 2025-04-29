import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import axios from 'axios';

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])
  const navigate = useNavigate()
  const [user,setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [registrations, setRegistrations] = useState([]);



  function RegisterClick(){
    navigate('/registed-users')
  }
  function OrderClick(){
    navigate('/order-list')
  }

  function BreakFast(){
    navigate('/event-beakfastlist')
  }

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/breakfast/view-registration`);
        setRegistrations(response.data.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/users`);
        console.log("response", response);
        setUsers(response?.data?.data);
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        setLoading(false);
    }
    };

    fetchUsers();
}, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/get-all-orders`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setOrders(response?.data?.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);


  return (
    <CRow className={props.className}  xs={{ gutter: 4 }}>
  <CCol sm={6} xl={4} xxl={3}>
  <div onClick={RegisterClick} style={{ cursor: "pointer" }}>
    <CWidgetStatsA
      style={{ padding: "40px 0px" }}
      color="primary"
      value={<>{user.length}{' '}</>}
      title="Registered Users"
    />
  </div>
</CCol>

      <CCol sm={6} xl={4} xxl={3}>
      <div onClick={OrderClick} style={{ cursor: "pointer" }}>
        <CWidgetStatsA
        style={{ padding: "40px 0px" }}
          color="info"
          value={
            <>
              {orders.length}{' '}

            </>
          }
          title="Total Orders"
  
        />
        </div>
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
      <div onClick={BreakFast} style={{ cursor: "pointer" }}>
        <CWidgetStatsA
          color="warning"
          style={{ padding: "40px 0px" }}
          value={
            <>
              {registrations.length}{' '}
      
            </>
          }
          title="Break Fast With Legends"
        />
        </div>
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
      <div onClick={OrderClick} style={{ cursor: "pointer" }}>
        <CWidgetStatsA
          color="danger"
          style={{ padding: "40px 0px" }}
          value={
            <>
              44K{' '}
            </>
          }
          title="Attandee List"
        />
        </div>
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
