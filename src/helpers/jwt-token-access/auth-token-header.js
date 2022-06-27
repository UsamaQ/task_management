export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem("authUser"))
  const obj1 = JSON.parse(sessionStorage.getItem("accessToken"))

  if (obj && obj.accessToken) {
    return { Authorization: obj.accessToken }
  } else if (obj1 && obj.accessToken) {
      return { Authorization: obj.accessToken }
  }{
    return {}
  }
}
