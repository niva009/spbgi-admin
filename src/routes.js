import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


const User = React.lazy(() => import('./views/registredusers/users'))
const EventCreaation = React.lazy(() => import('./views/events/eventcreation'))
const EventList = React.lazy(() => import('./views/events/eventList'))
const category = React.lazy(() => import('./views/category/category'))
const CreateEventTime = React.lazy(() => import('./views/eventtime/createeventtime'))
const EventTimeList = React.lazy(() => import('./views/eventtime/eventtimelist'))
const EventTimeUpdate = React.lazy(() => import('./views/eventtime/eventtimeupdate'))
const ManualOrder = React.lazy(() => import('./views/orders/manualorder'))
const orderList = React.lazy(() => import('./views/orders/orderlist'))
const BreakfastList = React.lazy(() => import('./views/events/breakfast'))
const Orders = React.lazy(() => import('./views/orders/orders'))
const Attandance = React.lazy(() => import('./views/registredusers/attandacne'))
const RoleAssignment = React.lazy(() => import('./views/registredusers/rolemanagement'))



const routes = [
  { path: '/', name: 'Dashboard' , element: Dashboard },
  { path: '/registed-users', name: 'Registed Users' , element: User },
  { path: '/event-creation', name: 'Event Creation' , element: EventCreaation },  
  { path: '/event-list', name: 'Event List' , element: EventList }, 
  { path: '/category', name: 'Category' , element: category },
  { path: '/eventtime', name: 'Event Time' , element: CreateEventTime },
  { path :'/event-time-list', name: 'Event Time List' , element: EventTimeList },  
  { path :'/event-time-update/:id', name: 'Event Time Update' , element: EventTimeUpdate },
  { path :'/manual-order', name: 'Manual Order' , element: ManualOrder },
  { path :'/order-list', name: 'Order List' , element: orderList },
  { path :'/event-beakfastlist', name: 'Order List' , element: BreakfastList },
  { path :'/orders/:id', name: 'Order single' , element: Orders },
  { path :'/attandance-list', name: 'Order single' , element: Attandance },
  { path :'/role-user', name: 'role assignment' , element: RoleAssignment },
]

export default routes
