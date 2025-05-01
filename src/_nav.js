// navConfig.js
import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilBell,
  cilCursor,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const getNav = () => {
  const role = localStorage.getItem("role");

  if (role === "2") {
    // Only show Attendees List and Order List
    return [
      {
        component: CNavGroup,
        name: 'User Management',
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'attandees list',
            to: '/attandance-list',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'orderMangement',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'order List',
            to: '/order-list',
          },
        ],
      },
    ];
  }

  return [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/',
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
        { component: CNavItem, name: 'Event Creation', to: '/event-creation' },
        { component: CNavItem, name: 'Event List', to: '/event-list' },
        { component: CNavItem, name: 'Event Breakfast List', to: '/event-beakfastlist' },
      ],
    },
    {
      component: CNavGroup,
      name: 'User Management',
      to: '/buttons',
      icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
      items: [
        { component: CNavItem, name: 'Registed Users', to: '/registed-users' },
        { component: CNavItem, name: 'attandees list', to: '/attandance-list' },
        { component: CNavItem, name: 'Role assignment', to: '/role-user' },
      ],
    },
    {
      component: CNavGroup,
      name: 'Category',
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      items: [
        { component: CNavItem, name: 'Add & VIew Category', to: '/category' },
      ],
    },
    {
      component: CNavGroup,
      name: 'orderMangement',
      to: '/#',
      icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
      items: [
        { component: CNavItem, name: 'manual order', to: '/manual-order' },
        { component: CNavItem, name: 'order List', to: '/order-list' },
      ],
    },
    {
      component: CNavGroup,
      name: 'reports',
      icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: 'Event Time Sheet',
      icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      items: [
        { component: CNavItem, name: 'create event time sheet', to: '/eventtime' },
        { component: CNavItem, name: 'Event time list', to: '/event-time-list' },
        { component: CNavItem, name: 'Event time update', to: '/event-time-update/:id' },
      ],
    },
  ];
};

export default getNav;
