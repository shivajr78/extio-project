import React, { useState, useEffect } from 'react';
import { getRoles, createRole, updateRole, deleteRole } from '../../api';
import PageHeader from "../../components/common/PageHeader";
import Select from 'react-select';

const ManageRoles = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState(['Projects', 'Management', 'Tickets', 'Our Clients', "Payroll", 'Employees', 'Accounts']);
  const [formData, setFormData] = useState({ name: '', permissions: [] });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const result = await getRoles();
    setRoles(result.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData._id) {
      await updateRole(formData._id, formData);
    } else {
      await createRole(formData);
    }
    fetchRoles();
    setFormData({ name: '', permissions: [] });
  };

  const handleDelete = async (id) => {
    await deleteRole(id);
    fetchRoles();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePermissionsChange = (selectedOptions) => {
    setFormData(prevData => ({ ...prevData, permissions: selectedOptions.map(option => option.value) }));
  };




  return (
    <div className="row align-item-center">
      <div className="col-md-12">
        <PageHeader headerTitle="Manage Roles" />
        <div className='card mb-3'>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="col-md-8">
                <label htmlFor="rolename" className="form-label">Role Name</label>
                <input type="text" name="name" value={formData.name} placeholder='Role Name' onChange={handleChange} className="form-control" id="firstname" required />
              </div>
              <br />
              <div className="col-md-8">
                <label className="form-label">Select Permission</label>
                <Select
                  isMulti
                  options={permissions.map(permission => ({ value: permission, label: permission }))}
                  value={formData.permissions.map(permission => ({ value: permission, label: permission }))}
                  onChange={handlePermissionsChange}
                  className="form-control"
                  placeholder="Select Permissions"
                />
              </div>
              <button className="btn btn-primary mt-4" type="submit">Save Role</button>
            </form>
          </div>
        </div>
        <div className="container-xxl">
          <PageHeader headerTitle="Roles Table" />
          <div className="row align-item-center ">
            <div className="col-md-12">
              <div className="card mb-3">
                <div className="card-body basic-custome-color">
                  <div className="table-responsive">
                    <table className="table table-striped ">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Permissions</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.map(role => (
                          <tr key={role._id}>
                            <td>{role.name}</td>
                            <td>{role.permissions.join(', ')}</td>
                            <td className="btn-group" role="group" aria-label="Basic outlined example">
                              <button onClick={() => setFormData(role)} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
                              <button onClick={() => handleDelete(role._id)} type="button" className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
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
    </div>
  );
};

export default ManageRoles;
