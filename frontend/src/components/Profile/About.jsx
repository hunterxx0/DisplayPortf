import { faClose, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { editUser } from '../../apis/editUser';
import getFormattedName from '../../Utils/formatFullname';
import LoadingSpinner from '../../Utils/LoadingSpinner';
import ModalOverlay from '../../Utils/ModalOverlay';
import DeleteAccount from './DeleteAccount';

const initialStateEditable = {
  fullname: false,
  Email: false,
  'Phone Number': false,
};

const initialStateFields = {
  Fullname: '',
  Email: '',
  'Phone Number': '',
  'Last seen': '',
};

const About = () => {
  const [isEditable, setIsEditable] = useState(initialStateEditable);
  const context = useOutletContext();
  const user = context?.user;
  const u = context?.u;
  // const logout = context?.logout;
  const isLoading = context?.isLoading;
  const [about, setAbout] = useState({
    original: initialStateFields,
    edited: initialStateFields,
  });

  const handleClick = (fieldToEdit) => {
    setIsEditable((prev) => {
      if (prev[fieldToEdit]) {
        return { ...prev, [fieldToEdit]: false };
      }

      return { ...prev, [fieldToEdit]: true };
    });
  };

  const handleClickSave = () => {
    const changes = {
      fullName: about.edited.Fullname,
      email: about.edited.Email,
      phone_number: about.edited['Phone Number'],
    };
    editUser(changes, user._id).catch(console.error);
  };

  useEffect(() => {
    let abouts = {
      Fullname: getFormattedName(user?.fullName),
      Email: user?.email,
      'Phone Number': user?.phone_number,
    };
    if (Object.keys(u).length)
      abouts = {
        ...abouts,
        'Last seen': moment(u?.me.last_active).fromNow(),
      };

    setAbout({ original: abouts, edited: abouts });
  }, [user, u]);

  if (isLoading)
    return (
      <ModalOverlay>
        <LoadingSpinner />
      </ModalOverlay>
    );
  return (
    <div className="w-full py-4">
      <div className="mb-1 flex justify-end gap-x-6 rounded-md p-4 font-cairo text-sm uppercase text-black shadow-sm shadow-black">
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
          <button
            className="rounded-md bg-gray-500 px-2"
            onClick={handleClickSave}
          >
            save{' '}
          </button>
        ) : null}
      </div>
      {Object.keys(about.edited).map((info, index) => (
        <div
          className="flex w-full justify-center  p-4 text-white shadow-md shadow-black md:max-w-7xl"
          style={{ backgroundColor: '#231f20' }}
          key={index}
        >
          <span className="w-[45vw]text-orange-300 md:w-[20vw]">{info}:</span>
          <div className="flex w-[45vw] gap-x-4 md:w-[20vw]">
            {!isEditable[info] || info === 'Last seen' ? (
              <span>{about.edited[info]}</span>
            ) : (
              <input
                className="w-full rounded-md bg-orange-300 font-cairo text-black shadow-sm shadow-black  placeholder:font-cairo"
                value={about.edited[info]}
                autoFocus
                onChange={(e) =>
                  setAbout((prev) => ({
                    ...prev,
                    edited: { ...prev.edited, [info]: e.target.value },
                  }))
                }
              />
            )}
            {u?.me?.role === 'user' && info !== 'Last seen' ? (
              <button
                className="bg-transparent px-1 shadow-sm shadow-black"
                onClick={() => handleClick(info)}
              >
                {isEditable[info] ? (
                  <FontAwesomeIcon icon={faClose} size="sm" color="orange" />
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
        </div>
      ))}
      <DeleteAccount role="user" dbUser={user} />
    </div>
  );
};

export default About;
