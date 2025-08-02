import React, { useEffect, useState } from "react";
import { getStates, getCities, registerUser } from "../services/api";

export default function RegistrationForm() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [photoFile, setPhotoFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    contactNo: "",
    state: "",
    city: "",
    hobbies: [],
    agreedTerms: false
  });

  useEffect(() => {
    getStates().then(res => setStates(res.data));
  }, []);

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setForm({ ...form, state: stateId, city: "" });
    getCities(stateId).then(res => setCities(res.data));
  };

  const handleHobbies = (hobby) => {
    setForm((prev) => {
      const updated = prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby];
      return { ...prev, hobbies: updated };
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("❌ Only JPG or PNG files allowed");
        e.target.value = "";
      } else {
        setPhotoFile(file);
      }
    }
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!form.name.trim()) tempErrors.name = "Name is required";
    else if (form.name.length > 25) tempErrors.name = "Name must be max 25 characters";

    if (!form.gender) tempErrors.gender = "Please select gender";

    if (!form.dob) tempErrors.dob = "Date of Birth is required";

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!form.contactNo) {
      tempErrors.contactNo = "Contact number is required";
    } else if (!/^\d+$/.test(form.contactNo)) {
      tempErrors.contactNo = "Contact number must contain only numbers";
    } else if (form.contactNo.length !== 10) {
      tempErrors.contactNo = "Contact number must be exactly 10 digits";
    }

    if (!form.state) tempErrors.state = "State is required";

    if (!form.city) tempErrors.city = "City is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const allRequiredValid = () => {
    return (
      form.name.trim() &&
      form.name.length <= 25 &&
      form.gender &&
      form.dob &&
      form.contactNo &&
      form.state &&
      form.city
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("❌ Please correct the errors before submitting");
      return;
    }

    if (!form.agreedTerms) {
      alert("❌ You must agree to Terms and Conditions");
      return;
    }

    const payload = {
      ...form,
      dob: form.dob,
      state: { id: form.state },
      city: { id: form.city },
      hobbies: form.hobbies.join(", ")
    };

    registerUser(payload)
      .then(() => alert("✅ User Registered Successfully!"))
      .catch(() => alert("❌ Registration Failed"));
  };

  return (
    <div className="container mt-4">
      <h3>📝 User Registration</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name*</label>
          <input
            type="text"
            className="form-control"
            maxLength="25"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label>Gender*</label><br />
          <input type="radio" name="gender" value="Male"
            onChange={(e) => setForm({ ...form, gender: e.target.value })}/> Male
          <input type="radio" name="gender" value="Female" className="ms-3"
            onChange={(e) => setForm({ ...form, gender: e.target.value })}/> Female
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>

        <div className="mb-3">
          <label>Date of Birth*</label>
          <input
            type="date"
            className="form-control"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
          />
          {errors.dob && <div className="text-danger">{errors.dob}</div>}
        </div>

        <div className="mb-3">
          <label>Email Address (Optional)</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label>Contact No.*</label>
          <input
            type="text"
            className="form-control"
            value={form.contactNo}
            maxLength="10"
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setForm({ ...form, contactNo: value });
              }
            }}
          />
          {errors.contactNo && <div className="text-danger">{errors.contactNo}</div>}
        </div>

        <div className="mb-3">
          <label>State*</label>
          <select className="form-control" value={form.state} onChange={handleStateChange}>
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.id} value={state.id}>{state.name}</option>
            ))}
          </select>
          {errors.state && <div className="text-danger">{errors.state}</div>}
        </div>

        <div className="mb-3">
          <label>City*</label>
          <select
            className="form-control"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>{city.name}</option>
            ))}
          </select>
          {errors.city && <div className="text-danger">{errors.city}</div>}
        </div>

        <div className="mb-3">
          <label>Hobbies (Optional)</label><br/>
          {["Chess", "Cricket", "Football", "Hockey"].map(hobby => (
            <div key={hobby} className="form-check form-check-inline">
              <input type="checkbox" className="form-check-input"
                onChange={() => handleHobbies(hobby)} />
              <label className="form-check-label">{hobby}</label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label>Photo (JPG/PNG only)</label>
          <input type="file" className="form-control" onChange={handlePhotoUpload}/>
        </div>

        {allRequiredValid() && (
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={(e) => setForm({ ...form, agreedTerms: e.target.checked })}
            />
            <label className="form-check-label">
              I agree Terms and Conditions
            </label>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!form.agreedTerms}
        >
          Register
        </button>
      </form>
    </div>
  );
}
