import React, { useEffect, useRef, useState } from "react";
import DivTable from "../../Components/DivTable";
import DivAdd from "../../Components/DivAdd";
import DivSelect from "../../Components/DivSelect";
import DivInput from "../../Components/DivInput";
import Modal from "../../Components/Modal";
import { confirmation, sendRequest } from "../../functions";
import { PaginationControl } from "react-bootstrap-pagination-control";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [operation, setOperation] = useState("");
  const [title, setTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [classLoad, setClassLoad] = useState("");
  const [classTable, setClassTable] = useState("d-none");
  const [rows, setRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const NameInput = useRef();
  const close = useRef();
  let method = "";
  let url = "";

  useEffect(() => {
    getEmployees(page);
    getDepartments();
  }, [page]);

  const getEmployees = async (page) => {
    const res = await sendRequest("GET", "", `api/employees?page=${page}`, "");
    setEmployees(res.data);
    setRows(res.total);
    setPageSize(res.per_page);
    setClassTable("");
    setClassLoad("d-none");
  };

  const getDepartments = async () => {
    const res = await sendRequest("GET", "", "api/departments", "");
    setDepartments(res);
  };

  const deleteEmployee = (id, name) => {
    confirmation(name, `api/employees/${id}`, "employees");
  };

  const clear = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDepartmentId(1);
  };

  const openModal = (op, n, e, p, d, em) => {
    clear();
    setTimeout(() => NameInput.current.focus(), 3000);
    setOperation(op);
    setId(em);
    if (op === 1) {
      setTitle("Create Employee");
    } else {
      setTitle("Update Employee");
      setName(n);
      setEmail(e);
      setPhone(p);
      setDepartmentId(d);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    if (operation === 1) {
      method = "POST";
      url = "api/employees";
    } else {
      method = "PUT";
      url = `api/employees/${id}`;
    }

    const form = {
      name: name,
      email: email,
      phone: phone,
      department_id: departmentId,
    };
    const res = await sendRequest(method, form, url, "");

    if (method === "PUT" && res.status === true) {
      close.current.click();
    }
    if (res.status === true) {
      clear();
      getEmployees(page);
      setTimeout(() => NameInput.current.focus(), 1000);
    }
  };

  const goPage = (p) => {
    setPage(p);
    getEmployees(p);
  };

  return (
    <div className="container-fluid">
      <DivAdd>
        <button
          className="btn cont-add-btn"
          data-bs-toggle="modal"
          data-bs-target="#modalEmployees"
          onClick={() => openModal(1)}
        >
          <i className="fa-solid fa-circle-plus"></i> Add
        </button>
      </DivAdd>
      <DivTable col="10" off="1" classLoad={classLoad} classTable={classTable}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>DEPARTMENT</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {employees.map((row, i) => (
              <tr key={row.id}>
                <td>{i + 1}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.department}</td>
                <td>
                  <button
                    className="btn btn-blue"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEmployees"
                    onClick={() =>
                      openModal(
                        2,
                        row.name,
                        row.email,
                        row.phone,
                        row.department_id,
                        row.id
                      )
                    }
                  >
                    <i className="fa-solid fa-edit"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-trash"
                    onClick={() => deleteEmployee(row.id, row.name)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationControl
          changePage={(page) => goPage(page)}
          next={true}
          limit={pageSize}
          page={page}
          total={rows}
        />
      </DivTable>

      <Modal title={title} modal="modalEmployees">
        <div className="modal-body">
          <form onSubmit={save}>
            <DivInput
              type="text"
              icon="fa-user"
              value={name}
              className="form-control"
              placeholder="Name"
              required="required"
              ref={NameInput}
              handleChange={(e) => setName(e.target.value)}
            />
            <DivInput
              type="email"
              icon="fa-at"
              value={email}
              className="form-control"
              placeholder="Email"
              required="required"
              handleChange={(e) => setEmail(e.target.value)}
            />
            <DivInput
              type="number"
              icon="fa-phone"
              value={phone}
              className="form-control"
              placeholder="Phone"
              required="required"
              handleChange={(e) => setPhone(e.target.value)}
            />
            <DivSelect
              icon="fa-building"
              value={departmentId}
              className="form-select"
              required="required"
              options={departments}
              handleChange={(e) => setDepartmentId(e.target.value)}
            />
            <div className="d-grid col-10 mx-auto">
              <button className="btn cont-add-btn">
                <i className="fa-solid fa-save"></i> Save
              </button>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" data-bs-dismiss="modal" ref={close}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default Employees;