import { Avatar, Button, Col, Form, Input, InputNumber, Popover, Row, Select, Slider } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateTaskAction, fetchDeleteUserFromProjectAction, fetchDetailAction, fetchGetAllProjectAction, fetchGetAllTaskTypeAction, fetchGetPriorityAction, fetchGetStatusAction, fetchGetUsersAction, fetchProjectIdAction, fetchRemoUserTaskAction, fetchUpdateDesCripAction, fetchUpdateTaskAction } from 'project/redux/action';
import { useFormik } from 'formik';
const FromTaskDetail = () => {
    const editorRef = useRef(null);
    const dispatch = useDispatch()
    const [timeTracking, settimeTracking] = useState({
        timeTrackingSpent: '',
        timeTrackingRemaining: '',
    })
    const [visibleDes, setVisibleDes] = useState(true)
    const { TaskType } = useSelector(state => state.project);
    const { Priority } = useSelector(state => state.project);
    const { onSearch, Status, TaskDetail, projectDetail } = useSelector(state => state.project)
    const timeTrackingSpent = TaskDetail.timeTrackingSpent
    const timeTrackingRemaining = TaskDetail.timeTrackingRemaining

    useEffect(() => {
        dispatch(fetchGetAllTaskTypeAction)
        dispatch(fetchGetPriorityAction)
        dispatch(fetchGetUsersAction)
        dispatch(fetchGetUsersAction(''))
        dispatch(fetchGetStatusAction)
        settimeTracking({
            ...timeTracking, timeTrackingSpent, timeTrackingRemaining
        })
    }, [TaskDetail])

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const handleChange = (value) => {
        console.log(value)
    }
    const { listProject } = useSelector(state => state.project)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            "taskId": TaskDetail?.taskId?.toString(),
            "taskName": TaskDetail?.taskName,
            "description": TaskDetail?.description,
            "statusId": TaskDetail?.statusId,
            "originalEstimate": TaskDetail?.originalEstimate,
            "timeTrackingSpent": TaskDetail?.timeTrackingSpent,
            "timeTrackingRemaining": TaskDetail?.timeTrackingRemaining,
            "projectId": TaskDetail?.projectId,
            "typeId": TaskDetail?.typeId,
            "priorityId": TaskDetail?.priorityId,
            "listUserAsign": TaskDetail?.assigness
        },
        onSubmit: (value) => {
            console.log("listUserAsign", value.listUserAsign)
            // const listUserAsign = value.listUserAsign.map((item, index) => {
            //     return item.id;
            // });
            // const values = { ...value, listUserAsign }

            try {
                dispatch(fetchUpdateTaskAction(value))
                dispatch(fetchDetailAction(value.projectId))
            } catch (error) {
                console.log(error)
            }
        }
    })
    console.log("formik.values.listUserAsign:",formik.values.listUserAsign)

    const handleChangeSelect = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleChangeSelectProject = (value, option) => {
        formik.setFieldValue('projectId', value)
        console.log(value)
        dispatch(fetchProjectIdAction(value))
    }
    return (
        <Row className='w-full'>
            <Form
                onSubmitCapture={formik.handleSubmit}
                className='w-full'
                layout='vertical'
            >
                <Row gutter={10}>
                    <Col span={14}>

                        <h3>Task Name: {formik.values.taskName}</h3>
                        <Form.Item label="DesCripstion" >
                            {visibleDes && formik.values.description ? <div onClick={() => {
                                setVisibleDes(false)
                            }} >{parse(formik.values.description?.toString())}</div> : <>
                                <Editor
                                    name="description"
                                    onEditorChange={(value) => {
                                        formik.setFieldValue('description', value)
                                    }}
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    value={formik.values.description}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                                            'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                                            'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                                            'alignleft aligncenter alignright alignjustify | ' +
                                            'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />

                                <Button onClick={() => {
                                    setVisibleDes(true)
                                }}
                                >Close</Button>
                            </>}


                        </Form.Item>
                    </Col>
                    <Col span={8}>

                        <Form.Item label="Status">
                            <Select onChange={handleChangeSelect('statusId')} name='statusId' value={formik.values.statusId} options={Status.map((item, index) => {
                                return { label: item.statusName, value: item.statusId }
                            })} ></Select>
                        </Form.Item>
                        <Form.Item label="Priority">
                            <Select options={Priority.map((item, index) => {
                                return { label: item.priority, value: item.priorityId }
                            })} name="priorityId" onChange={handleChangeSelect('priorityId')} value={formik.values.priorityId} ></Select>
                        </Form.Item>
                        <Form.Item label="Task type">
                            <Select options={TaskType.map((item, index) => {
                                return { label: item.taskType, value: item.id }
                            })} name="typeId" onChange={handleChangeSelect('typeId')} value={formik.values.typeId} ></Select>
                        </Form.Item>
                        <Form.Item label='Assigness'>
                            {formik.values.listUserAsign?.map((item, index) => {
                                return <Popover title='menbers' content={() => {
                                    return <table className='table-auto'>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Avatar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td><img className='w-8 rounded-full' src={item.avatar} alt={item.avatar} /></td>
                                            <td><Button onClick={()=>{
                                                console.log({taskId:TaskDetail.taskId , userId:item.id})
                                                 dispatch(fetchRemoUserTaskAction({taskId:TaskDetail.taskId , userId:item.id}))
                                                
                                            }} size='small' type='primary' danger>x</Button></td>
                                          </tr>
                                        </tbody>
                                    </table>
                                }} >
                                    <img className='w-8 mx-2 rounded-full' key={index} src={item.avatar} />
                                </Popover>
                            })}
                            <Select
                                name=''
                                options={projectDetail.members.map((item, index) => {
                                    return { label: item.name, value: item.userId }
                                })}
                                mode="tags"
                                size={'middle'}
                                placeholder="Please select"
                                onChange={(values, option) => {
                                    console.log(values)
                                    console.log("option",option)
                                    formik.setFieldValue('listUserAsign', values)
                                }}
                                style={{ width: '100%' }}
                                onSearch={(value) => {

                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Time Tracking'>
                            <Slider
                                className='pb-0 mb-0 mx-0'

                                value={Number(timeTracking.timeTrackingSpent)}
                                max={Number(timeTracking.timeTrackingSpent + timeTracking.timeTrackingRemaining)}
                                tooltip={{
                                    open: true,
                                }}
                            />
                            <p className='flex justify-between my-0 font-semibold'> <span>{timeTracking.timeTrackingSpent}h logged</span><span>{timeTracking.timeTrackingRemaining}h remaining</span></p>
                        </Form.Item>
                        <Form.Item label='Original Estimate'>
                            <InputNumber min={0} name='originalEstimate' onChange={(e) => {
                                formik.setFieldValue('originalEstimate', e)
                            }} defaultValue={0} value={formik.values.originalEstimate} />
                        </Form.Item>
                        <Row gutter={30}>

                            <Col span={12}>
                                <Form.Item label='Time spent'>
                                    <InputNumber min={0} name='timeTrackingSpent' value={formik.values.timeTrackingSpent} onChange={(e) => {
                                        settimeTracking({
                                            ...timeTracking, timeTrackingSpent: e
                                        })
                                        formik.setFieldValue('timeTrackingSpent', e)
                                    }} />
                                </Form.Item></Col>
                            <Col span={12}>
                                <Form.Item label='Time remaining'>
                                    <InputNumber min={0} name='timeTrackingRemaining' value={formik.values.timeTrackingRemaining} onChange={(e) => {
                                        settimeTracking({
                                            ...timeTracking, timeTrackingRemaining: e
                                        });
                                        formik.setFieldValue('timeTrackingRemaining', e)
                                    }} />
                                </Form.Item></Col>
                        </Row>
                    </Col>
                </Row>


                <Row gutter={30}>


                </Row>


                <Form.Item>
                    <Button type='primary' size='large' htmlType='submit'>Edit Task</Button>
                </Form.Item>
            </Form>
        </Row>
    )
}

export default FromTaskDetail
