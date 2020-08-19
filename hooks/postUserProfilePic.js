const postUserProfilePic = async (id, image) => {
  const payload = new FormData();
  payload.append("image", image);

  const url = `http://localhost:4000/users/${id}/add-profile-picture`;

  const config = {
    body: payload,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const req = await fetch(url, config);

    if (req.ok) {
      const res = req.json();
      return res;
    }
  } catch (err) {
    return err;
  }
};

export { postUserProfilePic };
