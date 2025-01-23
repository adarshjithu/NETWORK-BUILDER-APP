import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required")
        .max(50, "Name cannot exceed 50 characters"),
    companyname: Yup.string()
        .required("Company name is required")
        .max(50, "Company name cannot exceed 50 characters"),
    industry: Yup.string()
        .required("Industry is required")
        .max(50, "Industry cannot exceed 50 characters"),
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    website: Yup.string()
        .url("Invalid website URL")
        .nullable(),
    dob: Yup.date()
        .nullable()
        .max(new Date(), "Date of birth cannot be in the future")
        .typeError("Invalid date"),
    googlemappins: Yup.string()
        .required("Google map pins are required")
        .max(100, "Google map pins cannot exceed 100 characters"),
    emergencynumber: Yup.string()
        .required("Emergency number is required")
        .matches(/^\d{3,5}$/, "Emergency number must be 3 to 5 digits"),
    joiningdate: Yup.date()
        .nullable()
        .typeError("Invalid joining date"),
    renewaldate: Yup.date()
        .nullable()
        .min(Yup.ref("joiningdate"), "Renewal date cannot be before the joining date")
        .typeError("Invalid renewal date"),
});


