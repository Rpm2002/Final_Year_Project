import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import ExpertCard from '../Components/ExpertCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Context'

function ExpertSearch() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workerInfoRef = collection(db, 'WorkerInfo');
        const snapshot = await getDocs(workerInfoRef);
        const workerData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWorkers(workerData);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <div>
      <Header />
      <div className='flex flex-wrap'>
        {workers.map(worker => (
          <Link to={`/expertdetail/${worker.id}`} key={worker.id}>
            <ExpertCard firstName={worker.firstName} lastName={worker.lastName} profession={worker.profession} imgUrl={worker.imgUrl} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ExpertSearch;
