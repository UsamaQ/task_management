import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

//import images
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import { getUserList } from '../../store/actions';

const ProfileDropdown = () => {


    const dispatch = useDispatch();

    const { userList } = useSelector((state) => ({
        userList: state.Users.userList,
      }));

    useEffect(() => {
        dispatch(getUserList());
      }, [dispatch]);


    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar3}
                            alt="Header Avatar" />
                            {userList.length !== 0?
                                <span className="text-start ms-xl-2">
                                    <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userList[0].firstName + ' '+ userList[0].lastName}</span>
                                </span>
                                :
                                <></>
                            }
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">

                    {userList.length !== 0?
                        <h6 className="dropdown-header">Welcome {userList[0].firstName}!</h6>
                        :
                        <></>
                    }
                    <DropdownItem href="/pages-profile"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">Profile</span></DropdownItem>
                    <DropdownItem href="/apps-tasks-kanban"><i
                        className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Taskboard</span></DropdownItem>
                    <div className="dropdown-divider"></div>
                    <DropdownItem href="/auth-lockscreen-basic"><i
                        className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Lock screen</span></DropdownItem>
                    <DropdownItem href="/logout"><i
                        className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle" data-key="t-logout">Logout</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;