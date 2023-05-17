import React, { useEffect } from 'react'
import { forwardRef, useState } from 'react'
import MaterialTable from "material-table";
import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import Alert from '@mui/icons-material/Error';
import { ThemeProvider, createTheme } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// for api call
import { connect, useSelector } from "react-redux";
import { getAllUsers } from '../../auth/actions/userActions';
import { deleteUser } from '../../auth/actions/userActions';
import { useNavigate } from 'react-router-dom';

import ConfirmDialog from '../../components/Shared/ConfirmDialog';


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Eye: forwardRef((props, ref) => <VisibilityIcon {...props} ref={ref} />),
  
};

function ViewAllEmployees({getAllUsers, deleteUser}) {

  const defaultMaterialTheme = createTheme();

  const employeesData = useSelector((state) => state.employees.employees);

  const navigate = useNavigate();

  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''});


    var columns = [
        {title: "id", field: "id", hidden: 'true' },
        {title: "Name", field: "name" },
        {title: "Email", field: "email" },
        {title: "Phone", field: "contactNumber"},
        
      ]
      const [data, setData] = useState([]); //table data
     
      //for error handling
      const [iserror, setIserror] = useState(false)
      const [errorMessages, setErrorMessages] = useState([])
      const [isChecked, setIsChecked] = useState([])

      const selected_employee_id = [];

      useEffect(() => { 
getAllUsers()
        console.log(employeesData)
        setData(employeesData)
        console.log(selected_employee_id)
      },[])


     

      const handleDelete = (evt, data) => {
        setConfirmDialog({...confirmDialog, isOpen: false})
             data.map(({id}) => selected_employee_id.push(id))
             console.log("Deleting",selected_employee_id)
              // alert('You want to delete ' + data.length + ' rows')
             deleteUser(selected_employee_id)
             getAllUsers()
             setData(employeesData)
             console.log("ugvbuj")
             
      }

  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>

<MaterialTable mt={90}
      title="Employee Details"
      columns={columns}
      data={data}
      icons={tableIcons}
      options={{
        headerStyle:{size:'80px'},
        selection: true,
        //actionsColumnIndex: -1
        }}

        actions={[
          {
            tooltip: 'Remove All Selected Users',
            icon: tableIcons.Delete,
            onClick: (evt, data) => setConfirmDialog({
              isOpen: true,
              title: 'Are you sure to delete this user?',
              subTitle: `You can't undo this operation`,
              onConfirm: () => { handleDelete(evt, data)}
            })
            // onClick: (evt, data) => handleDelete(evt, data)
          },

          {
            position: "row",
            tooltip: 'View Employee',
            icon: tableIcons.Eye,
            onClick: (evt, data) => navigate(`/admin/viewemployeedetails/${data.id}`)
            
          }
        ]}
        
      
    />
 </ThemeProvider>
 <ConfirmDialog confirmDialog= {confirmDialog} setConfirmDialog={setConfirmDialog}/>
    </div>
  )
}

export default connect(null, { getAllUsers, deleteUser })(ViewAllEmployees);