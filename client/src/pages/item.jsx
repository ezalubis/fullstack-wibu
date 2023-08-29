import { useEffect } from "react";
import { useState } from "react";
import {
  Navigate,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { api } from "../utils.js";
import PaymentForm from "./PaymentForm.jsx";

export default function Item() {
  const [comments, setComments] = useState([]);
  const [komen, setKomen] = useState([]);
  const [newKomen, setNewKomen] = useState({});
  const navigate = useNavigate();
  const [item, setItem] = useState();
  const { id } = useParams();
  useEffect(() => {
    api(`/items/${id}`).then((item) => setItem(item));
  }, [id, navigate]);
  useEffect(() => {
    api("/komen/get").then((data) => setComments(data));
  }, [newKomen, navigate]);
  const account = useOutletContext()[0];
  if (account) {
    return (
      <main>
        {item ? (
          <>
            <h1 className="text-4xl font-bold ml-80 ">
              EP-BRAND THE BEST BRAND IN ASIA
            </h1>
            <div className="flex items-center justify-between mt-10">
              <div className="flex gap-10">
                <div className="wrapper bg-gray-400 antialiased text-gray-900">
                  <div>
                    <img
                      src={item.img}
                      alt=" random imgee"
                      className="w-full object-cover object-center h-96 rounded-lg shadow-md"
                    />
                    <div className="relative px-4 -mt-16  ">
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex items-baseline">
                          <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                            New
                          </span>
                          <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                            {item.store_name}
                          </div>
                        </div>
                        <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                          {item.name}
                        </h4>

                        <div className="mt-1">
                          {item.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                          <span className="text-gray-600 text-sm"> /pcs</span>
                        </div>
                        <div className="mt-4">
                          <span className="text-teal-600 text-md font-semibold">
                            {item.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                  <h1 className="text-xl font-semibold mb-4">
                    Leave a Comment
                  </h1>
                  <form
                    onSubmit={async () => {
                      alert(
                        "store name and product name must be the same as this store name and this product name"
                      );
                      setNewKomen({});
                      const message = await api("/komen", "POST", newKomen);
                      const komen = await api("/komen");
                      setKomen(komen);
                      alert(message);
                    }}
                  >
                    <div className="mb-4">
                      <label className="block mb-1">Username</label>
                      <input
                        type="text"
                        placeholder="Username Anda"
                        value={newKomen.pengirim ?? ""}
                        onChange={(e) =>
                          setNewKomen({ ...newKomen, pengirim: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">Store Name</label>
                      <input
                        type="text"
                        placeholder={item.store_name}
                        value={newKomen.store_name ?? ""}
                        onChange={(e) =>
                          setNewKomen({
                            ...newKomen,
                            store_name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">Product</label>
                      <input
                        type="text"
                        placeholder={item.name}
                        value={newKomen.produk ?? ""}
                        onChange={(e) =>
                          setNewKomen({ ...newKomen, produk: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1">Comment</label>
                      <textarea
                        value={newKomen.komen ?? ""}
                        onChange={(e) =>
                          setNewKomen({
                            ...newKomen,
                            komen: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <button type="submit">Send</button>
                  </form>
                </div>
                <div>
                  <PaymentForm />
                </div>
              </div>

              <div className="max-w-md mx-auto p-4 mr-32">
                <h1 className="text-xl font-semibold mb-4">Comments</h1>
                <ul>
                  {comments.map((comment) => (
                    <li key={comment.id} className="border-b py-2">
                      <p className="font-semibold">
                        {comment.pengirim} <button>(EDIT)</button>{" "}
                        <button
                          onClick={async () => {
                            if (
                              confirm(
                                `Apakah Anda yakin ingin menghapus komen dari ${comment.pengirim}?`
                              )
                            ) {
                              const message = await fetch(
                                `http://localhost:3000/api/del/komen/${comment.id}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                }
                              );
                              const komens = await api("/komen");
                              setComments(komens);
                              alert(message);
                            }
                          }}
                        >
                          (DELETE)
                        </button>
                      </p>
                      <p className="text-gray-500">{comment.komen}</p>
                      <p className="text-sm text-gray-400">
                        {comment.store_name} <br />
                        {comment.created_at}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          "Loading..."
        )}
      </main>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
