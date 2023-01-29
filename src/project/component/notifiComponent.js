import React from 'react'
import { Button, notification, Space } from 'antd';


const notifiComponent = (type, msg, des = "") => {
    notification[type]({
        message: msg,
        description: des

    });


}

export default notifiComponent
