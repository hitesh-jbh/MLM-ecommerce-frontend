import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { adminGetWithdrawals, adminApproveWithdrawal, adminRejectWithdrawal, adminMarkPaid } from '../../utils/service/apiService';
import { Loader2 } from 'lucide-react';

export default function WithdrawalsMgt() {
  const token = useSelector(s => s.auth.token);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('pending');

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await adminGetWithdrawals(token, filter);
      const data = res?.data;
      const safeList = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];
      setList(safeList);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { if (token) fetchList(); }, [token, filter]);

  const doApprove = async (id) => { await adminApproveWithdrawal(token, id); fetchList(); };
  const doReject = async (id) => { await adminRejectWithdrawal(token, id); fetchList(); };
  const doPaid = async (id) => { await adminMarkPaid(token, id); fetchList(); };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Withdrawal Requests</h2>
      <div className="mb-4">
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border p-2 rounded">
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="paid">Paid</option>
        </select>
      </div>
      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Request ID</th>
              <th className="p-2">User ID</th>
              <th className="p-2">User Name</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(list) ? list.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-2">#{r.id}</td>
                <td className="p-2">{r.user_id}</td>
                <td className="p-2">{r.first_name} {r.last_name}</td>
                <td className="p-2">₹{Number(r.amount).toLocaleString('en-IN', {minimumFractionDigits:2})}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2">{new Date(r.created_at).toLocaleString()}</td>
                <td className="p-2">
                  {r.status === 'pending' && (
                    <>
                      <button onClick={() => doApprove(r.id)} className="mr-2 bg-blue-600 text-white px-2 py-1 rounded">Approve</button>
                      <button onClick={() => doReject(r.id)} className="mr-2 bg-red-600 text-white px-2 py-1 rounded">Reject</button>
                    </>
                  )}
                  {r.status === 'approved' && (
                    <button onClick={() => doPaid(r.id)} className="bg-green-600 text-white px-2 py-1 rounded">Mark Paid</button>
                  )}
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
