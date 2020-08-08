const postUpdateUserProfile = async (uid, newData) => {
  try {
    const url = `http://localhost:4000/users/${uid}/update-profile`;

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ update: newData }),
    };

    const req = await fetch(url, config);

    if (req.ok) {
      const res = await req.json();
      return res;
    }
  } catch (err) {
    return err;
  }
};

export { postUpdateUserProfile };
