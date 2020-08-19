const postUserPipeline = async (uid, formData) => {
  try {
    const url = `http://localhost:4000/users/${uid}/add-pipeline`;

    const config = {
      method: "POST",
      body: formData,
    };

    const req = await fetch(url, config);

    if (req.ok) {
      const res = await req.json();

      if (!res.success) {
        return res;
      }

      return res;
    }
  } catch (err) {
    console.log(err);
  }
};

export { postUserPipeline };
