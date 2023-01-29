import React, { useEffect, useState } from 'react'
import { Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const { Header, Footer, Sider, Content } = Layout;

const Home = () => {

    const [stateSize, setSteteSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    const dispatch = useDispatch()
    useEffect(() => {
       
        window.onresize = () => {
            setSteteSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    }, [])
    return (
        <div className=' container mx-auto h-screen flex justify-center items-center'>
           
            <div style={{ width: '100%' }}>
                <Layout className='shadow-lg' >
                    <Sider width={stateSize.width / 3} style={{ height: stateSize.height * 2 / 3, backgroundImage: 'url(https://picsum.photos/700)', backgroundSize: 'cover' }}></Sider>
                    <Layout>
                        <Content><Outlet /></Content>
                    </Layout>
                </Layout>
            </div>
        </div>
    )
}

export default Home
