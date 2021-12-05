import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { Navbar } from "../components/Navbar";
import "@fontsource/montserrat/700.css";
export default function Home() {
  const {
    authenticate,
    isAuthenticated,
    user,
    logout,
    Moralis,
    isInitialized,
  } = useMoralis();
  const [attachments, setAttachments] = useState([]);
  const inputRef = useRef(null);
  const [changeSwitch, setChangeSwitch] = useState(false);

  const onChangeHandler = async (e) => {
    const data = e.target.files[0];
    const file = new Moralis.File(data.name, data);
    await file.saveIPFS();
    const jobApplication = new Moralis.Object("Testfiles");
    jobApplication.set("name", "files");
    jobApplication.set("fileData", file);
    await jobApplication.save();
    setChangeSwitch(!changeSwitch);
  };

  useEffect(() => {
    if (isAuthenticated && isInitialized) {
      const testAsync = async () => {
        const query = new Moralis.Query("Testfiles");
        query.equalTo("name", "files");
        const op = await query.find();
        const tempArr = [];
        op.forEach((item) => tempArr.push(item.attributes.fileData.ipfs()));
        setAttachments(tempArr);
      };
      testAsync();
    }
  }, [isInitialized, changeSwitch, isAuthenticated]);

  return (
    <div className="bg-bg">
      <Navbar />
      <div className="flex  items-center justify-center min-h-screen py-2">
        {!user ? (
          <div>
            <h1
              style={{ fontFamily: "Montserrat" }}
              class="text-3xl font-extrabold sm:text-6xl text-primary"
            >
              <b>Sustainable File Sharing</b>
            </h1>

            <p
              style={{ fontFamily: "Montserrat" }}
              class="max-w-xl mx-auto mt-6 text-lg text-white align-middle text-center"
            >
              An immutable and data-efficient method for storing and sharing
              files using the Inter Planetry File System.
            </p>
            <br />
            <br />
            <div className="flex flex-col gap-y-4">
              <button
                className="px-3 py-2 bg-primary text-white rounded-md hover:opacity-90"
                onClick={() => authenticate({ signingMessage: "Signing in" })}
              >
                Sign in with Metamask
              </button>
              <button
                className="px-3 py-2 bg-primary text-white rounded-md hover:opacity-90"
                onClick={() =>
                  authenticate({
                    provider: "walletconnect",
                    signingMessage: "Signing in",
                  })
                }
              >
                Sign in with Wallet connect
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center">
            <input
              type="file"
              ref={inputRef}
              onChange={onChangeHandler}
              className="hidden"
            />
            <button
              className="px-3 py-2 bg-red-600 text-white rounded-md hover:opacity-90 fixed top-5 right-5"
              onClick={() => logout()}
            >
              logout
            </button>
            <button
              style={{ fontFamily: "Montserrat" }}
              onClick={() => inputRef.current.click()}
              className="px-3 py-2 bg-green-500 text-white hover:opacity-90 rounded-md"
            >
              Upload files
            </button>

            <HiddenScroll className="mt-20">
              {attachments?.map((imageUrl, index) => (
                <img
                  src={imageUrl}
                  alt="image"
                  key={index}
                  className="h-40 rounded-md"
                />
              ))}
            </HiddenScroll>
          </div>
        )}
      </div>
    </div>
  );
}

const HiddenScroll = styled.div`
  display: flex;
  flex-direction: row;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  column-gap: 1rem;
  overflow-x: scroll;
`;
