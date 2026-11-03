
import React, { useState } from "react";

function Profile({ user, updateUser }) {
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  function save(e) {
    e.preventDefault();

    updateUser({
      ...user,
      name: name,
      phone: phone,
      address: address,
    });

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((item) => {
      if (item.email === user.email) {
        return {
          ...item,
          name: name,
          phone: phone,
          address: address,
        };
      }

      return item;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setMessage("Profile updated successfully.");
  }

  function changePassword(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const currentUser = users.find(
      (item) => item.email === user.email
    );

    if (!currentUser || currentUser.password !== oldPassword) {
      setMessage("Current password is incorrect.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters.");
      return;
    }

    const updatedUsers = users.map((item) => {
      if (item.email === user.email) {
        return {
          ...item,
          password: newPassword,
        };
      }

      return item;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setOldPassword("");
    setNewPassword("");
    setMessage("Password updated in this browser demo.");
  }

  return (
    <main className="page-container">
      <div className="page-title">
        <span className="eyebrow">YOUR ACCOUNT</span>
        <h1>My profile</h1>
        <p>Keep your details up to date for a smoother checkout.</p>
      </div>

      <div className="profile-layout">
        <form className="form-box profile-box" onSubmit={save}>
          <h2>Personal details</h2>

          <label>
            Full name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Email address
            <input disabled value={user.email} />
          </label>

          <label>
            Phone number
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
            />
          </label>

          <label>
            Delivery address
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House, street, area..."
              rows="3"
            />
          </label>

          <button className="button" type="submit">
            Save changes
          </button>
        </form>

        <form className="form-box profile-box" onSubmit={changePassword}>
          <h2>Change password</h2>
          <p className="form-intro">
            Choose a new password you can remember.
          </p>

          <label>
            Current password
            <input
              required
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </label>

          <label>
            New password
            <input
              required
              minLength="6"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>

          <button className="button" type="submit">
            Update password
          </button>

          <small className="demo-note">
            This is a frontend learning project. Do not use real passwords.
          </small>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </main>
  );
}

export default Profile;
