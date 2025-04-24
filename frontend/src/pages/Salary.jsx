import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Salary = () => {
  const [loading, setLoading] = useState(false);
  const [showNetSalary, setShowNetSalary] = useState(false);

  // Formik setup with Yup validation schema
  const formik = useFormik({
    initialValues: {
      basic: '',
      bonuses: '',
      deductions: '',
      netSalary: '',
    },
    validationSchema: Yup.object({
      basic: Yup.number()
        .min(0, 'Basic salary must be >= 0')
        .required('Basic salary is required'),
      bonuses: Yup.number()
        .min(0, 'Bonuses must be >= 0')
        .optional(),
      deductions: Yup.number()
        .min(0, 'Deductions must be >= 0')
        .optional(),
      netSalary: Yup.number()
        .min(0, 'Net salary must be >= 0')
        .required('Net salary is required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.put('/salary', values);
        alert(res.data.message || 'Salary updated successfully');
      } catch (err) {
        alert(
          err.response?.data?.message || 'Error updating salary details'
        );
      } finally {
        setLoading(false);
      }
    },
  });

  // Fetch existing salary details on mount
  useEffect(() => {
    const fetchSalary = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/salary');
        if (res.data) {
          formik.setValues({
            basic: res.data.basic || '',
            bonuses: res.data.bonuses || '',
            deductions: res.data.deductions || '',
            netSalary: res.data.netSalary || '',
          });
        }
      } catch (err) {
        console.log('Error fetching salary:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSalary();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Salary Details</h2>
      <form onSubmit={formik.handleSubmit}>

        {/* Basic Salary */}
        <div className="mb-4">
          <label htmlFor="basic" className="block mb-1 font-medium">Basic Salary</label>
          <input
            type="number"
            id="basic"
            name="basic"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.basic}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
              formik.touched.basic && formik.errors.basic ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formik.touched.basic && formik.errors.basic && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.basic}</p>
          )}
        </div>

        {/* Bonuses */}
        <div className="mb-4">
          <label htmlFor="bonuses" className="block mb-1 font-medium">Bonuses (optional)</label>
          <input
            type="number"
            id="bonuses"
            name="bonuses"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bonuses}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
              formik.touched.bonuses && formik.errors.bonuses ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formik.touched.bonuses && formik.errors.bonuses && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.bonuses}</p>
          )}
        </div>

        {/* Deductions */}
        <div className="mb-4">
          <label htmlFor="deductions" className="block mb-1 font-medium">Deductions (optional)</label>
          <input
            type="number"
            id="deductions"
            name="deductions"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deductions}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
              formik.touched.deductions && formik.errors.deductions ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {formik.touched.deductions && formik.errors.deductions && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.deductions}</p>
          )}
        </div>

        {/* Net Salary with show/hide toggle */}
        <div className="mb-6 relative">
          <label htmlFor="netSalary" className="block mb-1 font-medium">Net Salary</label>
          <input
            type={showNetSalary ? 'text' : 'password'}
            id="netSalary"
            name="netSalary"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.netSalary}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
              formik.touched.netSalary && formik.errors.netSalary ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowNetSalary((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-600"
            tabIndex={-1}
          >
            {showNetSalary ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
          </button>
          {formik.touched.netSalary && formik.errors.netSalary && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.netSalary}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Salary'}
        </button>
      </form>
    </div>
  );
};

export default Salary;
