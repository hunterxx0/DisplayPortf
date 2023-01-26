import { faClose, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../contexts/user-context';
import DeleteAccount from '../Profile/DeleteAccount';

const initialState = {
  name: '',
  email: '',
  phone_number: '',
  website: '',
};
const initialStateEditable = {
  name: false,
  email: false,
  phone_number: false,
  website: false,
};

const SellerAbout = () => {
  const [{ phone_number, name, email, website }] = useOutletContext();

  const [about, setAbout] = useState({
    original: initialState,
    edited: initialState,
  });
  const [isEditable, setIsEditable] = useState(initialStateEditable);
  const { user, logout } = useAuth();

  const handleClick = (fieldToEdit) => {
    setIsEditable((prev) => {
      if (prev[fieldToEdit]) {
        return { ...prev, [fieldToEdit]: false };
      }

      return { ...prev, [fieldToEdit]: true };
    });
  };

  useEffect(() => {
    const sellerInfos = { phone_number, name, email, website };
    setAbout({ original: sellerInfos, edited: sellerInfos });
  }, [phone_number, name, email, website]);

  return (
    <div>
      <div className="mb-1 flex justify-end  gap-x-6 rounded-md p-4 font-cairo text-sm uppercase text-black shadow-sm shadow-black">
        {Object.keys(about.original).find(
          (key) => about.original[key] !== about.edited[key]
        ) ? (
          <button
            className="rounded-md bg-gray-500 px-2"
            onClick={() =>
              setAbout((prev) => ({ ...prev, edited: prev.original }))
            }
          >
            reset
          </button>
        ) : null}
        {Object.values(isEditable).some((value) => value) ? (
          <button
            className="rounded-md bg-gray-500 px-2"
            onClick={() => setIsEditable(initialStateEditable)}
          >
            close
          </button>
        ) : null}
        {Object.keys(about.original).find(
          (key) => about.original[key] !== about.edited[key]
        ) ? (
          <button className="rounded-md bg-gray-500 px-2">save </button>
        ) : null}
      </div>
      <div
        className="flex h-full w-full max-w-7xl  justify-center bg-transparent p-4 shadow-sm shadow-black"
        style={{ backgroundColor: '#231f20' }}
      >
        <div className="mx-auto flex h-full w-full flex-col items-center p-8">
          <div className="grid gap-12 p-4 text-3xl font-black text-gray-300 backdrop-blur-sm md:grid-cols-2 lg:grid-cols-3 lg:text-2xl">
            {Object.keys(about?.edited).map((key) => (
              <div className="flex font-cairo" key={key}>
                <div>
                  <div className="p-2 uppercase">{key}:</div>
                  {key !== 'website' ? (
                    !isEditable[key] ? (
                      <div className="p-2 capitalize text-orange-100">
                        {about?.edited?.[key]}
                      </div>
                    ) : (
                      <input
                        className="w-full rounded-md bg-orange-300 font-cairo text-black shadow-sm shadow-black  placeholder:font-cairo"
                        value={about.edited[key]}
                        autoFocus
                        onChange={(e) =>
                          setAbout((prev) => ({
                            ...prev,
                            edited: { ...prev.edited, [key]: e.target.value },
                          }))
                        }
                      />
                    )
                  ) : !isEditable[key] ? (
                    <a
                      className="p-2 text-orange-100 transition hover:text-orange-600"
                      href={`https://${about?.edited?.website}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {about?.edited?.website}
                    </a>
                  ) : (
                    <input
                      className="w-full rounded-md bg-orange-300 font-cairo text-black shadow-sm shadow-black  placeholder:font-cairo"
                      value={about.edited[key]}
                      autoFocus
                      onChange={(e) =>
                        setAbout((prev) => ({
                          ...prev,
                          edited: { ...prev.edited, [key]: e.target.value },
                        }))
                      }
                    />
                  )}
                </div>
                {user?.me?.role === 'seller' ? (
                  <button
                    className="m-auto h-8 bg-transparent px-1 shadow-sm shadow-black"
                    onClick={() => handleClick(key)}
                  >
                    {isEditable[key] ? (
                      <FontAwesomeIcon
                        icon={faClose}
                        size="sm"
                        color="orange"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="sm"
                        color="orange"
                      />
                    )}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      <DeleteAccount role="seller" name={name} />
    </div>
  );
};

export default SellerAbout;
