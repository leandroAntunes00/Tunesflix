export function createConfig(config, defaults = {}) {
  return deepMerge(defaults, config);
}

function deepMerge(target, source) {
  const result = { ...target };

  Object.keys(source).forEach((key) => {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  });

  return result;
}

export function getEnv(key, defaultValue = null) {
  const value = import.meta.env[key];

  if (value === undefined) {
    return defaultValue;
  }

  // Tenta converter para tipos apropriados
  if (value === 'true') return true;
  if (value === 'false') return false;

  const numericValue = Number(value);
  if (!isNaN(numericValue) && value !== '') {
    return numericValue;
  }

  return value;
}

export function validateConfig(config, requiredKeys = []) {
  const missing = requiredKeys.filter(
    (key) => !(key in config) || config[key] === null || config[key] === undefined
  );

  if (missing.length > 0) {
    throw new Error(`Configuração obrigatória faltando: ${missing.join(', ')}`);
  }
}

export function deepFreeze(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });

  return Object.freeze(obj);
}
