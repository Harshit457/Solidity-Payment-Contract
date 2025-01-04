import { useState, useEffect } from "react";
import CourseRegistration from "./CourseRegistration";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { contractABI } from "./abi";
import { Admin } from "./Admin";
import Web3 from "web3"
function App() {
  const [web3, setWeb3] = useState(null);
  const [courseContract, setCourseContract] = useState(null);
  const [coursefee, setcoursefee] = useState("");
  const contractAddress = "0xcEc391CAc7cdf2F2221382d001b2e180953fbf7F";
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const courseInstance = new web3Instance.eth.Contract(
            contractABI,
            contractAddress
          );
          setCourseContract(courseInstance);

          courseInstance.methods
            .coursefee()
            .call()
            .then((fee) => {
              setcoursefee(web3Instance.utils.fromWei(fee, "ether"));
            });
        })
        .catch((err) => {
          // Handle error if the user rejects the connection request
          console.error(err);
        });
    } else {
      alert("Please install an another Ethereum wallet.");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <CourseRegistration
              web3={web3}
              courseContract={courseContract}
              coursefee={coursefee}
            />
          }
        />
        <Route
          path="admin"
          element={
            <Admin
              web3={web3}
              courseContract={courseContract}
              coursefee={coursefee}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
