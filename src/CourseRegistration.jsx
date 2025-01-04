import React from "react";
import { useState } from "react";
function CourseRegistration({web3, courseContract, coursefee}) {
  const [email, setEmail] = useState("");

  const payForCourse = async () => {
    if (!web3 || !courseContract) return;

    const accounts = await web3.eth.getAccounts();
    courseContract.methods
      .payForCourse(email)
      .send({ from: accounts[0], value: web3.utils.toWei(coursefee, "ether") })
      .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash);
      })
      .on("receipt", (receipt) => {
        console.log("Transaction successful:", receipt);
      })
      .on("error", (error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-96 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Complete Your Purchase
          </h2>
          <p className="text-lg font-medium text-gray-700 mb-1">
            Web Development Course
          </p>
          <p className="text-xl font-bold text-purple-600 mb-6">{coursefee} ETH</p>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            value={email}
            id="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button onClick={payForCourse} className="w-full px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;
