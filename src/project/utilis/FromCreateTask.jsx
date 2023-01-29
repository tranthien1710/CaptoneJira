import { Button, Col, Form, Input, InputNumber, Row, Select, Slider } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateTaskAction, fetchGetAllTaskTypeAction, fetchGetPriorityAction, fetchGetStatusAction, fetchGetUsersAction, fetchProjectIdAction } from 'project/redux/action';
import { useFormik } from 'formik';
const FromCreateTask = () => {
    const editorRef = useRef(null);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchGetAllTaskTypeAction)
        dispatch(fetchGetPriorityAction)
        dispatch(fetchGetUsersAction)
        dispatch(fetchGetUsersAction(''))
        dispatch(fetchGetStatusAction)
    }, [])
    const { TaskType } = useSelector(state => state.project);
    const { Priority } = useSelector(state => state.project);
    const { onSearch, Status } = useSelector(state => state.project)
    const [timeTracking, settimeTracking] = useState({
        timeTrackingSpent: 5,
        timeTrackingRemaining: 5
    })
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
            "taskName": "",
            "description": "",
            "statusId": Status[0]?.statusId,
            "originalEstimate": 0,
            "timeTrackingSpent": 0,
            "timeTrackingRemaining": 0,
            "projectId": 0,
            "typeId": TaskType[0]?.id,
            "priorityId": Priority[0]?.priorityId,
            "listUserAsign": []
        },
        onSubmit: (value) => {
            console.log(value)
            dispatch(fetchCreateTaskAction(value))
        }
    })
    const handleChangeSelect = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleChangeSelectProject = (value, option) => {
        formik.setFieldValue('projectId',value)
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
                <Row>
                    <Col span={24} >
                        <Form.Item label="Project">
                            <Select options={listProject.map((item, index) => {
                                return { label: item.projectName, value: item.id }
                            })} name='projectId' onChange={handleChangeSelectProject} ></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={30}>

                    <Col span={12}>
                        <Form.Item label="Task Name">
                            <Input name='taskName' onChange={formik.handleChange} />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item label="Status">
                            <Select onChange={handleChangeSelect('statusId')} name='statusId' options={Status.map((item, index) => {
                                return { label: item.statusName, value: item.statusId }
                            })} ></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={30}>
                    <Col span={12}>
                        <Form.Item label="Priority">
                            <Select options={Priority.map((item, index) => {
                                return { label: item.priority, value: item.priorityId }
                            })} name="priorityId" onChange={handleChangeSelect('priorityId')} ></Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Task type">
                            <Select options={TaskType.map((item, index) => {
                                return { label: item.taskType, value: item.id }
                            })} name="typeId" onChange={handleChangeSelect('typeId')} ></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={30}>
                    <Col span={12}>
                        <Form.Item label='Assigness'>
                            <Select
                                name=''
                                options={onSearch.map((item, index) => {
                                    return { label: item.name, value: item.userId }
                                })}
                                mode="tags"
                                size={'middle'}
                                placeholder="Please select"

                                onChange={(values) => {
                                    console.log(values)
                                    formik.setFieldValue('listUserAsign', values)
                                }}
                                style={{ width: '100%' }}
                                onSearch={(value) => {

                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                    </Col>
                </Row>
                <Row gutter={30}>
                    <Col span={12}>
                        <Form.Item label='Original Estimate'>
                            <InputNumber min={0} name='originalEstimate' onChange={(e) => {
                                formik.setFieldValue('originalEstimate', e)
                            }} defaultValue={0} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='Time spent'>
                            <InputNumber min={0} name='timeTrackingSpent' defaultValue={0} onChange={(e) => {
                                settimeTracking({
                                    ...timeTracking, timeTrackingSpent: e
                                })
                                formik.setFieldValue('timeTrackingSpent', e)
                            }} />
                        </Form.Item></Col>
                    <Col span={6}>
                        <Form.Item label='Time remaining'>
                            <InputNumber min={0} name='timeTrackingRemaining' defaultValue={0} onChange={(e) => {
                                settimeTracking({
                                    ...timeTracking, timeTrackingRemaining: e
                                });
                                formik.setFieldValue('timeTrackingRemaining', e)
                            }} />
                        </Form.Item></Col>
                </Row>
                <Form.Item label="DesCripstion" >
                    <>
                        <Editor
                            name="description"
                            onEditorChange={(value) => {
                                formik.setFieldValue('description', value)
                            }}
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue=""
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

                    </>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' size='large' htmlType='submit'>Create Task</Button>
                </Form.Item>
            </Form>
        </Row>
    )
}

export default FromCreateTask
