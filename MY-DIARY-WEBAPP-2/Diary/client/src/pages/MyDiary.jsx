import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import api from '../utils/api';

const MyDiary = () => {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    date: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await api.get('/entries');
      setEntries(response.data);
    } catch (error) {
      setError('Failed to fetch entries');
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry._id);
    setEditForm({
      title: entry.title,
      description: entry.description,
      date: new Date(entry.date).toISOString().split('T')[0]
    });
  };

  const handleUpdate = async (entryId) => {
    try {
      await api.put(`/entries/${entryId}`, editForm);
      setEditingEntry(null);
      fetchEntries();
    } catch (error) {
      setError('Failed to update entry');
    }
  };

  const handleDelete = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await api.delete(`/entries/${entryId}`);
        setEntries(entries.filter(entry => entry._id !== entryId));
      } catch (error) {
        setError('Failed to delete entry');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        <FontAwesomeIcon icon={faBook} className="me-2" />
        My Diary Entries
      </h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {entries.map(entry => (
          <div key={entry._id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                {editingEntry === entry._id ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(entry._id);
                  }}>
                    <div className="mb-3">
                      <input
                        type="date"
                        className="form-control"
                        value={editForm.date}
                        onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={editForm.title}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="4"
                        value={editForm.description}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-success btn-sm me-2">
                        <FontAwesomeIcon icon={faSave} className="me-1" />
                        Save
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingEntry(null)}
                      >
                        <FontAwesomeIcon icon={faTimes} className="me-1" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="card-title">{entry.title}</h5>
                      <div>
                        <button 
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleEdit(entry)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(entry._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {new Date(entry.date).toLocaleDateString()}
                    </h6>
                    <p className="card-text">{entry.description}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDiary;