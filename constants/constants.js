export const url = /^(https:\/\/cngrs\.jidi\.com\.mx\/person\/)[a-z]+$/
export const fields = {
  zone: { label: "Zona", icon: "location-on"},
  branch: { label: "Localidad", icon: "synagogue"},
  city: { label: "Ciudad", icon: "flag"},
  room: { label: "Habitación", icon: "bed"},
  username: { label: "Usuario", icon: "account-box" },
  role: { label: "Rol", icon: { operator: "manage-accounts", admin: "key" } }
}
export const roles = [
  { id: '1', title: "Administrador", value: "admin"},
  {id: '2', title: "Operador", value: "operator"}
];

export const genders = [
  { id: '1', title: "Masculino", value: "admin"},
  {id: '2', title: "Femenino", value: "operator"}
];

export const categories = [
  { id: '1', title: "Habitación", value: "room" },
  { id: '2', title: "Zona", value: "zone" },
  { id: '3', title: "Localidad", value: "branch" },
  { id: '4', title: "Ciudad", value: "city" },
  { id: '5', title: "Registrado", value: "accessed" }
]

export function getStaticPeopleCategory (name) {
  const staticCategories = {
    accessed: ['Si', 'No'],
    room: ['Junior 203', 'Presidencial 405']
  }
  return staticCategories[name];
}

export const emptyPeopleFilter = {
  room: [],
  zone: [],
  branch: [],
  city: [],
  accessed: []
}