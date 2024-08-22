import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUrlsQuery, useUpdateUrlMutation, useDeleteUrlMutation } from '../../store/slices/urlSlice/urlApiSlice';
import { setSort, } from '@/app/store/slices/urlSlice/urlSlice';
import { RootState } from '@/app/store/store';
import errorHandler from '@/app/Error/errorHandler';
import { Url } from '@/app/types/url';
import ImageToggle from '@/app/components/coreComponents/ImageToggle';
import { SortIcon, EditIcon, DeleteIcon, CopyIcon } from '../../../../public/icons';
import { formatDate } from '@/app/utils/dateFormat';
import { handleCopyClick } from '@/app/utils/handleCopyClick';
  
const UrlType: { [key: string]: string } = {
  product: 'Product',
  store: 'Store',
  misc: 'Miscellaneous',
};

const UrlTable: React.FC = () => {
  const dispatch = useDispatch();
  const { sortColumn, sortOrder, } = useSelector((state: RootState) => state.urls);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: { urls = [], limit, totalRecords } = {},
    isLoading,
    error,
  } = useGetUrlsQuery({ pregenerated: false, pageNumber });

  const [updateUrl] = useUpdateUrlMutation();
  const [deleteUrl] = useDeleteUrlMutation();
  const [editId, setEditId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<Partial<Url>>({});

  if (error) {
    errorHandler(error);
  }

  const handleSortClick = (column: keyof Url) => {
    dispatch(setSort({ column }));
  };

  const handleEditClick = (urlId: string) => {
    setEditId(urlId);
    const urlToEdit = urls.find((url) => url.url_id === urlId);
    if (urlToEdit) {
      setEditFields({
        original_url: urlToEdit.original_url || '',
        url_type: urlToEdit.url_type || '',
        expiration_date: urlToEdit.expiration_date || '',
        status: urlToEdit.status || 'inactive',
      });
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    if (editId) {
      try {
        await updateUrl({ id: editId, data: editFields }).unwrap();
        toast.success('URL updated successfully!');
        setEditId(null);
        setEditFields({});
      } catch (error) {
        errorHandler(error);
      }
    }
  };

  const handleCancelClick = () => {
    setEditId(null);
    setEditFields({});
  };

  const handleDeleteClick = async (url_id: string) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      try {
        await deleteUrl({ id: url_id }).unwrap();
        toast.success('URL deleted successfully!');
      } catch (error) {
        errorHandler(error);
      }
    }
  };

  const sortedUrls = [...urls].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn] ?? '';
      const bValue = b[sortColumn] ?? '';
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(totalRecords / parseInt(limit as unknown as string));

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="container mx-auto p-4 overflow-x-scroll no-scrollbar border border-gray-200 mt-5 mb-5 rounded-lg shadow-lg">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader handleSortClick={handleSortClick} />
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUrls.map((url) => (
              <tr key={url.url_id}>
                <td className="px-6 py-4 whitespace-nowrap">{url.url_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editId === url.url_id ? (
                    <input
                      type="text"
                      name="original_url"
                      value={editFields.original_url || ''}
                      onChange={handleFieldChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  ) : (
                    url.original_url
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {url.short_url}
                  <button
                    onClick={() => handleCopyClick(url.short_url)}
                    className="ml-2 text-blue-500"
                  >
                    <CopyIcon />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editId === url.url_id ? (
                    <select
                      name="url_type"
                      value={editFields.url_type || ''}
                      onChange={handleFieldChange}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      {Object.keys(UrlType).map((type) => (
                        <option key={type} value={type}>
                          {UrlType[type]}
                        </option>
                      ))}
                    </select>
                  ) : (
                    UrlType[url.url_type]
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {url.url_tag ? (
                    <span className="bg-white-50 shadow-md hover:bg-green-300 hover:shadow-xl hover:cursor-pointer rounded-full px-4 py-2">
                      {url.url_tag?.tag_name}
                    </span>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editId === url.url_id ? (
                    <input
                      type="datetime-local"
                      name="expiration_date"
                      value={editFields.expiration_date || ''}
                      onChange={handleFieldChange}
                      className="border border-gray-300 rounded-md p-2"
                    />
                  ) : (
                    formatDate(url.expiration_date ?? 'N/A')
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editId === url.url_id ? (
                    <select
                      name="status"
                      value={editFields.status || 'inactive'}
                      onChange={handleFieldChange}
                      className="border border-gray-300 rounded-md p-2"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    url.status
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(url.created_at)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(url.updated_at)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editId === url.url_id ? (
                    <>
                      <button onClick={handleSaveClick} className="text-green-500 mr-2">
                        Save
                      </button>
                      <button onClick={handleCancelClick} className="text-red-500">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(url.url_id)}
                        className="text-blue-400 mr-2"
                      >
                        <EditIcon className='h-4, w-4' />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(url.url_id)}
                        className="text-red-500 h-4 w-4"
                      >
                        <DeleteIcon className='h-4 w-4' />
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <ImageToggle short_url={url.short_url} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="inline-flex rounded-md shadow-sm mt-4 " role="group">
        <button
          onClick={handlePrevPage}
          disabled={pageNumber === 1}
          className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-s-lg ${pageNumber === 1 ? 'bg-gray-300' : 'hover:bg-green-600 bg-green-400 text-white'
            }`}
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={pageNumber >= totalPages}
          className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-e-lg ${pageNumber >= totalPages ? 'bg-gray-300' : 'hover:bg-green-600 bg-green-400 text-white'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface TableHeaderProps {
  handleSortClick: (column: keyof Url) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ handleSortClick }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          URL ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Original URL
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Short URL
          <SortIcon onClick={() => handleSortClick('short_url')} />
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          URL Type
          <SortIcon onClick={() => handleSortClick('url_type')} />
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          URL Tag
          <SortIcon onClick={() => handleSortClick('url_tag')} />
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Expiration Date
          <SortIcon onClick={() => handleSortClick('expiration_date')} />
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
          <SortIcon onClick={() => handleSortClick('status')} />
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Created At
          <SortIcon onClick={() => handleSortClick('created_at')} />
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Updated At
          <SortIcon onClick={() => handleSortClick('updated_at')} />
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          QR
        </th>
      </tr>
    </thead>
  );
};

export default UrlTable;
