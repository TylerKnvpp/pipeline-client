const postUserPST = async (uid, evos, unitInsignia, nickname) => {
  try {
    const url = `http://localhost:4000/users/${uid}/log-pst`;

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        evolutions: evos,
        nickname: nickname,
        unitInsignia: unitInsignia,
      }),
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

export { postUserPST };
