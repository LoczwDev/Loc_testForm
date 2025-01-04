import React, { useState } from "react";
import BannerForm from "./BannerForm";
import mockBanners from "../../mockBanners.json";
import toast from "react-hot-toast";

export interface Image {
  url: string;
  file_name: string;
}
export interface Banner {
  id: number | null;
  group: string;
  name: string;
  link: string;
  order: number;
  text1: string;
  text2: string;
  text3: string;
  date?: string;
  image: Image;
  status: string;
}

const BannerTable: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [form, setForm] = useState<Banner | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);

  const handleAdd = () => {
    setForm({
      id: null,
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

    setOpenForm(true);
  };

  const handleEdit = (id: number) => {
    const banner = banners.find((b) => b.id === id);
    if (banner) setForm(banner);

    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    toast.success("Success");
  };
  const handleSubmit = (data: Banner) => {
    if (data.id) {
      setBanners((prev) =>
        prev.map((b) => (b.id === data.id ? { ...b, ...data } : b))
      );
    } else {
      setBanners((prev) => [
        ...prev,
        { ...data, id: prev.length + 1, date: new Date().toISOString() },
      ]);
    }
    setForm(null);
  };
  console.log(banners);

  return (
    <div className="p-4">
      {!openForm ? (
        <>
          <div className="w-full flex justify-end pb-2">
            <button
              onClick={handleAdd}
              className="bg-transparent border-2 border-black text-black px-4 py-1.5 mt-4"
            >
              Add Banner
            </button>
          </div>

          {/* Table Section */}
          <table className="table-auto w-full border-separate border-spacing-0 border-[1px]">
            <thead className="bg-black text-[#fff]">
              <tr>
                <th className="px-4 py-1.5 font-normal border-[2px] border-black">
                  STT
                </th>
                <th className="px-2 py-1.5 font-normal border-[2px] border-black">
                  Order
                </th>
                <th className="px-4 py-1.5 font-normal border-[2px] border-black">
                  Name
                </th>
                <th className="px-4 py-1.5 font-normal border-[2px] border-black">
                  Link
                </th>
                <th className="px-4 py-1.5 font-normal border-[2px] border-black">
                  Text
                </th>
                <th className="px-2 py-1.5 font-normal border-[2px] border-black">
                  Date
                </th>
                <th className="px-4 py-1.5 font-normal border-[2px] border-black">
                  Image
                </th>
                <th className="px-4 py-1.5 font-normal border-[2px] border-black">
                  Edit
                </th>
                <th className="px-4 py-1.5 font-normal border-[2px] border-black">
                  Delete
                </th>
              </tr>
            </thead>
            {banners?.length > 0 ? (
              <tbody>
                {banners.map((banner, index) => (
                  <tr
                    key={banner.id}
                    className="hover:bg-gray-50 bg-gray-200 duration-300"
                  >
                    <td className="border-[2px] border-black px-4 py-1.5 text-center">
                      {index + 1}
                    </td>
                    <td className="border-[2px] border-black px-2 py-1.5 text-center">
                      {banner.order.toString().padStart(2, "0")}
                    </td>

                    <td className="border-[2px] border-black px-4 py-1.5 text-center">
                      {banner.name}
                    </td>
                    <td className="border-[2px] border-black px-4 py-1.5 text-center">
                      <a
                        href={banner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline"
                      >
                        {banner.link}
                      </a>
                    </td>
                    <td className="border-[2px] border-black px-4 py-1.5 w-[340px] text-center">
                      {banner.text1}
                      {banner.text2}
                      {banner.text3}
                    </td>
                    <td className="border-[2px] border-black px-0.5 py-1.5 text-center">
                      {banner.date}
                    </td>
                    <td className="border-[2px] border-black px-4 py-1.5">
                      <img
                        src={banner.image?.url}
                        alt={banner.name}
                        className="w-64 h-32 object-cover mx-auto"
                      />
                    </td>
                    <td className="border-[2px] border-black px-4 py-1.5 text-center">
                      <button
                        className="bg-green-500 text-white px-4 py-1.5 rounded"
                        onClick={() => handleEdit(banner.id!)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border-[2px] border-black px-4 py-1.5 text-center">
                      <button
                        className="bg-red-500 text-white px-2 py-1.5 rounded"
                        onClick={() => handleDelete(banner.id!)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="text-center text-red-500 font-bold py-5"
                >
                  No Data
                </td>
              </tr>
            )}
          </table>
        </>
      ) : (
        // Form Section
        <BannerForm
          banners={banners}
          onSubmit={handleSubmit}
          initialData={form}
          setOpenForm={setOpenForm}
        />
      )}
    </div>
  );
};

export default BannerTable;
