import { useEffect } from "react";
import { useState } from "react";
import { BiSolidCartAdd } from "react-icons/bi";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
  // useParams,
} from "react-router-dom";
import { api } from "../utils.js";
// import { api } from "../utils";
//
export default function Home() {
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    price: "",
    description: "",
    store_name: "",
    rating: "",
  });

  // const { id } = useParams();
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const [idSequence, setIdSequence] = useState(product.length);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const account = useOutletContext()[0];

  useEffect(() => {
    api("/items").then((items) => setItems(items));
  }, [account, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    storeName: "",
    rating: "",
    image: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataEdit((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((data) => ({
      ...data,
      image: e.target.files[0],
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("name", formDataEdit.name);
    updatedData.append("price", formDataEdit.price);
    updatedData.append("description", formDataEdit.description);
    updatedData.append("store_name", formDataEdit.store_name);
    updatedData.append("rating", formDataEdit.rating);
    if (file) {
      updatedData.append("img", file);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/items/9`, {
        method: "PUT",
        body: updatedData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ganti dengan token autentikasi Anda
        },
      });

      if (response.status === 200) {
        console.log("Update successful");
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleSubmit = async () => {
    // e.preventDefault();
    const { name, price, description, storeName, rating, image } = formData;

    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("store_name", storeName);
    data.append("rating", rating);
    data.append("img", image);

    try {
      const response = await fetch("http://localhost:3000/api/items/upload", {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        alert("Item added successfully");
        const responseData = await response.json();
        navigate("/");
        console.log(responseData.message);
      } else {
        console.log("Gagal mengunggah data");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleShowFormEdit = () => {
    setShowFormEdit(true);
  };
  if (account) {
    const filterPrd = items
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] < b[sortBy] ? -1 : 1;
        } else {
          return a[sortBy] > b[sortBy] ? -1 : 1;
        }
      })
      .filter(
        (items) =>
          items.name.toLowerCase().includes(keyword) &&
          items.price >= minPrice &&
          items.price <= maxPrice
      );
    return (
      <>
        <div className="flex gap-10">
          <header className="flex items-center justify-between bg-rose-200 rounded-2xl gap-6 px-5 py-1">
            <label className="flex flex-col gap-2 text-sm">
              Cari:
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </label>
            <section>
              Harga:
              <label className="flex flex-col gap-2 text-sm">
                Minimal:
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Maksimal:
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value || Infinity)}
                />
              </label>
            </section>
            <section>
              Urutkan:
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="id">Normal</option>
                <option value="name">Nama</option>
                <option value="price">Harga</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Naik</option>
                <option value="desc">Turun</option>
              </select>
            </section>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex justify-center items-center w-10 h-10 bg-pink-200 rounded-2xl"
            >
              shopp
              {cart.reduce((a, p) => a + p.count, 0)}
            </button>
          </header>

          {isCartOpen && (
            <div className="absolute bg-gray-100 flex flex-col gap-5 p-2 rounded-2xl top-1 right-40 min-w-[150px]">
              <button onClick={() => setIsCartOpen(false)}>
                <div className="flex justify-center items-center w-10 h-10 bg-pink-200 rounded-2xl">
                  Close
                </div>
              </button>
              <h1>Keranjang</h1>
              <table className="table-fixed">
                <thead>
                  <tr>
                    <th> ID </th>
                    <th> Nama </th>
                    <th> Jumlah </th>
                    <th> Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((items) => (
                    <tr key={items.id} className="table-fixed">
                      <td>{items.id}</td>
                      <td>{items.name}</td>
                      <td>{items.count.toLocaleString()}</td>
                      <td className="flex flex-row gap-3 m">
                        <button
                          onClick={() => {
                            if (items.count > 1) {
                              setCart(
                                cart.map((p) =>
                                  p.id === items.id
                                    ? { ...p, count: p.count - 1 }
                                    : p
                                )
                              );
                            } else {
                              setCart(cart.filter((p) => p.id !== items.id));
                            }
                          }}
                          title="Kurangi"
                        >
                          Hapus
                        </button>
                        <button
                          onClick={() => {
                            setCart(
                              cart.map((p) =>
                                p.id === items.id
                                  ? { ...p, count: p.count + 1 }
                                  : p
                              )
                            );
                          }}
                          title="Tambah"
                        >
                          Tambah
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                Total bayar:{" "}
                {cart
                  .reduce((a, p) => a + p.price * p.count, 0)
                  .toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  })}
              </div>
            </div>
          )}
          <button onClick={handleShowForm}>add</button>
          <button onClick={handleShowFormEdit}>edit</button>
        </div>
        <div className="flex gap-[30px] mt-[20px] flex-wrap">
          {filterPrd.length > 0
            ? filterPrd.map((item) => (
                <>
                  <div key={item.id} className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className="flip-card-back">
                        <div className="card-content">
                          <h2>{item.name}</h2>
                          <h2>
                            {item.price.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            })}
                          </h2>
                          <p>{item.description}</p>
                          <Link to={`/items/${item.id}`}>
                            <button className="bg-blue-600 text-black rounded-lg">
                              Buy Now
                            </button>
                          </Link>
                          <button
                            title="Tambahkan ke keranjang"
                            onClick={() => {
                              if (cart.find((p) => p.id === item.id)) {
                                setCart(
                                  cart.map((p) =>
                                    p.id === item.id
                                      ? {
                                          ...p,
                                          count: p.count + 1,
                                        }
                                      : p
                                  )
                                );
                              } else {
                                setCart([...cart, { ...item, count: 1 }]);
                              }
                            }}
                          >
                            <div className="flex w-10 h-10 rounded-2xl bg-pink-400 justify-center items-center text-primary drop-shadow-xl">
                              <BiSolidCartAdd size={25} className="text-3xl" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            : "Tidak Ditemukan"}
        </div>
        {showForm && (
          <>
            <form onSubmit={handleSubmit} className="dialog">
              <h1>Upload Form</h1>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Store Name:</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Rating:</label>
                <input
                  type="text"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex gap-10">
                <button type="submit">Upload</button>
                <button onClick={() => setShowForm(false)}>Close</button>
              </div>
            </form>
          </>
        )}
        {showFormEdit && (
          <form onSubmit={handleSubmitEdit} className="dialog">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formDataEdit.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={formDataEdit.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={formDataEdit.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Store Name:</label>
              <input
                type="text"
                name="store_name"
                value={formDataEdit.store_name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Rating:</label>
              <input
                type="text"
                name="rating"
                value={formDataEdit.rating}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Image:</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="flex gap-10">
              <button type="submit">Update</button>
              <button onClick={() => setShowFormEdit(false)}>Close</button>
            </div>
          </form>
        )}
        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpload();
            // if (file) {
            //   const formData = new FormData();
            //   formData.append("img", file);
            //   const response = await fetch(
            //     "http://localhost:3000/api/items/upload2",
            //     {
            //       method: "POST",
            //       // headers: {
            //       //   Authorization: `Bearer ${localStorage.getItem("token")}`,
            //       // },
            //       body: formData,
            //     }
            //   );
            //   const data = await response.json();
            //   console.log(data);
            // }
            // const formData = new FormData();
            // // formData.append("name", newItems.name),
            // //   formData.append("price", newItems.price),
            // //   formData.append("store_name", newItems.store_name),
            // formData.append("img", newItems.img);
            // // formData.append("description", newItems.description);
            // const response = await fetch(
            //   "http://localhost:3000/api/items/upload2",
            //   {
            //     method: "POST",
            //     body: formData,
            //   }
            // );
            // await response.json();
            // const itemsResponse = await fetch(
            //   "http://localhost:3000/api/items"
            // );
            // const itemsData = await itemsResponse.json();
            // setItems(itemsData);
            // setNewItems({
            //   name: "",
            //   price: "",
            //   store_name: "",
            //   img: null,
            //   description: "",
            // });
          }}
        >
          {/* <label>
            Name Item:
            <input
              type="text"
              name="name"
              value={newItems.name}
              onChange={(e) =>
                setNewItems({ ...newItems, name: e.target.value })
              }
              required
            />
          </label>
          <label>
            Price Item:
            <input
              type="text"
              name="price"
              value={newItems.price}
              onChange={(e) =>
                setNewItems({ ...newItems, price: e.target.value })
              }
              required
            />
          </label>
          <label>
            store name:
            <input
              type="text"
              name="store_name"
              value={newItems.store_name}
              onChange={(e) =>
                setNewItems({ ...newItems, store_name: e.target.value })
              }
            />
          </label> */}
        {/* <label>
          Foto:
          <input type="file" name="img" onChange={handleFileChange} />
        </label> */}
        {/* <label>
            Description:
            <textarea
              type="text"
              name="description"
              value={newItems.description}
              onChange={(e) =>
                setNewItems({ ...newItems, description: e.target.value })
              }
            />
          </label> */}
        {/* <button type="submit">Submit</button>
        </form> */}
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
