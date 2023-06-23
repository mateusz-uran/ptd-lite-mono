const EditForm = ({ trip }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditFormVisible(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default EditForm;
