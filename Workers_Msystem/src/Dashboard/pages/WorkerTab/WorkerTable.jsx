import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { db } from '../../../Firebase/Context';
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

function WorkerTable({ showSearchBar = true }) {
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getWorkers();
  }, []);

  useEffect(() => {
    const result = workers.filter((item) => {
      return (item.firstName + item.lastName).toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.profession.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(result);
  }, [search, workers]);

  const handleDelete = (id) => {
    const workerToDelete = workers.find((worker) => worker.id === id);

    Swal.fire({
      icon: 'warning',
      title: `Are you sure you want to delete the team ${workerToDelete.firstName} ${workerToDelete.lastName}?`,
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      cancelButtonColor: '#FFE2D8',
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#F04800'
    }).then((result) => {
      if (result.value) {
        const [worker] = workers.filter((worker) => worker.id === id);

        deleteDoc(doc(db, 'WorkerInfo', id));

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

  const getWorkers = async () => {
    const querySnapshot = await getDocs(collection(db, 'WorkerInfo'));
    const workers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setWorkers(workers);
    setFilter(workers);
  };

  useEffect(() => {
    getWorkers();
  }, []);

  const columns = [
    {
      name: 'Name',
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: 'Profession',
      selector: (row) => row.profession,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      wrap: true, 
      maxWidth: '200px', 
    },
    {
      name: 'Location',
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <MdDelete onClick={() => handleDelete(row.id)} className='hover:cursor-pointer hover:text-red-600' />
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

export default WorkerTable;
