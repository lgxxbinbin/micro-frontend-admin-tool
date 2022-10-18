// Keyword: oneOf, anyOf, all
const useAuthCheck = (abilities, sessionToken) => {
  if (abilities.length === 0) return true
  return abilities.includes(sessionToken)
}

export default useAuthCheck
