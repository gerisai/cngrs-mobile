export const pageSize = 10;

export const url = /^(https:\/\/cngrs\.jidi\.com\.mx\/person\/)[a-z]+$/;

export const fields = {
  zone: { label: "Zona", icon: "location-on"},
  branch: { label: "Localidad", icon: "synagogue"},
  city: { label: "Ciudad", icon: "flag"},
  room: { label: "Habitación", icon: "bed"},
  username: { label: "Usuario", icon: "account-box" },
  role: { label: "Rol", icon: { operator: "manage-accounts", admin: "key" } }
};

export const roles = [
  { id: '1', title: "Administrador", value: "admin"},
  {id: '2', title: "Operador", value: "operator"}
];

export const genders = [
  { id: '1', title: "Masculino", value: "male"},
  {id: '2', title: "Femenino", value: "female"}
];

export const categories = {
  user: [{ id: '1', title: "Rol", value: "role" }],
  person: [
    { id: '1', title: "Habitación", value: "room" },
    { id: '2', title: "Zona", value: "zone" },
    { id: '3', title: "Localidad", value: "branch" },
    { id: '4', title: "Ciudad", value: "city" },
    { id: '5', title: "Registrado", value: "accessed" }
  ]
};

export const staticCategories = ['room', 'accessed', 'role'];
export const mutuallyExclusiveCategories = ['accessed', 'role'];

export function getStaticCategory (name) {
  const staticCategories = {
    accessed: [ { value: false, text: "No" }, { value: true, text: "Si" }],
    room: ['Junior 203', 'Presidencial 405'],
    role: [ { value: "admin", text: "Administrador" }, { value: "operator", text: "Operador" }]
  }
  return staticCategories[name];
};

export const emptyPeopleFilter = {
  room: [],
  zone: [],
  branch: [],
  city: [],
  accessed: []
};

export const emptyUsersFilter = {
  role: []
};

export const emptyPersonForm = {
  name: null,
  gender: null,
  cellphone: null,
  email: null,
  tutor: null,
  illness: null,
  zone: null,
  branch: null,
  city: null
};

export const emptyUserForm = {
  username: null,
  name: null,
  role: null,
  password: null
};
