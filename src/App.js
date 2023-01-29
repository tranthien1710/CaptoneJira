import Home from 'login/Home';
import Login from 'login/Login';
import Sign from 'login/Sign';
import CreateProject from 'project/utilis/CreateProject';
import Project from 'project/utilis/Project';
import ProjectDetail from 'project/utilis/ProjectDetail';
import ProjectManager from 'project/utilis/ProjectManager';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter >
      <Routes>
      
        <Route element={<Home />}>
          <Route index path='/' element={<Login />} />
          <Route path='/sign' element={<Sign />} />
        </Route>
        <Route  element={<ProjectManager />} >
          <Route index path='/projectmanager' element={<Project />} />
          <Route index path='/projectmanager/detail/:id' element={<ProjectDetail />} />
          <Route path='/projectmanager/createproject' element={<CreateProject />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
