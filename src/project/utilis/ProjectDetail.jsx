import BodyDetail from 'project/component/BodyDetail';
import HeaderDetai from 'project/component/HeaderDetai';
import { fetchDetailAction } from 'project/redux/action';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ProjectDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const detailProject = useSelector(state => state.project.projectDetail)
    useEffect(() => {
        dispatch(fetchDetailAction(id));
    }, [])
   

    return (
        <div>
            <HeaderDetai detailProject={detailProject} />
            <BodyDetail detailProject={detailProject} id={id} />
        </div>
    )
}

export default ProjectDetail
