import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser, getRoles } from '../../api';
import PageHeader from "../../components/common/PageHeader";
import Select from 'react-select';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', mobile: '', roles: [] });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await getUsers();
      setUsers(result.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const result = await getRoles();
      setRoles(result.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await updateUser(formData._id, formData);
      } else {
        await createUser(formData);
      }
      fetchUsers();
      setFormData({ firstName: '', lastName: '', email: '', mobile: '', roles: [] });
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleRolesChange = (selectedOptions) => {
    setFormData(prevData => ({
      ...prevData,
      roles: selectedOptions ? selectedOptions.map(option => option.value) : []
    }));
  };

  // Create a map of roles by ID for quick lookup
  const roleMap = new Map(roles.map(role => [role._id, role.name]));

  const handleEdit = (user) => {
    setFormData({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      roles: user.roles.map(role => role._id) // Use role IDs for editing
    });
  };

  return (
    <div className="container-xxl">
      <PageHeader headerTitle="Manage Users" />
      <div className="row align-item-center">
        <div className="col-md-12">
          <div className="card mb-3">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="emailaddress" className="form-label">Email Address</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Mobile Number</label>
                    <input type="number" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required />
                  </div>
                  <div className="col-md-6">
                  <label className="form-label">Select Role</label>
                    <Select
                      isMulti
                      options={roles.map(role => ({ value: role._id, label: role.name }))}
                      value={formData.roles.map(roleId => ({ value: roleId, label: roleMap.get(roleId) || 'Unknown Role' }))}
                      onChange={handleRolesChange}
                      className="form-control"
                      placeholder="Select Roles"
                    />
                  </div>
                </div>
                <button className="btn btn-primary mt-4" type="submit">Save User</button>
              </form>
            </div>
          </div>
        </div>
      </div>


      <div className="container-xxl">
        <PageHeader headerTitle="User Table" />
        <div className="row align-item-center">
          <div className="col-md-12">
            <div className="card mb-3">
              <div className="card-body basic-custome-color">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col" >First Name</th>
                        <th scope="col" >Last Name</th>
                        <th scope="col" >Email</th>
                        <th scope="col" >Mobile</th>
                        <th scope="col" >Roles</th>
                        <th scope="col" >Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user._id}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>{user.mobile}</td>
                          <td>
                            {user.roles.length > 0
                              ? user.roles.map(role => roleMap.get(role._id) || 'Unknown Role').join(', ')
                              : 'No Roles'}
                          </td>
                          <td>
                            <button onClick={() => setFormData(user)} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
                            <button onClick={() => handleDelete(user._id)} type="button" className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
