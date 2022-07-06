import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';

//SimpleBar
import SimpleBar from "simplebar-react";
import { getBacklogListOnGlobalSearch } from '../../store/backlogs/action';
import { getSprintListOnGlobalSearch } from '../../store/sprints/action';
import { getTaskListOnGlobalSearch } from '../../store/tasks/action';


const SearchOption = () => {

    const dispatch = useDispatch();


    const { globalSearchBacklog } = useSelector((state) => ({
        globalSearchBacklog: state.Backlogs.globalSearchBacklog,
      }));
    const { globalSearchSprint } = useSelector((state) => ({
        globalSearchSprint: state.Sprints.globalSearchSprint,
    }));
    const { globalSearchTask } = useSelector((state) => ({
        globalSearchTask: state.Tasks.globalSearchTask,
    }));

    const [value, setValue] = useState("");
    const onChangeData = (e) => {
        let search = e.target.value;
        if (search)  { 
          dispatch(getBacklogListOnGlobalSearch(search));
          dispatch(getSprintListOnGlobalSearch(search));
          dispatch(getTaskListOnGlobalSearch(search));
        } else {
          console.log('');
        }
    };
    
        

    useEffect(() => {
        var searchOptions = document.getElementById("search-close-options");
        var dropdown = document.getElementById("search-dropdown");
        var searchInput = document.getElementById("search-options");

        searchInput.addEventListener("focus", function () {
            var inputLength = searchInput.value.length;
            if (inputLength > 0) {
                dropdown.classList.add("show");
                searchOptions.classList.remove("d-none");
            } else {
                dropdown.classList.remove("show");
                searchOptions.classList.add("d-none");
            }
        });

        searchInput.addEventListener("keyup", function () {
            var inputLength = searchInput.value.length;
            if (inputLength > 0) {
                dropdown.classList.add("show");
                searchOptions.classList.remove("d-none");
            } else {
                dropdown.classList.remove("show");
                searchOptions.classList.add("d-none");
            }
        });

        searchOptions.addEventListener("click", function () {
            searchInput.value = "";
            dropdown.classList.remove("show");
            searchOptions.classList.add("d-none");
        });

        document.body.addEventListener("click", function (e) {
            if (e.target.getAttribute('id') !== "search-options") {
                dropdown.classList.remove("show");
                searchOptions.classList.add("d-none");
            }
        });
    }, []);

    return (
        <React.Fragment>
            <form className="app-search d-none d-md-block">
                <div className="position-relative">
                    <Input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search..."
                    id="search-options"
                    onChange={onChangeData} 
                    />
                    <span className="mdi mdi-magnify search-widget-icon"></span>
                    <span className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                        id="search-close-options"></span>
                </div>
                <div className="dropdown-menu dropdown-menu-lg" id="search-dropdown">
                    <SimpleBar style={{ height: "320px" }}>


                        

                        <div className="dropdown-header mt-2">
                            <h6 className="fs-6 text-uppercase">Tasks</h6>
                        </div>

                        {globalSearchTask ?
                            globalSearchTask.map((item) => (
                                <Link to={`/apps-tasks-details/${item.id}`}  key={item.id} className="dropdown-item notify-item">
                                    <span className='blockquote-footer fs-6'>{item.title}</span>
                                </Link>
                            ))
                            :
                            <></>
                        }

                        <hr style={{borderTop: '2px'}}/>

                        <div className="dropdown-header mt-2">
                            <h6 className="fs-6 text-uppercase">Backlogs</h6>
                        </div>

                        {globalSearchBacklog ?
                            globalSearchBacklog.map((item) => (
                                <Link to={`/apps-backlogs-overview/${item.id}`}  key={item.id} className="dropdown-item notify-item">
                                    <span className='blockquote-footer fs-6'>{item.title}</span>
                                </Link>
                            ))
                            :
                            <></>
                        }

                        <hr style={{borderTop: '2px'}}/>

                        <div className="dropdown-header">
                            <h6 className="fs-6 text-uppercase">Sprint</h6>
                        </div>

                        {globalSearchSprint ?
                            globalSearchSprint.map((item) => (
                                <Link to={`/apps-sprints-overview/${item.id}`}  key={item.id} className="dropdown-item notify-item">
                                    <span className='blockquote-footer fs-6'>{item.title}</span>
                                </Link>
                            ))
                            :
                            <></>
                        }


                    </SimpleBar>
                </div>
            </form>
        </React.Fragment>
    );
};

export default SearchOption;