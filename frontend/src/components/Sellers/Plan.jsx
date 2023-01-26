import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { upgradePlan } from '../../apis/upgradePlan';

const PLANS = ['basic', 'standard', 'premium'];

const Plan = () => {
  const [seller] = useOutletContext();
  const [selectedPlan, setSelectedPlan] = useState(seller.plan);

  const handleClick = async (plan) => {
    if (!PLANS.includes(plan)) return;

    const upSeller = await upgradePlan(seller.name, plan);
    setSelectedPlan(upSeller.plan);
  };

  const styles = 'transform-gpu bg-blue-50 lg:scale-110';
  return (
    <div className="mt-8 w-full p-8 shadow-sm shadow-black">
      <div className="grid grid-cols-1 gap-16 p-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Free */}
        <div
          className={`group relative h-[500px] shadow-md shadow-black hover:bg-blue-50 ${
            selectedPlan === 'free' ? styles : ''
          }`}
        >
          <FontAwesomeIcon
            className="-z-100 absolute top-0 right-0 py-1 text-gray-600"
            icon={faUserCheck}
            size="xl"
          />
          <div
            className="absolute -top-2 -left-10 flex h-24 w-24 flex-col items-center justify-center rounded-full 
          font-cairo font-black text-white shadow-sm shadow-black backdrop-blur-sm"
          >
            <p className="text-4xl">0$</p>
            <p className="text-sm">per month</p>
          </div>
          <div className="flex h-full w-full">
            <div className="h-full w-[15%] bg-gray-600" />
            <div className="h-full w-full">
              <div className="flex h-full w-full flex-col">
                <div className="flex h-full flex-col items-center">
                  <p className="py-16 font-sans text-4xl font-bold uppercase text-gray-600">
                    free
                  </p>
                </div>
                <div className="flex h-[15%] w-full items-center justify-center shadow-sm shadow-black"></div>
              </div>
            </div>
          </div>
        </div>
        {/* basic */}
        <div
          className={`group relative h-[500px] shadow-md shadow-black hover:bg-blue-50 ${
            selectedPlan === 'basic' ? styles : ''
          }`}
        >
          <div
            className="absolute -top-2 -left-10 flex h-24 w-24 flex-col items-center justify-center rounded-full 
          font-cairo font-black text-white shadow-sm shadow-black backdrop-blur-sm"
          >
            <p className="text-4xl">4.99$</p>
            <p className="text-sm">per month</p>
          </div>
          <div className="flex h-full w-full">
            <div className="h-full w-[15%] bg-red-600" />
            <div className="h-full w-full">
              <div className="flex h-full w-full flex-col">
                <div className="flex h-full flex-col items-center">
                  <p className="py-16 font-sans text-4xl font-bold uppercase text-red-600">
                    Basic
                  </p>
                  <ul className="flex flex-col gap-4 self-start py-4  px-4 font-sans text-sm text-white group-hover:text-black">
                    <li>- Create up to 5 products</li>
                    <li>- Edit your products up to 1 time per day</li>
                    <li>- Full access to our messaging platform</li>
                  </ul>
                </div>
                <div className="flex h-[15%] w-full items-center justify-center shadow-sm shadow-black">
                  {selectedPlan !== 'basic' ? (
                    <button
                      className="py-2  px-8 font-sans text-xl font-bold uppercase text-red-600 shadow-sm shadow-black hover:bg-red-600 hover:text-black"
                      onClick={() => handleClick('basic')}
                    >
                      Shop now
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* standard */}
        <div
          className={`group relative h-[500px] shadow-md shadow-black hover:bg-blue-50 ${
            selectedPlan === 'standard' ? styles : ''
          }`}
        >
          <div
            className="absolute -top-2 -left-10 flex h-24 w-24 flex-col items-center justify-center rounded-full 
          font-cairo font-black text-white shadow-sm shadow-black backdrop-blur-sm"
          >
            <p className="text-4xl">9.99$</p>
            <p className="text-sm">per month</p>
          </div>
          <div className="flex h-full w-full">
            <div className="h-full w-[15%] bg-green-600" />
            <div className="h-full w-full">
              <div className="flex h-full w-full flex-col">
                <div className="flex h-full flex-col items-center">
                  <p className="z-10 py-16 font-sans text-4xl font-bold uppercase text-green-600">
                    Standard
                  </p>
                  <ul className="flex flex-col gap-4 self-start py-4  px-4 font-sans text-sm text-white group-hover:text-black">
                    <li>- Create up to 15 products</li>
                    <li>- Edit your products up to 10 times per day</li>
                    <li>- Full access to our messaging platform</li>
                  </ul>
                </div>
                <div className="flex h-[15%] w-full items-center justify-center shadow-sm shadow-black">
                  {selectedPlan !== 'standard' ? (
                    <button
                      className="py-2  px-8 font-sans text-xl font-bold uppercase text-green-600 shadow-sm shadow-black hover:bg-green-600 hover:text-black"
                      onClick={() => handleClick('standard')}
                    >
                      Shop now
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* premium */}
        <div
          className={`group relative h-[500px] shadow-md shadow-black hover:bg-blue-50 ${
            selectedPlan === 'premium' ? styles : ''
          }`}
        >
          <div
            className="absolute -top-2 -left-10 flex h-24 w-24 flex-col items-center justify-center rounded-full 
          font-cairo font-black text-white shadow-sm shadow-black backdrop-blur-sm"
          >
            <p className="text-4xl">19.99$</p>
            <p className="text-sm">per month</p>
          </div>
          <div className="flex h-full w-full">
            <div className="h-full w-[15%] bg-orange-600" />
            <div className="h-full w-full">
              <div className="flex h-full w-full flex-col">
                <div className="flex h-full flex-col items-center">
                  <p className="z-10 py-16 font-sans text-4xl font-bold uppercase text-orange-600">
                    premium
                  </p>
                  <ul className="flex flex-col gap-4 self-start py-4  px-4 font-sans text-sm text-white group-hover:text-black">
                    <li>- Create up to ∞ products</li>
                    <li>- Edit your products up to ∞ times per day</li>
                    <li>- Full access to our messaging platform</li>
                    <li>
                      - Daily featuring of own products on the front page of
                      this wesbite
                    </li>
                  </ul>
                </div>
                <div className="flex h-[15%] w-full items-center justify-center shadow-sm shadow-black">
                  {selectedPlan !== 'premium' ? (
                    <button
                      className="py-2 px-8 font-sans  text-xl font-bold uppercase text-orange-600 shadow-sm shadow-black hover:bg-orange-600 hover:text-black"
                      onClick={() => handleClick('premium')}
                    >
                      Shop now
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
