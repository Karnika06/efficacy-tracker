import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./LeftBody.css";
import Avatar from "@mui/material/Avatar";
import {RiEditCircleFill } from "react-icons/ri";
import dp from "../../assets/testdp.jpeg";
import { StyledFormButton, StyledTextInput } from "../Styles";
import { TextInputBox, RadioButtons, RadioInputBox } from "../FormLib";
import {
  InfoContainer,
  StyledHeading,
  StyledHeadingTitle,
  TextAreaInputContainer,
} from "./UserProfileStyle";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useViewport from "../../viewport/useViewport";
import { connect } from "react-redux";
import { updateUser } from "../../auth/actions/userActions";
import { storage} from '../../utils/init-firebase'
 import {ref,uploadBytes, getDownloadURL} from 'firebase/storage'
import { useNavigate } from "react-router-dom";
import { generateOTP } from "../../auth/actions/userActions";
import { UpdateProfileValidations } from "../Validations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LeftBody({ userData, updateUser }) {
  const { isMobile, isTablet } = useViewport();

  const [isEdit, isNotEdit] = useState(false);
  
  const navigate = useNavigate()  

  const radioOptions = [
    {
      key: "1",
      value: "Female",
    },
    {
      key: "2",
      value: "Male",
    },
    {
      key: "3",
      value: "Prefer not to say",
    },
  ];

  const initialValues = {
    name: userData.name,
    job_role: userData.job_role,
    team: userData.team,
    gender: userData.gender,
    age: userData.age,
    maritalStatus: userData.marital_status,
    about: userData.description,
    number: userData.contactNumber,
    email: userData.email,
    dob: userData.dob ? new Date(userData.dob).toISOString().slice(0, 10) : "",
    fb_link: userData.fb_link,
    linkedin_link: userData.linkedin_link,
    twitter_link: userData.twitter_link,
    address: userData.address,
    display_image: '',
  };

  
  const [image, setImage] = useState({});
  const [url, setUrl] = useState(userData.avatar);
  const [file, setFile] = useState()
  /** Formik doesn't support file upload so for that we will be creating below function to handle it*/

  const handleImageChange = async (e) => {
    const file1 = e.target.files[0]
    console.log(file1)
    if (!file1.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    } 
    if ( e.target.files[0]){
      setImage(e.target.files[0])
      setFile(URL.createObjectURL(file1))
    }
    console.log(image)
  }; 


  const onUpload = (image) => {
    console.log('Upload - ', image);
  
    if (image) {
      const fileExtension = image.name.split('.').pop().toLowerCase();
      const metadata = {
        contentType: `image/${fileExtension}`,
      };
  
      const imageRef = ref(storage, `employee - ${userData.id}`);
      uploadBytes(imageRef, image, metadata)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url);
              alert('Uploaded. Click on save button to save your uploaded picture.');
            })
            .catch((error) => {
              toast.error("Error getting image URL. Try Again!", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            });
          setImage(null);
        })
        .catch((error) => {
          toast.error(error.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } else {
      toast.error("Image not found", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };  

  return (
    <>
      <div className="left-body-container">
        <Formik
          initialValues={initialValues}
          validationSchema={UpdateProfileValidations}

          
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            
            values = Object.assign(values, { display_image: url || ''})
            values.employee_id = userData.id
            //console.log(values);
            isNotEdit(!isEdit)
            updateUser(values, setFieldError , setSubmitting)
          }}
        >
          {({ handleSubmit, isSubmitting, errors }) => (
          <Form>
            <StyledHeading padding={1} style={{flexDirection: isMobile ? 'column' : 'row', justifyContent: isMobile ? 'center' : 'space-between', alignItems: isMobile ? 'center' : 'center'}}>
              <StyledHeadingTitle size={1.4}>Your Details</StyledHeadingTitle>
              {isEdit ? (
                <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row',marginTop: isMobile ? '10px':'0px'}}>
                  <StyledFormButton type="submit">Save</StyledFormButton>
                  <StyledFormButton
                    type="button"
                    onClick={() => isNotEdit(!isEdit)}
                    style={{marginLeft: isMobile ? '0':'10px' , marginTop: isMobile ? '10px':'0px'}}
                  >
                    Cancel
                  </StyledFormButton>
                </div>
              ) : (
                <StyledFormButton
                  type="button"
                  onClick={() => isNotEdit(!isEdit)}
                >
                  Edit Profile
                </StyledFormButton>
              )}
            </StyledHeading>
            <Divider />

            <StyledHeadingTitle padding={2} size={1.2}>
              Profile Picture
            </StyledHeadingTitle>
            <Divider variant="middle" flexItem />
            <InfoContainer style={{flexDirection: 'column'}}>

            <label htmlFor='displayPicture' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2% 0', cursor: 'pointer'}}>
        <Avatar alt="Display Pic" src={ file ? file : url} sx={{ width: 180, height: 180, border: '8px solid #ccc' }} />
        <RiEditCircleFill className='edit-icon' style={{display: isEdit ? '' : 'none'}}/>
        
        </label>
        <input type='file' onChange={(e) => handleImageChange(e)} id='displayPicture' name='displayPicture' style={{display: 'none'}} disabled={!isEdit}/>
{isEdit ? <StyledFormButton type='button' onClick={() => onUpload(image)}>Upload Image</StyledFormButton> : ''}
            </InfoContainer>
            <StyledHeadingTitle padding={2} size={1.2}>
              Basic Info
            </StyledHeadingTitle>
            <Divider variant="middle" flexItem />

            <InfoContainer isMobile={isMobile}>
              <TextInputBox
                name="name"
                type="text"
                label="Name"
                placeholder="Full name"
                readOnly="true"
                height="45px"
              />

              <TextInputBox
                name="email"
                type="text"
                label="Email"
                placeholder="Email"
                readOnly="true"
                height="45px"
              />

              <TextInputBox
                name="number"
                type="text"
                label="Mobile"
                placeholder="Contact Number"
                readOnly={!isEdit}
                height="45px"
              />
              <TextInputBox
                name="dob"
                type="date"
                label="Date of Birth"
                readOnly={!isEdit}
                height="45px"
              />

              <TextInputBox
                name="age"
                type="text"
                label="Age"
                placeholder="Age"
                readOnly={!isEdit}
                height="45px"
              />

              <RadioInputBox
                control="radio"
                label="MaritalStatus"
                name="maritalStatus"
                options={[
                  {
                    key: "1",
                    value: "Single",
                  },
                  {
                    key: "2",
                    value: "Married",
                  },
                ]}
                disabled={!isEdit}
              />

              <RadioInputBox
                control="radio"
                label="Gender"
                name="gender"
                options={radioOptions}
                disabled={!isEdit}
              />

              <TextInputBox
                name="address"
                type="text"
                label="Address"
                placeholder="Address"
                readOnly={!isEdit}
                height="45px"
              />
            </InfoContainer>

            <StyledHeadingTitle padding={2} size={1.2}>
              Work Info
            </StyledHeadingTitle>
            <Divider variant="middle" flexItem />

            <InfoContainer>
              <TextInputBox
                name="job_role"
                type="text"
                label="Role"
                placeholder="Your Role"
                readOnly={!isEdit}
                height="45px"
              />
              <TextInputBox
                name="team"
                type="text"
                label="Team"
                placeholder="Team name"
                readOnly={!isEdit}
                height="45px"
              />
            </InfoContainer>

            <StyledHeadingTitle padding={2} size={1.2}>
              About Me
            </StyledHeadingTitle>
            <Divider variant="middle" flexItem />

            <InfoContainer>
              <TextInputBox
                name="about"
                type="text"
                label="Description"
                placeholder="Write about yourself..."
                readOnly={!isEdit}
                textarea="true"
                width="100%"
              />
            </InfoContainer>

            <StyledHeadingTitle padding={2} size={1.2}>
              External Links
            </StyledHeadingTitle>
            <Divider variant="middle" flexItem />

            <InfoContainer>
              <TextInputBox
                name="fb_link"
                type="text"
                label="Facebook Link"
                placeholder="Facebook Link"
                readOnly={!isEdit}
                height="45px"
                width="100%"
              />

              <TextInputBox
                name="linkedin_link"
                type="text"
                label="LinkedIn Link"
                placeholder="LinkedIn Link"
                readOnly={!isEdit}
                height="45px"
                width="100%"
              />
              <TextInputBox
                name="twitter_link"
                type="text"
                label="Twitter Link"
                placeholder="Twitter Link"
                readOnly={!isEdit}
                height="45px"
                width="100%"
              />
            </InfoContainer>

            <StyledHeadingTitle padding={2} size={1.2}>
              Security
            </StyledHeadingTitle>
            <Divider variant="middle" flexItem />

            <InfoContainer>
              <div className="about-me" style={{ width: "100%" }}>
                <span className="label-box">Password</span>
                <input className="input-box" value="*********"></input>
                <StyledFormButton type='button' style={{marginTop: '4%'}} onClick={() => generateOTP(userData, navigate)}>Reset Password</StyledFormButton>
              </div>

            </InfoContainer>
          </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default connect(null, {updateUser})(LeftBody);