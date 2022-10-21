import React, { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import {
  useAddContactMutation,
  useUpdateContactMutation,
  useSingleContactQuery,
} from '../services/contactsApi';
import './AddEditUser.css';

type formFieldType = {
  name: string;
  email: string;
  contact: string;
};

const initialState: formFieldType = {
  name: '',
  email: '',
  contact: '',
};

const AddEditUser = () => {
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const [formValue, setFormValue] = useState<formFieldType>(initialState);
  const [editMode, setEditMode] = useState(false);
  const { name, email, contact } = formValue;
  const navigate = useNavigate();
  const { id } = useParams();

  // FormEvent<HTMLFormElement>

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!name && !email && !contact) {
      toast.error('Please fill all fields!');
    } else {
      if (!editMode) {
        const formData = {
          id: uuidv4(),
          ...formValue,
        };

        console.log('formData->', formData);
        await addContact(formData);
        navigate('/');
        toast.success('Contact Added Successfully');
        navigate('/');
      } else {
        const formData = {
          id: id,
          ...formValue,
        };
        await updateContact(formData);
        navigate('/');
        setEditMode(false);
        toast.success('Contact Updated Successfully');
      }
    }
  };

  const handleInputChange = (e: React.BaseSyntheticEvent) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const { data, error } = useSingleContactQuery(id!);

  useEffect(() => {
    if (id) {
      setEditMode(true);

      // for update
      if (data) {
        setFormValue({ ...data });
      }
    } else {
      setEditMode(false);
      // for update
      setFormValue({ ...initialState });
    }
  }, [id, data]);

  useEffect(() => {
    if (error) {
      toast.error('Somethiung went wrong!');
    }

    return () => {};
  }, [error]);
  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Your Contact No. ..."
          value={contact || ''}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? 'Update' : 'Save'} />
      </form>
    </div>
  );
};

export default AddEditUser;
