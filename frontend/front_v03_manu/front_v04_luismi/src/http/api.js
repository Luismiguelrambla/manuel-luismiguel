const apiUrl = "http://localhost:4000";

const requestMethods = {
  post: "POST",
  get: "GET",
  put: "PUT",
  delete: "DELETE",
};
const endpoints = {
  login: "/usuarios/login",
  getUserInfo: "/usuarios/",
  entries: "/entries",
  signUp: "/usuarios",
  getHotelInfo: "/hoteles/",
  getSpaceInfo: "/espacios",
  getResults: "/results",
  newBooking: "/reservas",
};

async function fetchFormData(path, { body, method }) {
  const token = localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Authorization", token);

  return await fetch(`${apiUrl}${path}`, { method, headers, body });
}

async function fetchApi(path, { body, method }) {
  const token = localStorage.getItem("token");
  const headers = new Headers({ "Content-Type": "application/json" });
  if (token) {
    headers.append("Authorization", token);
  }
  const request = await fetch(`${apiUrl}${path}`, {
    headers: headers,
    method: method,
    body: JSON.stringify(body),
  });
  const requestData = await request.json();
  if (requestData.status === "error") {
    throw requestData.message;
  }
  return requestData;
}

export async function login(email, password) {
  const tokenData = await fetchApi(endpoints.login, {
    method: requestMethods.post,
    body: { email, password },
  });
  const token = tokenData.data.token;
  localStorage.setItem("token", token);
  return token;
}

export async function signUpApi(data) {
  return await fetchApi(endpoints.signUp, {
    method: requestMethods.post,
    body: data,
  });
}

export async function getUserInfo(userId) {
  const userData = await fetchApi(`${endpoints.getUserInfo}${userId}`, {
    method: requestMethods.get,
  });
  return userData.data;
}

export async function newBooking(idEspacios, fechaLlegada, fechaSalida) {
  console.log(idEspacios);
  return await fetchApi(`/${idEspacios}${endpoints.newBooking}`, {
    method: requestMethods.post,
    body: { idEspacios, fechaLlegada, fechaSalida },
  });
}

export async function getSpaceInfo(idEspacios) {
  const userData = await fetchApi(`${endpoints.getSpaceInfo}/${idEspacios}`, {
    method: requestMethods.get,
  });
  return userData.data;
}

export async function getHotelInfo(idUsuario) {
  const userData = await fetchApi(`${endpoints.getHotelInfo}${idUsuario}`, {
    method: requestMethods.get,
  });
  return userData.data;
}

export async function getSpaceLocation(location) {
  const userData = await fetchApi(
    `${endpoints.getSpaceInfo}?search=${location}`,
    {
      method: requestMethods.get,
    }
  );
  return userData.data;
}

export async function getSpaces() {
  const userData = await fetchApi(`${endpoints.getSpaceInfo}`, {
    method: requestMethods.get,
  });
  return userData.data;
}

export async function editUser(
  idUsuario,
  nombre,
  apellidos,
  telefono,
  correo,
  fechaNacimiento,
  avatar
) {
  console.log(
    idUsuario,
    nombre,
    apellidos,
    telefono,
    correo,
    fechaNacimiento,
    avatar
  );
  return await fetchApi(`${endpoints.getUserInfo}${idUsuario}`, {
    method: requestMethods.put,
    body: {
      nombre,
      apellidos,
      telefono,
      correo,
      fechaNacimiento,
      avatar,
    },
  });
}

export async function deleteUser(idUsuario) {
  return await fetchApi(`${endpoints.getUserInfo}${idUsuario}`, {
    method: requestMethods.delete,
  });
}
