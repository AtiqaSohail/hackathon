import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../axios'; // Your configured axios instance
import { FaCalendarAlt, FaInfoCircle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const leaveTypes = ['Sick', 'Casual', 'Annual', 'Other'];

const LeaveSchema = Yup.object().shape({
  leaveType: Yup.string().oneOf(leaveTypes).required('Leave Type is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End Date cannot be before Start Date')
    .required('End Date is required'),
  reason: Yup.string(),
});

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch leaves on mount
  useEffect(() => {
    const fetchLeaves = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/leave/my-leaves'); // Adjust baseURL if needed
        setLeaves(res.data);
      } catch (error) {
        setErrorMsg(error.response?.data?.message || 'Failed to load leaves');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  const formik = useFormik({
    initialValues: {
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
    },
    validationSchema: LeaveSchema,
    onSubmit: async (values, { resetForm }) => {
      setSubmitLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      try {
        const res = await axios.post('/leave/apply', values);
        setLeaves((prev) => [res.data.leave, ...prev]);
        setSuccessMsg(res.data.message || 'Leave applied successfully!');
        resetForm();
      } catch (error) {
        setErrorMsg(error.response?.data?.message || 'Failed to apply leave');
      } finally {
        setSubmitLoading(false);
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-700">Apply for Leave</h2>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded-md p-6 mb-10"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Leave Type */}
          <div>
            <label
              htmlFor="leaveType"
              className="block font-medium mb-1 text-gray-700 flex items-center gap-1"
            >
              Leave Type <FaInfoCircle className="text-blue-500" />
            </label>
            <select
              id="leaveType"
              name="leaveType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.leaveType}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formik.touched.leaveType && formik.errors.leaveType
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-indigo-500'
              }`}
            >
              <option value="">Select leave type</option>
              {leaveTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {formik.touched.leaveType && formik.errors.leaveType ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.leaveType}</p>
            ) : null}
          </div>

          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block font-medium mb-1 text-gray-700 flex items-center gap-1"
            >
              Start Date <FaCalendarAlt className="text-green-500" />
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDate}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formik.touched.startDate && formik.errors.startDate
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-green-500'
              }`}
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.startDate}</p>
            ) : null}
          </div>

          {/* End Date */}
          <div>
            <label
              htmlFor="endDate"
              className="block font-medium mb-1 text-gray-700 flex items-center gap-1"
            >
              End Date <FaCalendarAlt className="text-red-500" />
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDate}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                formik.touched.endDate && formik.errors.endDate
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-red-500'
              }`}
            />
            {formik.touched.endDate && formik.errors.endDate ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.endDate}</p>
            ) : null}
          </div>

          {/* Reason */}
          <div className="md:col-span-2">
            <label
              htmlFor="reason"
              className="block font-medium mb-1 text-gray-700 flex items-center gap-1"
            >
              Reason (optional) <FaInfoCircle className="text-gray-400" />
            </label>
            <textarea
              id="reason"
              name="reason"
              rows="3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reason}
              placeholder="Optional explanation"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        {errorMsg && (
          <div className="mt-3 text-red-600 font-medium text-center">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="mt-3 text-green-600 font-medium text-center">{successMsg}</div>
        )}

        <button
          type="submit"
          disabled={submitLoading}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded transition disabled:opacity-50"
        >
          {submitLoading ? 'Submitting...' : 'Apply Leave'}
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-4 text-indigo-700">My Leaves</h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading leaves...</p>
      ) : leaves.length === 0 ? (
        <p className="text-center text-gray-500">No leaves applied yet.</p>
      ) : (
        <div className="space-y-4">
          {leaves.map((leave) => (
            <div
              key={leave._id}
              className="bg-white shadow rounded-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="flex flex-col space-y-1 w-full md:w-2/3">
                <div className="flex items-center gap-2 font-semibold text-lg text-gray-800">
                  <span>{leave.leaveType} Leave</span>
                  {leave.status === 'Approved' && (
                    <FaCheckCircle className="text-green-500" title="Approved" />
                  )}
                  {leave.status === 'Rejected' && (
                    <FaTimesCircle className="text-red-500" title="Rejected" />
                  )}
                  {leave.status === 'Pending' && (
                    <span className="text-yellow-500 font-medium">Pending</span>
                  )}
                </div>
                <div className="text-gray-600">
                  <span>
                    <strong>From:</strong>{' '}
                    {new Date(leave.startDate).toLocaleDateString()}
                  </span>{' '}
                  |{' '}
                  <span>
                    <strong>To:</strong> {new Date(leave.endDate).toLocaleDateString()}
                  </span>
                </div>
                {leave.reason && (
                  <p className="text-gray-500 italic mt-1">{leave.reason}</p>
                )}
              </div>
              <div className="mt-3 md:mt-0 md:text-right text-sm text-gray-400">
                Applied: {new Date(leave.appliedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaves;
