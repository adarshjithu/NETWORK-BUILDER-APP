import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({
   
     password: yup.string().min(6, "Password must be atlest 6 characters").max(12, "Password maximum length exceeded").required("Required") .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
          "Must contain one uppercase,special charector,number"
        ),
     confirmpassword: yup
          .string()
          .min(6, "Password must be atlest 6 characters")
          .max(12, "Password maximum length exceeded")
          .required("Required")
          .oneOf([yup.ref("password")], "Password must match"),
});




