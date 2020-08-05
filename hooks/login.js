export async function useLogin(input) {
  try {
    const url = "http://localhost:4000/auth/login";

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    };

    const req = await fetch(url, config);

    if (req.ok) {
      const res = await req.json();

      return res;
    } else {
      const resErr = await req.json();

      return resErr;
    }
  } catch (err) {
    if (err) response.error = err;
    return response;
  }
}
