import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Roots of Equations',
    path: '/rootofequations',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Garphical Method',
        path: '/rootofequations/garphical',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Bisection Method',
        path: '/rootofequations/bisection',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'False-Position Method',
        path: '/rootofequations/falseposition',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'One-Point iteration',
        path: '/rootofequations/onepoint',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Newton-Raphson Method',
        path: '/rootofequations/newtonraphson',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Secant Method',
        path: '/rootofequations/secent',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: 'Linear Equations',
    path: '/linearequations',
    icon: <AiIcons.AiFillFileText />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Cramers Rule',
        path: '/linearequations/carmersrule',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Gauss Elimination Method',
        path: '/linearequations/gausselimination',
        icon: <IoIcons.IoIosPaper />,
      },
    ]
  },
  {
    title: 'Newton divided-differences',
    path: '/newtoninterpolation',
    icon: <AiIcons.AiFillFileText />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Linear Interpolation',
        path: '/newtoninterpolation/newtonlinear',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Quadratic Interpolation',
        path: '/newtoninterpolation/newtonquadratic',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Polynomial Interpolation',
        path: '/newtoninterpolation/newtonpolynomial',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: 'Lagrange Interpolation',
    path: '/lagrangeinterpolation',
    icon: <AiIcons.AiFillFileText />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Linear Interpolation',
        path: '/lagrangeinterpolation/lagrangelinear',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Quadratic Interpolation',
        path: '/lagrangeinterpolation/lagrangequadratic',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Polynomial Interpolation',
        path: '/lagrangeinterpolation/lagrangepolynomial',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: 'Spline Interpolation',
    path: '/splineinterpolation',
    icon: <AiIcons.AiFillFileText />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Linear Interpolation',
        path: '/splineinterpolation/splinelinear',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Quadratic Interpolation',
        path: '/splineinterpolation/splinequadratic',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Cubic Spline',
        path: '/splineinterpolation/cubicspline',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
];
