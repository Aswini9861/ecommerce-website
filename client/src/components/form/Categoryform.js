import React from "react";

const Categoryform = ({ value, handleSubmit, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "30rem", marginLeft: "10px", borderColor: "black" }}
          type="text"
          className="form-control"
          placeholder="Enter Category Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100px", marginLeft: "100px" }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Categoryform;
