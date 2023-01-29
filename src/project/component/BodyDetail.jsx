import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Col, Row, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { actionTypeProject } from 'project/redux/type';
import FromCreateTask from 'project/utilis/FromCreateTask';
import FromTaskDetail from './FromTaskDetail';
import { fetchDetailAction, fetchTaskDetailAction, fetchUpdateProjectStatusAction } from 'project/redux/action';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useSelector } from 'react-redux';
const BodyDetail = (props) => {
  const { id } = props

  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const detailProject = useSelector(state => state.project.projectDetail)
  const [listTask, setListTask] = useState([])

  useEffect(() => {

    setListTask(detailProject)
  }, [detailProject])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDragEnd = (result) => {
    console.log(result)
    const { destination, source } = result;
    const { taskId, statusId } = JSON.parse(result.draggableId)

    if (!destination) {
      return;
    }
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }


    dispatch(fetchUpdateProjectStatusAction({
      "taskId": taskId,
      "statusId": destination.droppableId
    }))
    dispatch(fetchDetailAction(id))
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='mt-5'>
        <Button onClick={() => {
          dispatch({
            type: actionTypeProject.SET_OPEN_CREATE_TASK,
            payload: {
              content: <FromCreateTask />,
              titledraw: 'Create Task'
            }
          })
        }} className='my-2' type='primary' size='large'>Create Task</Button>
        <Row gutter={10}>
          {listTask.lstTask?.map((item, index) => {
            return <Col key={index} xs={20} sm={16} md={12} lg={8} xl={6} >
              <Droppable droppableId={item.statusId}>
                {(provide) => {
                  return <Card
                    ref={provide.innerRef}
                    {...provide.droppableProps}
                    className='shadow-lg'
                    title={item.statusName}
                    bordered={true}
                    style={{
                      width: "1005",
                      height: 'auto',
                    }}
                  >

                    {item.lstTaskDeTail.map((item, index) => {
                      return <Draggable draggableId={JSON.stringify({ taskId: item.taskId, statusId: item.statusId })} key={item.taskId} index={index}>
                        {(provide) => {
                          return <div
                            ref={provide.innerRef}
                            {...provide.draggableProps}
                            {...provide.dragHandleProps}
                            onClick={() => {
                              showModal();
                              dispatch(fetchTaskDetailAction(item.taskId))

                            }} className='bg-slate-100 mb-5 p-1 shadow-md ' key={index}>
                            <div>
                              <p className=' font-bold'>  {item.taskName}</p>
                              <div className='flex justify-between'>
                                <div>
                                  {item.priorityTask.priority}
                                </div>
                                <div>
                                  {item.assigness?.map((item, index) => {
                                    return <img className='w-8 rounded-full' src={item.avatar} alt="" />
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        }}
                      </Draggable>
                    })}
                    {provide.placeholder}
                  </Card>
                }}
              </Droppable>
            </Col>
          })}

        </Row>
        <Modal title="Task Detail" width={1000} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <FromTaskDetail />
        </Modal>
      </div>
    </DragDropContext>
  )
}

export default BodyDetail
