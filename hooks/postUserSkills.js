const postUserSkills = async (uid, input) => {
  try {
    const url = `http://localhost:4000/users/${uid}/add-skills`;

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skills: input }),
    };

    const req = await fetch(url, config);

    if (req.ok) {
      const res = await req.json();

      if (!res.success) {
        console.log(res.error);
        return;
      }

      return res;
    }
  } catch (err) {
    console.log(err);
  }
};

export { postUserSkills };
