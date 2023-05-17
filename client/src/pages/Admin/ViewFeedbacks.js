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
import { getAllFeedback } from '../../auth/actions/feedbackActions';
import { deleteFeedback } from '../../auth/actions/feedbackActions';
import { useNavigate } from 'react-router-dom';


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

function ViewFeedbacks({getAllFeedback, deleteFeedback}) {

  const defaultMaterialTheme = createTheme();

  const feedbackData = useSelector((state) => state.feedbacks.feedbacks);

  const navigate = useNavigate();


    var columns = [
        {title: "id", field: "feedback_id", hidden: 'true' },
        {title: "Employee Id", field: "employee_id" },
        // {title: "Name", field: "name" },
        // {title: "Email", field: "email" },
        {title: "Feedback", field: "feedback"},
        
      ]
      const [data, setData] = useState([]); //table data
     
      //for error handling
      const [iserror, setIserror] = useState(false)
      const [errorMessages, setErrorMessages] = useState([])
      const [isChecked, setIsChecked] = useState([])

      const selected_feedback_id = [];

      useEffect(() => { 
getAllFeedback()
        console.log(feedbackData)
        console.log(selected_feedback_id)
      }, [])


      const handleChechbox = (e) => {
        const {value, checked} = e.target;
        if(checked){
          setIsChecked([...isChecked, value])
        } else {
          setIsChecked(isChecked.filter((e) => e !== value))
        }
      }

      const handleDelete = (evt, data) => {
             data.map(({feedback_id}) => selected_feedback_id.push(feedback_id))
             console.log(selected_feedback_id)
              // alert('You want to delete ' + data.length + ' rows')
              deleteFeedback(selected_feedback_id, navigate)
      }

  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>

<MaterialTable mt={90}
      title="Feedbacks from Employees"
      columns={columns}
      data={feedbackData}
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
            onClick: (evt, data) => handleDelete(evt, data)
          },
        ]}
        
      
    />
 </ThemeProvider>
    </div>
  )
}

export default connect(null, { getAllFeedback, deleteFeedback })(ViewFeedbacks);