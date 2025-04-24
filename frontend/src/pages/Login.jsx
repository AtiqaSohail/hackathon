// src/pages/Login.jsx
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axiosInstance.post("/auth/login", values);
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message || "Login successful");
        navigate("/dashboard");
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {["email", "password"].map((field, idx) => (
          <div key={idx} className="mb-4">
            <label className="block mb-1 font-medium capitalize">{field}</label>
            <div className="flex items-center border rounded px-3 py-2">
              {field === "email" ? <FaEnvelope className="mr-2" /> : <FaLock className="mr-2" />}
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                onChange={formik.handleChange}
                value={formik.values[field]}
                className="outline-none w-full"
              />
            </div>
            {formik.errors[field] && <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>}
          </div>
        ))}

        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
