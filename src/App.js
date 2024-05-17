import menuItems from "./component/user/my-profile/menu-items";
import ProfileSettingDropdownMenu from "./component/user/my-profile/profile-setting-dropdown-menu";
import CustomRouters from "./router/custom-routers";




function App() {
  return (
    <div className="App ">
      <ProfileSettingDropdownMenu menuItems={menuItems} />
      <CustomRouters/>
    </div>
  );
}

export default App;
