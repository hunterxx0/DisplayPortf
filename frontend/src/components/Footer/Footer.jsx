import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import logo from '../../assets/logo.svg';

const Footer = () => {
  return (
    <>
      <div className="py-4"></div>
      <div
        className="w-full shadow-sm shadow-gray-800"
        style={{ backgroundColor: '#231f20' }}
      >
        <div className="mx-auto flex w-full max-w-7xl text-orange-200">
          <div className="flex w-full flex-col-reverse justify-around gap-4 p-4  md:flex-row md:gap-8">
            <div className="flex items-center justify-center gap-2 p-4 font-cairo">
              <Link className="hover:rotate-180 hover:animate-spin" to="/">
                <img
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  src={logo}
                  alt="logo"
                />
              </Link>
              <span className="text-sm ">
                {moment().year()} Display, inc. &copy;
              </span>
            </div>
            <div className=" font-cairo">
              <h2 className="text-md hidden text-center text-orange-300 sm:block md:text-left md:text-lg">
                Categories
              </h2>
              <div className="flex flex-row items-center justify-center gap-4 p-2 sm:items-start md:flex-col md:gap-0">
                <Link className="hover:opacity-75" to={'/category/electronics'}>
                  Electronics
                </Link>
                <Link className="hover:opacity-75" to={'/category/sport'}>
                  Sports
                </Link>
                <Link className="hover:opacity-75" to={'/category/fashion'}>
                  Fashion
                </Link>
                <Link className="hover:opacity-75" to={'/category/art'}>
                  Art
                </Link>
                <Link className="hover:opacity-75" to={'/category/books'}>
                  Books
                </Link>
              </div>
            </div>
            <div className="font-cairo">
              <h2 className="text-md hidden whitespace-nowrap text-center  text-orange-300 sm:block md:text-left md:text-lg">
                Stay connected
              </h2>
              <div className="flex flex-row flex-wrap items-center justify-center gap-2 p-2 md:flex-col">
                <SocialIcon
                  className="w-7 cursor-pointer hover:opacity-80"
                  style={{ width: '1.8rem', height: '1.8rem' }}
                  network="facebook"
                  fgColor="white"
                />

                <SocialIcon
                  className="w-7 cursor-pointer hover:opacity-80"
                  style={{ width: '1.8rem', height: '1.8rem' }}
                  network="twitter"
                  fgColor="white"
                />

                <SocialIcon
                  className="w-7 cursor-pointer hover:opacity-80"
                  style={{ width: '1.8rem', height: '1.8rem' }}
                  network="instagram"
                  fgColor="white"
                />

                <SocialIcon
                  className="w-7 cursor-pointer hover:opacity-80"
                  style={{ width: '1.8rem', height: '1.8rem' }}
                  network="telegram"
                  fgColor="white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
