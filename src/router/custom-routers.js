import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MenuPage from '../page/common/menu-page'
import RegisterPage from '../page/common/register-page'
import LoginPage from '../page/common/login-page'
import MainPages from '../page/user/main-page'
import MyProfilePage from '../page/user/my-profile-page'
import FriendProfilePage from '../page/user/friend-profile-page'
import StatusPage from '../page/user/status-page'
import UpdateProfilePage from '../page/user/update-profile-page'
import GroupPage from '../page/user/group-page'
import UserHomePage from '../page/user/user-home-page'

const CustomRouters = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/updateProfile" element={<UpdateProfilePage />} />
        <Route path="/main" element={<MainPages />} />
        <Route path='/profile' element={<MyProfilePage />} />
        <Route path='/updateProfile' element={<UpdateProfilePage/>}/>
        <Route path='/friendProfile' element={<FriendProfilePage />} />
        <Route path='/friendProfile' element={<FriendProfilePage />} />
        <Route path='/status' element={<StatusPage/>}/>
        <Route path='/group' element={<GroupPage/>}/>
        <Route path='/userHome' element={<UserHomePage/>}/>
      </Routes>
    </>

  )
}

export default CustomRouters