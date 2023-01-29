import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypeProject } from 'project/redux/type';
const { Option } = Select;
const DrawerComponent = () => {
    const { flagDraw, contentDraw, titleDraw } = useSelector(state => state.project)
    const dispatch = useDispatch()
    const showDrawer = () => {
        dispatch({
            type: actionTypeProject.SET_OPEN_DRAW,

        })
    };
    const onClose = () => {
        dispatch({
            type: actionTypeProject.SET_CLOSE_DRAW,

        })
    };
    return (
        <>

            <Drawer
                title={titleDraw}
                width={720}
                onClose={onClose}
                open={flagDraw}
                bodyStyle={{
                    paddingBottom: 80,
                }}
              
            >
                {contentDraw}
            </Drawer>
        </>
    )
}

export default DrawerComponent
