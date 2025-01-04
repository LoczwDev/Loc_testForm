import React, { useEffect, useState } from "react";
import { Banner } from "./BannerTable";
import toast from "react-hot-toast";

interface BannerFormProps {
  banners: Banner[];
  onSubmit: (data: Banner) => void;
  initialData?: Banner | null;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const BannerForm: React.FC<BannerFormProps> = ({
  banners,
  onSubmit,
  initialData,
  setOpenForm,
}) => {
  const generateUniqueId = () => {
    const generateId = () => Math.floor(Math.random() * 1000000);
    let newId = generateId();

    while (banners.some((banner) => banner.id === newId)) {
      newId = generateId();
    }

    return newId;
  };

  const [formData, setFormData] = useState<Banner>({
    id: initialData ? initialData.id : generateUniqueId(),
    group: "",
    name: "",
    link: "",
    order: 0,
    text1: "",
    text2: "",
    text3: "",
    image: {
      url: "",
      file_name: "",
    },
    status: "active",
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: {
            url: reader.result as string,
            file_name: file.name,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: {
        url: "",
        file_name: "",
      },
    }));

    toast.success("Success");
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.group) errors.group = "Banner group is required.";
    if (!formData.name.trim()) errors.name = "Banner name is required.";
    if (!formData.link.trim()) errors.link = "Banner link is required.";
    if (formData.order < 1) errors.order = "Order min 1.";
    if (!formData.text1.trim()) errors.text1 = "Text 1 is required.";
    if (!formData.text2.trim()) errors.text2 = "Text 2 is required.";
    if (!formData.text3.trim()) errors.text3 = "Text 3 is required.";
    if (!formData.image.url) errors.image = "Banner image is required.";

    setValidationErrors(errors);

    // If no errors, return true.
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setOpenForm(false);
      toast.success("Success"); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 w-full">
      <table className="w-full table-auto border-separate border-spacing-0">
        <tbody>
          <tr>
            <td className="px-10 border-[2px] border-gray-400 text-center text-nowrap bg-gray-200 !w-max">
              Banner Group
            </td>
            <td className="p-2 border-[2px] border-gray-400 w-full">
              <select
                name="group"
                value={formData.group}
                onChange={handleInputChange}
                className="w-1/3 px-4 border-[3px] border-gray-200"
              >
                <option value="">Select Group</option>
                <option value="Group 1">Group 1</option>
                <option value="Group 2">Group 2</option>
              </select>
              {validationErrors.group && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.group}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td className="px-4 border-[2px] border-gray-400 text-center bg-gray-200">
              Banner Name
            </td>
            <td className="p-2 border-[2px] border-gray-400">
              <input
                type="text"
                name="name"
                placeholder="Enter banner name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-1/2 px-4 border-[3px] border-gray-200"
              />
              {validationErrors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.name}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td className="px-4 border-[2px] border-gray-400 text-center bg-gray-200">
              Link
            </td>
            <td className="p-2 border-[2px] border-gray-400">
              <input
                type="text"
                name="link"
                placeholder="Enter link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-1/2 px-4 border-[3px] border-gray-200"
              />
              {validationErrors.link && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.link}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td className="px-4 border-[2px] border-gray-400 text-center bg-gray-200">
              Order
            </td>
            <td className="p-2 border-[2px] border-gray-400">
              <div className="w-1/2 flex items-center gap-3">
                <input
                  type="number"
                  name="order"
                  placeholder="Enter order"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="px-4 border-[3px] border-gray-200"
                />
                <div>*The higher the number, the earlier it is printed.</div>
              </div>

              {validationErrors.order && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.order}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td className="px-4 border-[2px] border-gray-400 text-center bg-gray-200">
              Text 1
            </td>
            <td className="p-2 border-[2px] border-gray-400">
              <input
                type="text"
                name="text1"
                placeholder="Enter text1"
                value={formData.text1}
                onChange={handleInputChange}
                className="w-1/2 px-4 border-[3px] border-gray-200"
              />
              {validationErrors.text1 && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.text1}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td className="px-4 border-[2px] border-gray-400 text-center bg-gray-200">
              Text 2
            </td>
            <td className="p-2 border-[2px] border-gray-400">
              <input
                type="text"
                name="text2"
                placeholder="Enter text2"
                value={formData.text2}
                onChange={handleInputChange}
                className="w-1/2 px-4 border-[3px] border-gray-200"
              />
              {validationErrors.text2 && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.text2}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td className="px-4 border-[2px] border-gray-400 text-center bg-gray-200">
              Text 3
            </td>
            <td className="p-2 border-[2px] border-gray-400">
              <input
                type="text"
                name="text3"
                value={formData.text3}
                placeholder="Enter text3"
                onChange={handleInputChange}
                className="w-1/2 px-4 border-[3px] border-gray-200"
              />
              {validationErrors.text3 && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.text3}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              className="!w-full px-4 py-2 border-[2px] border-gray-400 text-center bg-gray-200 font-bold"
            >
              More information
            </td>
          </tr>
          <tr>
            <td className="px-4 border-[2px] border-gray-400 text-center bg-gray-200">
              Image
            </td>
            <td className="p-2 border-[2px] border-gray-400">
              {formData.image?.url && (
                <div className="flex items-center line-clamp-1 gap-5 py-4 w-1/2">
                  <p>{formData?.image?.file_name}</p>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="py-1.5 px-3 leading-5 bg-red-500/50 hover:bg-red-500 text-white duration-300"
                  >
                    Remove Image
                  </button>
                </div>
              )}
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-1/2 px-4 border-[3px] border-gray-200"
              />
              {validationErrors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.image}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <td className="px-4 border-[2px] border-gray-400 text-center bg-gray-200">
              Status
            </td>
            <td className="p-2 border-[2px] border-gray-400">
              <div className="flex items-center gap-5">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="active"
                    name="status"
                    value="active"
                    className="hidden"
                    checked={formData.status === "active"}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="active"
                    className="flex items-center cursor-pointer"
                  >
                    <span className="w-6 h-6 inline-block mr-2 rounded-full border-[3px] border-blue-800 flex-no-shrink"></span>
                    Active
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="inactive"
                    name="status"
                    value="inactive"
                    className="hidden"
                    checked={formData.status === "inactive"}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="inactive"
                    className="flex items-center cursor-pointer"
                  >
                    <span className="w-6 h-6 inline-block mr-2 rounded-full border-[3px] border-blue-800 flex-no-shrink"></span>
                    Inactive
                  </label>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-full flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setOpenForm(false)}
          className="bg-transparent border-2 border-black text-black px-4 py-1.5 mt-4"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-black border-2 border-black text-white px-4 py-1.5 mt-4"
        >
          {initialData?.id ? "Edit" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default BannerForm;
