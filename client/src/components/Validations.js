import * as Yup from "yup";

export const LoginValidations = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password can't exceed 20 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
      "Must contain at least a digit and a special character"
    ),
});

export const SignupValidations = Yup.object().shape({
    
    name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z\s]+$/, "Name should only contain alphabets")
    .max(50, "Name should not exceed 15 characters")
    .min(2, "Name should be at least 2 characters long"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Required"),
          contact: Yup.string()
          .matches(/^\d{10}$/, "Contact number must be a 10-digit number")
          .required("Contact number is required"),
          password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters long")
          .max(20, "Password can't exceed 20 characters")
          .matches(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
            "Must contain at least a digit and a special character"
          ),
        confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords must match")
        
      
});

export const AddTaskValidations = Yup.object().shape({
    task_name: Yup.string()
    .required('Task name is required')
    .min(3, 'Task name must be at least 3 characters')
    .max(80, 'Task name cannot exceed 80 characters'),
  status: Yup.string().required('Status is required'),
//   duration: Yup.string().required('Duration is required'),
  priority: Yup.string().required('Priority is required'),
  level: Yup.string().required('Level is required'),
  dueDate: Yup.string().required('Due date is required'),
  startDate: Yup.string().required('Start date is required'),
  task_desc: Yup.string()
  .test(
    'word-count',
    'Task description must not exceed 60 words',
    (value) => {
      if (value) {
        return value.split(' ').length <= 60;
      }
      return true; // Skip validation if value is undefined
    }
  )
  .min(3, 'Task description must be at least 3 characters')
  .max(200, 'Task description cannot exceed 200 characters')
});

export const UpdateProfileValidations = Yup.object().shape({
    name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters and spaces'),
  job_role: Yup.string(),
  team: Yup.string(),
  gender: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Gender should only contain letters and spaces'),
  age: Yup.number()
    .typeError('Age must be a number')
    .integer('Age must be an integer')
    .positive('Age must be a positive number')
    .max(100, 'Age cannot exceed 100'),
  maritalStatus: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Marital status should only contain letters and spaces'),
  about: Yup.string()
    .test(
      'wordCount',
      'About should not exceed 100 words',
      (value) => value ? value.trim().split(' ').length <= 100 : true
    ),
  number: Yup.string().matches(/^\d{10}$/, 'Number must be a 10-digit value'),
  email: Yup.string().email('Invalid email address'),
  dob: Yup.date("Invalid date"),
  fb_link: Yup.string()
  .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Invalid Facebook link'),
  linkedin_link: Yup.string()
  .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Invalid LinkedIn link'),
  twitter_link: Yup.string()
  .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Invalid Twitter link'),
  address: Yup.string().required('Address is required'),
  display_image: Yup.string('Invalid image link'),
})
