const validationRules = {
  username: [
    {
      required: true,
      type: "required",
      message: 'Ingresa el nombre usuario',
    },
    {
      pattern: /^[a-z]+$/,
      type: "pattern",
      message: 'El usuario solo puede contener minúsculas'
    }
  ],
  password: [
    {
      required: true,
      type: "required",
      message: 'Teclea tu contraseña',
    }
  ],
  name: [
    {
      required: true,
      type: "required",
      message: 'Ingresa un nombre',
    },
    {
      pattern: /^[a-zA-ZÀ-ž\ ]+$/,
      type: "pattern",
      message: 'El nombre solo puede contener letras y espacios'
    }
  ],
  email: [
    {
      required: true,
      type: "required",
      message: 'Ingresa un email',
    },
    {
      pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      type: "pattern",
      message: 'Correo electrónico inválido'
    }
  ],
  cellphone: [
    {
      required: true,
      type: "required",
      message: 'Ingresa tu teléfono',
    },
    {
      pattern: /^[0-9]+$/,
      type: "pattern",
      message: 'El teléfono puede contener números'
    }
  ],
  role: [
    {
      required: true,
      type: "required",
      message: 'Selecciona un rol',
    }
  ],
  gender: [
    {
      required: true,
      type: "required",
      message: 'Selecciona un género'
    }
  ]
}

const validationFns = {
  pattern: ({ pattern, value }) => {
    return pattern.test(value);
  },
  required: ({ value }) => {
    if (!value) return false
    if (typeof value === "string") return value.length !== 0
  }
}

export default function validateForm(form, errorFn) {
  for (const f in form) {
    for (const r of validationRules[f] || []) {
      if (!validationFns[r.type]({...r, value: form[f]})) {
        errorFn(r.message)
        return false
      }
    }
  }
  return true
}
