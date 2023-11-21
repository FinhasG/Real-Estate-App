import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {app} from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

//request.resource.contentType.matches('image/.*')

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent]=useState(0);
  const [fileUploadError, setFileUploadError]=useState(false);
  const [formData, setFormData]=useState({});
  console.log(filePercent)
  console.log(fileUploadError)

  useEffect(()=>{
    handleFileUpload(file)
  },[file])

  const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime()+ File.name;
    const storageRef=ref(storage, fileName);
    const uploadTask=uploadBytesResumable(storageRef, file);

    console.log(formData)

    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress=(snapshot.bytesTransferred / 
      snapshot.totalBytes) * 100;
      setFilePercent(Math.round(progress))
    },
    (error)=>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL)=>
      setFormData({...formData, avatar:downloadURL})
      );
    }
    );
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {fileUploadError?(<span className="text-red-500">Error Image Upload ( image must be less than 2 mb )</span>):
          filePercent > 0 && filePercent < 100?(<span>{`uploading ${filePercent}%`}</span>)
        :filePercent===100?(
          <span className="text-green-700">Image successfully Uploaded!!!</span>
        ):(' ')
        }
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg mt-4"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg mt-4"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg mt-4"
        />
        <button className="bg-slate-600 text-white p-2 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Logout</span>
      </div>
    </div>
  );
};

export default Profile;
