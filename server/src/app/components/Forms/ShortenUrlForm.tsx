import React, { useState } from "react";
import { toast } from "react-toastify";
import { useShortenUrlMutation, useGetUrlTypesQuery, useGetUrlTagsQuery } from "@/app/store/slices/urlSlice/urlApiSlice";
import InputField from "../coreComponents/InputField";
import DateField from "../coreComponents/DateField";
import SelectField from "../coreComponents/SelectField";
import DataList from "../coreComponents/DataList";
import errorHandler from "@/app/Error/errorHandler";
import { GenerateUrlFormState as FormState } from "@/app/types/url";
import { validateGenerateUrlForm } from "@/app/validations/urlFormValidation";

const MyForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    original_url: "",
    url_type: "",
    expiration_date: "",
    tag_name: ""
  });

  const { data: urlTypes = [], isLoading: urlTypesLoading } = useGetUrlTypesQuery();
  const { data: urlTags = [], isLoading: urlTagsLoading } = useGetUrlTagsQuery();
  
  const [shortenUrl] = useShortenUrlMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const validFormData = validateGenerateUrlForm(formState);
      await shortenUrl(validFormData).unwrap();
      toast.success('Short URL generated successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  if (urlTypesLoading || urlTagsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
      <InputField
        id="original_url"
        label="Original URL"
        value={formState.original_url}
        onChange={handleChange}
        placeholder="Enter URL"
      />

      <DataList
        id="tag_name"
        label="Add a Tag"
        value={formState.tag_name ?? ''}
        onChange={handleChange}
        options={urlTags.map(tag => tag.tag_name)}
        placeholder="Tag e.g. #store"
      />

      <DateField
        id="expiration_date"
        label="Expiry Date"
        value={formState.expiration_date}
        onChange={handleChange}
      />

      <SelectField
        id="url_type"
        label="Type"
        value={formState.url_type}
        onChange={handleChange}
        options={urlTypes.map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }))}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Generate Short URL
      </button>
    </form>
  );
};

export default MyForm;
