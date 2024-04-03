import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {db} from '../../Firebase/Context'
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import {  MdDelete, MdArrowOutward, MdEmail  } from 'react-icons/md';
import { IoMdPerson } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { CgCalendarDates } from "react-icons/cg";
import { FaTelegramPlane } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import Swal from 'sweetalert2';
import './UserTableStyle.css';

function UserTable({ showSearchBar = true }) { // Add props with default value for showSearchBar
  const [workers, setWorkers] = useState([]);
  const [filter, setFilter] = useState([]);

  
  // DELETE DATA
  const handleDelete = (id) => {
    const workerToDelete = workers.find((worker) => worker.id === id);

    Swal.fire({
      icon: 'warning',
      title: `Are you sure you want to delete the worker ${workerToDelete.name}?`,
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      cancelButtonColor: '#FFE2D8',
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#F04800'
    }).then((result) => {
      if (result.value) {
        const [worker] = workers.filter((worker) => worker.id === id);

        deleteDoc(doc(db, 'UserDetail_Wk_DB', id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${worker.name} data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const WorkersCopy = workers.filter((worker) => worker.id !== id);
        setWorkers(WorkersCopy);
      }
    });
  };

  // EDIT DATA
  const handleEdit = (id, newData) => {
    const workerToEdit = workers.find((worker) => worker.id === id);
    const { name, email, profession, date } = workerToEdit;

    Swal.fire({
      title: `Edit Info: ${name}`,
      html: `<div>
          <div>
            <label for="name">Name</label>
            <input id="name" class="swal2-input" value="${name}" placeholder="Name">
          </div>
          <div>
            <label for="email">Email</label>
            <input id="email" class="swal2-input" value="${email}" placeholder="Email">
          </div>
          <div>
            <label for="profession">Profession</label>
            <input id="profession" class="swal2-input" value="${profession}" placeholder="Profession">
          </div>
          <div>
            <label for="date">Date Submitted</label>
            <input id="date" class="swal2-input" type="date" value="${date}">
          </div>
        </div>`,
      showCancelButton: true,
      cancelButtonText: 'Reject',
      cancelButtonColor: '#FFE2D8',
      confirmButtonText: 'Approve',
      confirmButtonColor: '#F04800',
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const email = Swal.getPopup().querySelector('#email').value;
        const profession = Swal.getPopup().querySelector('#profession').value;
        const date = Swal.getPopup().querySelector('#date').value;
        return { name, email, profession, date };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { name, email, profession } = result.value;
        const updatedData = { ...newData, name, email, profession, status: 'approved' };
        setDoc(doc(db, 'UserDetail_Wk_DB', id), updatedData);
        const updatedWorkers = workers.map((worker) => (worker.id === id ? updatedData : worker));
        setWorkers(updatedWorkers);
        Swal.fire({
          icon: 'success',
          title: 'Approved!',
          text: `${name}'s data has been approved and updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        const updatedData = { ...newData, status: 'rejected' };
        setDoc(doc(db, 'UserDetail_Wk_DB', id), updatedData);
        const updatedWorkers = workers.map((worker) => (worker.id === id ? updatedData : worker));
        setWorkers(updatedWorkers);
        Swal.fire({
          icon: 'info',
          title: 'Rejected!',
          text: `${name}'s data has been rejected.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // VIEW DATA
  const handleView = (row) => {
    // Display user details in SweetAlert modal
    Swal.fire({
      title: 'User Details',
      html: `
        <div class="details-container">
          <div class="details-row">
            <div class="details-field">
              <IoMdPerson/> 
              ${row.name}
            </div>  
            <div class="details-field">
              ${row.phone}
            </div>
          </div>
          <div class="details-row">
            <div class="details-field">
              ${row.email}
            </div>  
            <div class="details-field">
              ${row.date}
            </div>
          </div>
          <div class="details-row">
            <div class="details-field">
              ${row.address}
            </div>
          </div>
          <div class="details-row">
            <div class="details-field">
              <textarea class="work-description" readonly>${row.work}</textarea>
            </div>
          </div>
        </div>
      `,
      confirmButtonText: 'Close',
      confirmButtonColor: '#F04800',
      customClass: {
        container: 'details-modal-container',
        popup: 'details-modal-popup',
        content: 'details-modal-content',
        width: '550px'
      }
    });
    
  };

  const getWorkers = async () => {
    const querySnapshot = await getDocs(collection(db, 'UserDetail_Wk_DB'));
    const workers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(workers);
    setWorkers(workers);
    setFilter(workers);
  };

  useEffect(() => {
    getWorkers();
  }, []);

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Date Submitted',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <MdArrowOutward className='mr-5 hover:cursor-pointer text-lg hover:text-blue-600' onClick={() => handleView(row)} />
          <MdDelete onClick={() => handleDelete(row.id)} className='hover:cursor-pointer hover:text-red-600' />
        </>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#F04800',
        color: 'white',
        fontSize: '1.1rem',
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
      },
    },
    rows: {
      style: {
        backgroundColor: '#fff6f2',
        fontSize: '0.9rem',
      },
    },
  };

  return (
    <>
      <DataTable
        className='m-3 p-3'
        columns={columns}
        data={filter}
        pagination
        fixedHeader
        selectableRowsHighlight
        fixedHeaderScrollHeight='400px'
        highlightOnHover
        customStyles={customStyles}
      />
    </>
  );
}

export default UserTable;
