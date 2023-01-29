import React, { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser'
import { AutoComplete, Avatar, Button, Input, Popover, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddUserProject, fetchDeleteUserFromProjectAction, fetchDetailAction, fetchGetAllProjectAction, fetchGetUsersAction } from 'project/redux/action';
import { useParams } from 'react-router-dom';

const { Search } = Input;
const HeaderDetai = (props) => {
    const { detailProject } = props;
    const {id} = useParams()
  
    const dispatch = useDispatch()
  
    const useRefsearch = useRef(null)
    const onSearchINput = (value) => {
        console.log(value)
    }
    const [value, setvalue] = useState('')
    const onSearch = useSelector(state => state.project.onSearch);
    return (
        detailProject && <div>
            <h1>{detailProject.projectName}--{detailProject.creator?.name}</h1>
            <p className='my-1'>{parse(`${detailProject.description}`)}</p>
            <div>
                <Search style={{
                    width: 304,
                }} placeholder="input search text" onSearch={onSearchINput} enterButton />
                {detailProject.members?.map((item, index) => {
                    return <Popover title="Menbers" placement='top' content={() => {
                        return <AutoComplete >
                            <table className='table-auto border text-left' cellSpacing={2} >
                                <thead>
                                    <tr className='border-solid'>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Avatar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{item.userId}</td>
                                    <td>{item.name}</td>
                                    <td><Avatar src={item.avatar} /></td>
                                    <td><Button onClick={() => {
                                        dispatch(fetchDeleteUserFromProjectAction({ userId: item.userId, projectId: detailProject.id }))
                                        dispatch(fetchDetailAction(id));
                                    }} type='primary' size='small' danger>x</Button></td>
                                </tbody>
                            </table>
                        </AutoComplete>

                    }}>
                        <Avatar key={index} src={item.avatar} />
                    </Popover>
                })}
                <Popover title="Add users" placement='rightBottom' content={() => {
                    return <AutoComplete
                        value={value}
                        onChange={(value) => {
                            setvalue(value)
                        }}
                        onSelect={(value, option) => {
                            setvalue(option.label)
                            let data = {
                                "projectId": detailProject.id,
                                "userId": value
                            }
                            dispatch(fetchAddUserProject(data))
                            dispatch(fetchDetailAction(id));
                        }}
                        style={{ width: '100%' }}
                        onSearch={(value) => {
                            if (useRef.current) {
                                clearTimeout(useRefsearch.current);
                            }
                            useRefsearch.current = setTimeout(() => {
                                dispatch(fetchGetUsersAction(value))
                            }, 300)
                        }}
                        options={onSearch.map((item, index) => {
                            return { label: item.name, value: item.userId }
                        })}
                    >
                    </AutoComplete>
                }} >
                    <Button type='primary' className='rounded-full'>+</Button>
                </Popover>
            </div>
        </div>
    )
}

export default HeaderDetai
