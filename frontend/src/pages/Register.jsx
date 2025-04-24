// src/pages/Register.jsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaTransgender } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      gender: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axiosInstance.post("/auth/register", values);
        toast.success(res.data.message);
        navigate("/login");
      } catch (err) {
        toast.error(err.response?.data?.message || "Registration failed");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {["fullName", "email", "password", "gender"].map((field, idx) => (
          <div key={idx} className="mb-4">
            <label className="block mb-1 font-medium capitalize">{field}</label>
            <div className="flex items-center border rounded px-3 py-2">
              {field === "fullName" && <FaUser className="mr-2" />}
              {field === "email" && <FaEnvelope className="mr-2" />}
              {field === "password" && <FaLock className="mr-2" />}
              {field === "gender" && <FaTransgender className="mr-2" />}
              {field !== "gender" ? (
                <input type={field === "password" ? "password" : "text"} name={field} onChange={formik.handleChange} value={formik.values[field]} className="outline-none w-full" />
              ) : (
                <select name="gender" value={formik.values.gender} onChange={formik.handleChange} className="outline-none w-full">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>
            {formik.errors[field] && <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>}
          </div>
        ))}

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
