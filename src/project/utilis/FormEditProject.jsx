import { Button, Form, Input, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { GetProjectCategory } from './serviceCreateproject';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateProjectAction, fetchEditProjectAction } from 'project/redux/action';
import { actionTypeProject } from 'project/redux/type';
const FormEditProject = () => {

    const [category, setCategoty] = useState([]);

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    useEffect(() => {
        GetProjectCategory().then(res => setCategoty(res.data.content))
    }, [])
    const detialProject = useSelector(state => state.project.detailProject)

    const dispatch = useDispatch()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: detialProject.id,
            projectName: detialProject.projectName,
            description: detialProject.description,
            categoryId: detialProject.categoryId
        },
        onSubmit: (value) => {

            dispatch(fetchEditProjectAction(value.id, value))
            dispatch({
                type: actionTypeProject.SET_CLOSE_DRAW
            })
        }
    })
    const handleSelect = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    return (
        <div>
            <h1 className='text-2xl uppercase'>Project Detail</h1>
            <Form onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
            >

                <Form.Item label="Project ID">
                    <Input name='id' onChange={formik.handleChange} disabled={true} value={formik.values.id} />
                </Form.Item>
                <Form.Item label="Name">
                    <Input name='projectName' onChange={formik.handleChange} value={formik.values.projectName} />
                </Form.Item>
                <Form.Item label="DesCripstion">
                    <>
                        <Editor
                            name="description"
                            onEditorChange={handleSelect('description')}
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue=""
                            value={formik.values.description}
                            init={{
                                height: 350,
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
                <Form.Item label="Project Category">

                    <Select name='categoryId' value={formik.values.categoryId} onChange={handleSelect("categoryId")} options={category.map(item => ({ label: item.projectCategoryName, value: item.id }))} ></Select>

                </Form.Item>
                <Form.Item label=" ">
                    <Button htmlType='submit' type='primary'>Edit Project</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormEditProject
