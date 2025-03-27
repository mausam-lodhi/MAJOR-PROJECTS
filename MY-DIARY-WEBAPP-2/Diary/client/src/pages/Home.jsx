import { useState, useEffect } from 'react';
import API from '../utils/api';

const Home = () => {
  const [stats, setStats] = useState({ userCount: 0, entryCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get('/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">Welcome to Your Personal Diary</h1>
        <p className="lead">A safe space to record your thoughts and memories.</p>
        
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text display-6">{stats.userCount}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Entries</h5>
                <p className="card-text display-6">{stats.entryCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;