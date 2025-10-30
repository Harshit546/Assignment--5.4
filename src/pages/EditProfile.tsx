import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateProfileThunk } from "../features/userProfile/profileThunks";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const EditProfile: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);

  const handleSave = async () => {
    try {
      await dispatch(updateProfileThunk({ firstName, lastName, email })).unwrap();
      alert("Profile updated");
      navigate("/dashboard"); // ✅ redirect after successful update
    } catch (err) {
      alert("Failed to update profile");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
      <div className="space-y-4">
        <Input
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSave} className="mt-4 w-full">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
