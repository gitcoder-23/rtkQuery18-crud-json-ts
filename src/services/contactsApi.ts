import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { rootApiUrl } from '../constants';
import { IContact } from '../models/contactModel';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${rootApiUrl}` }),
  // Auto refetch after adding data in list
  // tagTypes: ['Post', 'User'],
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    // for ADD-UPDATE-DELETE use-> metation
    // to fetch data use-> query

    // GET
    fetchContacts: builder.query<IContact[] | any, void>({
      query: () => '/contacts', //rest api url
      // Auto refetch after adding data in list
      providesTags: ['Contact'],
      // providesTags: (result) => {
      //   console.log('providesTags', result);

      //   return ['Contact'];
      // },
    }),

    // Single Contact
    singleContact: builder.query<IContact, string>({
      query: (id) => `/contacts/${id}`,
      // Auto refetch after adding data in list
      providesTags: ['Contact'],
    }),

    // ADD
    addContact: builder.mutation<{}, IContact>({
      query: (contact) => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      // Auto refetch after adding data in list
      invalidatesTags: ['Contact'],
    }),

    updateContact: builder.mutation<void, IContact>({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: 'PUT',
        body: rest,
      }),
      // Auto refetch after adding data in list
      invalidatesTags: ['Contact'],
    }),

    // Delete
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      // Auto refetch after adding data in list
      invalidatesTags: ['Contact'],
    }),
  }),
});

// auto generated hooks after created end point ops
export const {
  useFetchContactsQuery,
  useSingleContactQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;
