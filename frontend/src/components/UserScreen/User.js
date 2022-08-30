const User = ({user, handleDelete, handleEdit}) => {
  return (
    <tr>
      <td>{user._id}</td>
      <td>{user.name}</td>
      <td> {user.email} </td>
      <td>
        {user.isAdmin ? (
          <i className="fa fa-check text-success" aria-hidden="true"></i>
        ) : (
          <i className="fa-solid fa-xmark text-danger"></i>
        )}
      </td>

      <td className="text-center">
        <button className="border-0" onClick={() => handleEdit(user)}>
          Edit
        </button>
      </td>

      <td className="text-center">
        <button className="border-0" onClick={handleDelete}>
          <i className="fa fa-trash text-danger" aria-hidden="true"></i>
        </button>
      </td>
    </tr>
  );
};

export default User;
