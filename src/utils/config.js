/**
 * @fileoverview Sistema de configuração centralizada
 *
 * Fornece configuração tipada e validada para toda a aplicação,
 * com suporte a ambientes e valores padrão seguros.
 *
 * @author Tunesflix Team
 * @version 1.0.0
 * @since 2024
 */

/**
 * Cria configuração com validação e valores padrão
 *
 * @param {Object} config - Configuração base
 * @param {Object} defaults - Valores padrão
 * @returns {Object} Configuração validada e mesclada
 *
 * @example
 * ```javascript
 * const config = createConfig({
 *   api: { timeout: 5000 }
 * }, {
 *   api: { timeout: 8000, retries: 3 }
 * });
 * // Resultado: { api: { timeout: 5000, retries: 3 } }
 * ```
 */
export function createConfig(config, defaults = {}) {
  return deepMerge(defaults, config);
}

/**
 * Mescla objetos profundamente
 *
 * @param {Object} target - Objeto alvo
 * @param {Object} source - Objeto fonte
 * @returns {Object} Objeto mesclado
 */
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

/**
 * Obtém variável de ambiente com valor padrão
 *
 * @param {string} key - Chave da variável
 * @param {any} defaultValue - Valor padrão
 * @returns {any} Valor da variável ou padrão
 */
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

/**
 * Valida configuração obrigatória
 *
 * @param {Object} config - Configuração a validar
 * @param {string[]} requiredKeys - Chaves obrigatórias
 * @throws {Error} Se alguma chave obrigatória estiver faltando
 */
export function validateConfig(config, requiredKeys = []) {
  const missing = requiredKeys.filter(
    (key) => !(key in config) || config[key] === null || config[key] === undefined
  );

  if (missing.length > 0) {
    throw new Error(`Configuração obrigatória faltando: ${missing.join(', ')}`);
  }
}

/**
 * Congela objeto profundamente para evitar modificações
 *
 * @param {Object} obj - Objeto a congelar
 * @returns {Object} Objeto congelado
 */
export function deepFreeze(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });

  return Object.freeze(obj);
}
