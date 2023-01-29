import React, { useEffect, useRef, useState } from 'react'
import { AutoComplete, Avatar, Button, Popover, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddUserProject, fetchDeleteProjectAction, fetchDeleteUserFromProjectAction, fetchGetAllProjectAction, fetchGetUsersAction } from 'project/redux/action';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { actionTypeProject } from 'project/redux/type';
import FormEditProject from './FormEditProject';
import { message, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';


const Project = () => {
    const dispatch = useDispatch();
    const listproject = useSelector(state => state.project.listProject);
    const onSearch = useSelector(state => state.project.onSearch);
    const urefsearch = useRef(null)
    useEffect(() => {
        dispatch(fetchGetAllProjectAction)
    }, [])
    const [value, setvalue] = useState("")
    const columns = [
        {
            title: 'ProjectID',
            dataIndex: 'id',

            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend'],
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            sorter: (a, b) => a.projectName.length - b.projectName.length,
            sortDirections: ['descend'],
            render: (text, record, index) => {
                return <NavLink to={`/projectmanager/detail/${record.id}`}>{text}</NavLink>
            }
        },
        {
            title: 'Creator',
            dataIndex: 'ProjectID',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.creator.name - b.creator.name,
            render: (text, listproject) => { return <span> {listproject.creator.name}</span> }
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.categoryName - b.categoryName,
        },
        {
            title: 'Member',
            dataIndex: '',
            defaultSortOrder: 'descend',
            render: (text, recor, index) => {
                return <div>{recor.members.slice(0, 3).map(item => {
                    return <Popover placement='top' title="menbers" content={() => {
                        return <table className='table-auto'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Avatar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recor.members.map((item, index) => {
                                    return <tr>
                                        <td>{item.userId}</td>
                                        <td>{item.name}</td>
                                        <td><Avatar src={item.avatar} /></td>
                                        <td><Button onClick={() => {
                                           
                                            dispatch(fetchDeleteUserFromProjectAction({ userId: item.userId, projectId: recor.id }))
                                            dispatch(fetchGetAllProjectAction)
                                        }} size='small' type='primary' danger>x</Button></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }}>
                        <Avatar src={item.avatar}></Avatar>
                    </Popover>
                })}
                    {recor.members.length > 3 ? <Avatar>...</Avatar> : ""}
                    <Popover placement="rightBottom" title={"Add user"} content={() => {
                        return <div><AutoComplete
                            value={value}
                            onChange={(value) => {
                                setvalue(value)
                            }}
                            onSelect={(value, option) => {
                                setvalue(option.label)
                                let data = {
                                    "projectId": recor.id,
                                    "userId": value
                                }
                                dispatch(fetchAddUserProject(data))
                                dispatch(fetchGetAllProjectAction)
                            }}
                            options={onSearch.map((item, index) => {
                                return {
                                    label: item.name,
                                    value: item.userId
                                }
                            })}
                            onSearch={(value) => {
                                if (urefsearch.current) {
                                    clearTimeout(urefsearch.current)
                                }
                                urefsearch.current = setTimeout(() => {
                                    dispatch(fetchGetUsersAction(value))
                                }, 300)

                            }} style={{ width: "100%" }} /> </div>
                    }} trigger="click">
                        <Button className='rounded-full' type='primary'>+</Button>
                    </Popover>
                </div>
            }
        },
        {
            title: 'Actions',
            dataIndex: '',
            defaultSortOrder: 'descend',
            render: (text, listproject, index) => {
                return <p>
                    <Button onClick={() => {
                        dispatch({
                            type: actionTypeProject.SET_EDIT_FORMPROJECT,
                            payload: {
                                fromedit: <FormEditProject />,
                                listproject,
                                titleDraw: "Edit Project"
                            }
                        })
                    }} type='primary' className='text-xl cursor-pointer ' ><EditOutlined /></Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete project?"
                        onConfirm={() => {
                            dispatch(fetchDeleteProjectAction(listproject.id));
                            dispatch(fetchGetAllProjectAction);
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='primary' className='text-xl cursor-pointer ml-1 bg-slate-700' ><DeleteOutlined /></Button >
                    </Popconfirm>
                </p>
            }

        },

    ];
    const data = listproject;
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div>
            <Table columns={columns} dataSource={data} onChange={onChange} />;
        </div>
    )
}

export default Project
