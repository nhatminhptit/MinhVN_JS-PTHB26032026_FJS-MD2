export default async function getDataUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const dataUser = await response.json();
    return dataUser;
  } catch (error) {
    console.log("Có lỗi xảy ra: ", error);
  }
}
