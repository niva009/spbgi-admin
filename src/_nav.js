import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'event tools',
  },
  {
    component: CNavGroup,
    name: 'event',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Event Creation',
        to: '/event-creation',
      },
      {
        component: CNavItem,
        name: 'Event List',
        to: '/event-list',
      },
      // {
      //   component: CNavItem,
      //   name: 'upcomming event',
      //   to: '/base/cards',
      // },
      // {
      //   component: CNavItem,
      //   name: 'event location pictures',
      //   to: '/base/carousels',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Collapse',
      //   to: '/base/collapses',
      // },
      // {
      //   component: CNavItem,
      //   name: 'List group',
      //   to: '/base/list-groups',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Navs & Tabs',
      //   to: '/base/navs',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Pagination',
      //   to: '/base/paginations',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Placeholders',
      //   to: '/base/placeholders',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Popovers',
      //   to: '/base/popovers',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Progress',
      //   to: '/base/progress',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Smart Pagination',
      //   href: 'https://coreui.io/react/docs/components/smart-pagination/',
      //   badge: {
      //     color: 'danger',
      //     text: 'PRO',
      //   },
      // },
      
    ],
  },
  {
    component: CNavGroup,
    name: 'User Management',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Registed Users',
        to: '/registed-users ',
      },
      {
        component: CNavItem,
        name: 'attandees list',
        to: '/#',
      },
      {
        component: CNavItem,
        name: 'Role assignment',
        to: '/#',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Category',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add & VIew Category',
        to: '/category',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'orderMangement',
    to: '/#',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'manual order',
        to: '/manual-order',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'reports',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'CoreUI Free',
    //     to: '/icons/coreui-icons',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'CoreUI Flags',
    //     to: '/icons/flags',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'CoreUI Brands',
    //     to: '/icons/brands',
    //   },
    // ],
  },
  {
    component: CNavGroup,
    name: 'Event Time Sheet',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'create event time sheet',
        to: '/eventtime',
      },
      {
        component: CNavItem,
        name: 'Event time list',
        to: '/event-time-list',
      },
      {
        component: CNavItem,
        name: 'Event time update',
        to: '/event-time-update/:id',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'help center',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },

  

]

export default _nav
