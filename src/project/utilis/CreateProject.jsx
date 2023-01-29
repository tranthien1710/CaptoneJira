import { Button, Form, Input, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { GetProjectCategory } from './serviceCreateproject';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { fetchCreateProjectAction } from 'project/redux/action';
import { useNavigate } from 'react-router-dom';
const CreateProject = () => {

  const [category, setCategoty] = useState([]);
  const navigate = useNavigate()

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  useEffect(() => {
    GetProjectCategory().then(res => setCategoty(res.data.content))
  }, [])
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      projectName: '',
      description: '',
      categoryId: ""
    },
    onSubmit: async (value) => {

      try {
        await dispatch(fetchCreateProjectAction(value))
        navigate('/projectmanager')
      } catch (error) {

      }
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

        <Form.Item label="Name">
          <Input name='projectName' onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="DesCripstion">
          <>
            <Editor
              name="description"
              onEditorChange={handleSelect('description')}
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue="<p>This is the initial content of the editor.</p>"
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

          <Select name='categoryId' onChange={handleSelect("categoryId")} options={category.map(item => ({ label: item.projectCategoryName, value: item.id }))} ></Select>

        </Form.Item>
        <Form.Item label=" ">
          <Button htmlType='submit' type='primary'>Create Project</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateProject
