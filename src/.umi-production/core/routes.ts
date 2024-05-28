// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/stardust/Documents/Coding/Conapp/react-gantt/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => {
        const React = require('react');
        const { default: getDemoRenderArgs } = require('/Users/stardust/Documents/Coding/Conapp/react-gantt/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        })
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('/Users/stardust/Documents/Coding/Conapp/react-gantt/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/en-US/component",
        "component": require('/Users/stardust/Documents/Coding/Conapp/react-gantt/website/component.en-US.md').default,
        "exact": true,
        "meta": {
          "filePath": "website/component.en-US.md",
          "updatedTime": 1698303653000,
          "title": "Component",
          "nav": {
            "path": "/en-US/component",
            "title": "Component",
            "order": 1
          },
          "slugs": [],
          "hasPreviewer": true,
          "locale": "en-US"
        },
        "title": "Component -  "
      },
      {
        "path": "/component",
        "component": require('/Users/stardust/Documents/Coding/Conapp/react-gantt/website/component.md').default,
        "exact": true,
        "meta": {
          "filePath": "website/component.md",
          "updatedTime": 1698149566000,
          "title": "组件",
          "nav": {
            "path": "/component",
            "title": "组件总览",
            "order": 1
          },
          "slugs": [
            {
              "depth": 2,
              "value": "组件",
              "heading": "组件"
            },
            {
              "depth": 3,
              "value": "基础使用",
              "heading": "基础使用"
            },
            {
              "depth": 3,
              "value": "新增任务",
              "heading": "新增任务"
            },
            {
              "depth": 3,
              "value": "多级结构",
              "heading": "多级结构"
            },
            {
              "depth": 3,
              "value": "自定义表格列",
              "heading": "自定义表格列"
            },
            {
              "depth": 3,
              "value": "依赖结构",
              "heading": "依赖结构"
            },
            {
              "depth": 3,
              "value": "自定义渲染",
              "heading": "自定义渲染"
            },
            {
              "depth": 3,
              "value": "自定义筛选",
              "heading": "自定义筛选"
            },
            {
              "depth": 3,
              "value": "高级用法",
              "heading": "高级用法"
            },
            {
              "depth": 2,
              "value": "类型定义",
              "heading": "类型定义"
            },
            {
              "depth": 3,
              "value": "Column 定义",
              "heading": "column-定义"
            },
            {
              "depth": 3,
              "value": "data 定义",
              "heading": "data-定义"
            },
            {
              "depth": 3,
              "value": "Dependence 定义",
              "heading": "dependence-定义"
            },
            {
              "depth": 3,
              "value": "Bar 定义",
              "heading": "bar-定义"
            },
            {
              "depth": 3,
              "value": "Sight 定义",
              "heading": "sight-定义"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "方法",
              "heading": "方法"
            }
          ],
          "hasPreviewer": true
        },
        "title": "组件 -  "
      },
      {
        "path": "/en-US",
        "component": require('/Users/stardust/Documents/Coding/Conapp/react-gantt/website/index.en-US.md').default,
        "exact": true,
        "meta": {
          "filePath": "website/index.en-US.md",
          "updatedTime": 1701026232000,
          "title": "React Gantt Component",
          "hero": {
            "title": "rc-gantt",
            "desc": "<div class=\"markdown\"><p>Gantt Component</p></div>",
            "actions": [
              {
                "text": "Quick Start →",
                "link": "/component"
              }
            ]
          },
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2021<br /></p></div>",
          "slugs": [
            {
              "depth": 2,
              "value": "Getting Started",
              "heading": "getting-started"
            },
            {
              "depth": 2,
              "value": "📦 Install dependencies",
              "heading": "-install-dependencies"
            },
            {
              "depth": 2,
              "value": "🔨 Demo",
              "heading": "-demo"
            },
            {
              "depth": 2,
              "value": "Feedback",
              "heading": "feedback"
            }
          ],
          "locale": "en-US"
        },
        "title": "React Gantt Component -  "
      },
      {
        "path": "/",
        "component": require('/Users/stardust/Documents/Coding/Conapp/react-gantt/website/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "website/index.md",
          "updatedTime": 1701026232000,
          "title": "React Gantt Component",
          "hero": {
            "title": "rc-gantt",
            "desc": "<div class=\"markdown\"><p>Gantt组件</p></div>",
            "actions": [
              {
                "text": "快速上手 →",
                "link": "/component"
              }
            ]
          },
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2021<br /></p></div>",
          "slugs": [
            {
              "depth": 2,
              "value": "快速使用",
              "heading": "快速使用"
            },
            {
              "depth": 2,
              "value": "📦 安装依赖",
              "heading": "-安装依赖"
            },
            {
              "depth": 2,
              "value": "🔨 快速开始",
              "heading": "-快速开始"
            },
            {
              "depth": 2,
              "value": "问题反馈",
              "heading": "问题反馈"
            }
          ]
        },
        "title": "React Gantt Component -  "
      }
    ],
    "title": " ",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
