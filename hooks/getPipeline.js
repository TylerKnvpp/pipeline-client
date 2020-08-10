const getPipeline = async (input) => {
  try {
    const url = `http://localhost:4000/pipelines/${input}`;

    const req = await fetch(url);

    if (req.ok) {
      const res = await req.json();

      return res;
    }
  } catch (err) {
    console.log(err);
  }
};

export { getPipeline };
