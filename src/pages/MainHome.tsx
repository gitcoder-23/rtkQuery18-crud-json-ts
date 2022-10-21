import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './MainHome.css';

import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from '../services/contactsApi';
import { IContact } from '../models/contactModel';
import { useEffect } from 'react';

const MainHome = () => {
  const { error, isError, isLoading, data, isFetching, isSuccess } =
    useFetchContactsQuery();

  const [deleteContact] = useDeleteContactMutation();

  // console.log('data=>', data);

  const handleDelete = async (id: any) => {
    if (window.confirm('Are you sure that you wanted to delete that user ?')) {
      await deleteContact(id);
      toast.success('Contact Deleted Successfully');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error('Somethiung went wrong!');
    }

    return () => {};
  }, [error]);

  return (
    <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h2 style={{ textAlign: 'center' }}>
        Redux Toolkit RTK Query CRUD with React and JSON Server{' '}
      </h2>
      <Link to="/add">
        <button className="btn btn-add">Add Contact</button>
      </Link>
      <br />
      <br />
      {!data && isError ? (
        <h3>No data found!</h3>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>ID</th>
              <th style={{ textAlign: 'center' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Email</th>
              <th style={{ textAlign: 'center' }}>Contact</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item: IContact, index: any) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>
                      <Link to={`/update/${item.id}`}>
                        <button className="btn btn-edit">Edit</button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                      <Link to={`/view/${item.id}`}>
                        <button className="btn btn-view">View</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MainHome;
