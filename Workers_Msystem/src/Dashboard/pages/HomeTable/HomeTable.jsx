import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { db } from '../../../Firebase/Context';
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { MdEdit, MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { GrUserWorker } from 'react-icons/gr';

function HomeTable({ showSearchBar = true }) { // Add props with default value for showSearchBar
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  // Search Functionality
  useEffect(() => {
    getWorkers();
  }, []);

  useEffect(() => {
    const result = workers.filter((item) => {
      return item.name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  }, [search]);

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

        deleteDoc(doc(db, 'EnquiryInfo', id));

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
const handleEdit = (id) => {
  const workerToEdit = workers.find((worker) => worker.id === id);
  const { name, email, phone, enquiryDate, address, workDescription, teamlist } = workerToEdit;

  const teams = teamlist.split(',');

  Swal.fire({
    title: `Details of ${name}`,
    html: `
      <div style="display: flex;">
        <div>
          <div style="flex;flex-direction:row;">
            <label for="name">Name :</label>
            <input id="name" class="swal2-input" value="${name}" disabled>
          </div>

          <div>
            <label for="Mobile">Mobile :</label>
            <input id="phone" class="swal2-input" value="${phone}" disabled>
          </div>

          <div  style="margin-bottom:20px;">
            <label for="enquirydate">Enquiry Date :</label>
            <input id="enquiryDate" class="swal2-input" value="${enquiryDate}" disabled>
          </div>

          <div style="margin-bottom:20px;">
            <label for="email">Email :</label>
            <textarea id="email" style="height: auto; width: 100%;" class="swal2-input" disabled>${email}   </textarea>
          </div>

          <div style="margin-bottom:20px;">
            <label for="address">Address :</label>
            <textarea id="address" style="height: auto; width: 100%;" class="swal2-input" disabled>${address}</textarea>
          </div>
          
          <div style="margin-bottom:20px;">
            <label for="description">Work-Description :</label>  
            <textarea id="description" style="height: auto; width: 100%;" class="swal2-input" disabled>${workDescription}</textarea>
          </div>
        </div>
        <div style="flex: 1;">
          <h3 style="font-size: 1.2rem;font-weight: bold;margin-bottom: 10px;">Enquired Teams</h3>
          <ul style="margin-bottom: 10px; padding-left: 60px;"> 
            ${teams.map(team => `<li style="list-style-type: decimal;margin-bottom: 10px;">${team.trim()}</li>`).join('')}
          </ul>
        </div>
      </div>`,
    showCancelButton: false,
    confirmButtonText: 'Close',
    confirmButtonColor: '#F04800',
    width: '700px',
    heightAuto: true,
  });
};


  const getWorkers = async () => {
    const querySnapshot = await getDocs(collection(db, 'EnquiryInfo'));
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
      name: 'Phone',
      selector: (row) => row.phone,
    },
    {
      name: 'Date Submitted',
      selector: (row) => row.enquiryDate,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <MdEdit className='mr-5 hover:cursor-pointer hover:text-blue-600' onClick={() => handleEdit(row.id, row)} />
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
      {showSearchBar && (
        <div className='text-end'>
          <input
            type='text'
            className='w-64 p-2 outline-none form-control'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
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

export default HomeTable;
